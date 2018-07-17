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
const { messages } = require('elasticio-node');
const { createSession } = require('./../utils/wice');

exports.process = processTrigger;

/**
 * This method will be called from elastic.io platform providing following data
 *
 * @param msg incoming message object that contains ``body`` with payload
 * @param cfg configuration that is account information and configuration field values
 * @param snapshot saves the current state of integration step for the future reference
 */
function processTrigger(msg, cfg, snapshot = {}) {
  let articles = [];
  const self = this;

  snapshot.lastUpdated = snapshot.lastUpdated || (new Date(0)).toISOString();
  console.log(`Last Updated: ${snapshot.lastUpdated}`)

  async function fetchAll(options) {
    try {
      let result = [];
      const articles = await request.get(options);
      const articlesObj = JSON.parse(articles);

      if (articlesObj.loop_articles == undefined) throw 'No articles found ...';

      articlesObj.loop_articles.filter((article) => {
        const currentArticle = customArticle(article);
        currentArticle.last_update > snapshot.lastUpdated && result.push(currentArticle);
      });

      result.sort((a, b) => Date.parse(a.last_update) - Date.parse(b.last_update));
      return result;
    } catch (e) {
      throw new Error(e);
    }
  }

  function customArticle(article) {
    const customArticleFormat = {
      rowid: article.rowid,
      last_update: article.last_update,
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
      if (!articles || !Array.isArray(articles)) throw `Expected records array. Instead received: ${JSON.stringify(articles)}`;

      return articles;
    } catch (e) {
      throw new Error(e);
    }
  }

  function emitData() {
    console.log(`Found ${articles.length} new records.`);
    if (articles.length > 0) {
      articles.forEach(elem => {
        self.emit('data', messages.newMessageWithBody(elem));
      });
      snapshot.lastUpdated = articles[articles.length - 1].last_update;
      console.log(`New snapshot: ${snapshot.lastUpdated}`);
      self.emit('snapshot', snapshot);
    } else {
      self.emit('snapshot', snapshot);
    }
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
