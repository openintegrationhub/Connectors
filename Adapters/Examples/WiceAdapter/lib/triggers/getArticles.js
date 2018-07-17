/**
 * Copyright 2018 Wice GmbH

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
 */

"use strict";

const Q = require('q');
const request = require('request-promise');
const messages = require('elasticio-node').messages;

const { createSession } = require('./../utils/wice');

exports.process = processTrigger;

/**
 * This method will be called from elastic.io platform providing following data
 *
 * @param msg incoming message object that contains ``body`` with payload
 * @param cfg configuration that is account information and configuration field values
 */
function processTrigger(msg, cfg) {
  let articles = [];
  const self = this;

  async function fetchAll(options) {
    try {
      let result = [];
      const articles = await request.get(options);
      const articlesObj = JSON.parse(articles);

      if (articlesObj.loop_articles == undefined) {
        throw new Error(e);
      }

      articlesObj.loop_articles.forEach((article) => {
        const currentArticle = customArticle(article);
        result.push(currentArticle);
      });
      return result;
    } catch (e) {
      throw new Error(e);
    }
  }

  function customArticle(article) {
    const customArticleFormat = {
      rowid: article.rowid,
      number: article.number,
      description: article.description,
      sales_price: article.sales_price,
      purchase_price: article.purchase_price,
      in_stock: article.in_stock,
      unit: article.unit
    };
    return customArticleFormat;
  }

  async function getArticles() {
    try {
      const cookie = await createSession(cfg);
      const options = {
        uri: `https://oihwice.wice-net.de/plugin/wp_elasticio_backend/json?method=get_all_articles&cookie=${cookie}`,
        headers: { 'X-API-KEY': cfg.apikey }
      };

      articles = await fetchAll(options);
      return articles;
    } catch (e) {
      throw new Error(e);
    }
  }

  function emitData() {
    const data = messages.newMessageWithBody({
      "articles": articles
    });
    self.emit('data', data);
  }

  function emitError(e) {
    console.log(`ERROR: ${e}`);
    self.emit('error', e);
  }

  function emitEnd() {
    console.log('Finished execution');
    self.emit('end');
  }

  Q()
    .then(getArticles)
    .then(emitData)
    .fail(emitError)
    .done(emitEnd);
}
