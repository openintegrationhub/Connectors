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
 */
function processTrigger(msg, cfg) {
  let reply = [];
  const self = this;

  async function getArticle(options) {
    try {
      const article = await request.get(options);
      const articleObj = JSON.parse(article);

      if (!articleObj.rowid) throw `No article with ROWID: ${msg.body.rowid} found...`;

      return customArticle(articleObj);
    } catch (e) {
      throw new Error(e);
    }
  }

  function customArticle(article) {
    const customArticleFormat = {
      rowid: article.rowid,
      description: article.description,
      sales_price: article.sales_price,
      purchase_price: article.purchase_price,
      in_stock: article.in_stock,
      unit: article.unit,
      price_list_highlight: article.price_list_highlight
    };
    return customArticleFormat;
  }

  async function executeRequest() {
    try {
      const cookie = await createSession(cfg);
      const options = {
        uri: `https://oihwice.wice-net.de/plugin/wp_elasticio_backend/json?method=get_article&cookie=${cookie}&show_detailview=${msg.body.rowid}`,
        headers: {
          'X-API-KEY': cfg.apikey
        }
      };
      reply = await getArticle(options);
      console.log(`Article: ${JSON.stringify(reply)}`);
      return reply;
    } catch (e) {
      throw new Error(e);
    }
  }

  function emitData() {
    const data = messages.newMessageWithBody(reply);
    self.emit('data', data);
  }

  function emitError(e) {
    console.log('Oops! Error occurred');
    self.emit('error', e);
  }

  function emitEnd() {
    console.log('Finished execution');
    self.emit('end');
  }

  Q()
    .then(executeRequest)
    .then(emitData)
    .fail(emitError)
    .done(emitEnd);
}
