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

const wice = require('./../actions/wice');

exports.process = processTrigger;

/**
 * This method will be called from elastic.io platform providing following data
 *
 * @param msg incoming message object that contains ``body`` with payload
 * @param cfg configuration that is account information and configuration field values
 */
function processTrigger(msg, cfg) {

  // Create a session in Wice
  wice.createSession(cfg, () => {

    if (cfg.cookie) {
      let articles = [];
      const self = this;

      function getArticles() {
        return new Promise((resolve, reject) => {
          const requestOptions = {
            uri: `https://oihwice.wice-net.de/plugin/wp_elasticio_backend/json?method=get_all_articles&cookie=${cfg.cookie}`,
            headers: {
              'X-API-KEY': cfg.apikey
            }
          };

          request.get(requestOptions)
            .then((res) => {
              const resObj = JSON.parse(res);
              let customArticleFormat;

              if (resObj.loop_articles == undefined) {
                reject('No articles found ...');
              }

              resObj.loop_articles.forEach((article) => {
                customArticleFormat = {
                  rowid: article.rowid,
                  number: article.number,
                  description: article.description,
                  sales_price: article.sales_price,
                  purchase_price: article.purchase_price,
                  in_stock: article.in_stock,
                  unit: article.unit,
                  price_list_highlight: article.price_list_highlight
                };
                articles.push(customArticleFormat);
                resolve(articles);
              })
            }).catch((e) => {
              reject(e);
            });
        });
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
  });
}
