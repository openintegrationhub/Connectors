/**
 * Copyright 2018 Cloud Ecosystem e.V.

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

const jsonata = require('jsonata');

module.exports.getExpression = function(msg) {
  const jsonataExpression = {
      "oihUid": "",
      "oihCreated": 0,
      "oihLastModified": 0,
      "oihApplicationRecords": [
        {
          "applicationUid": "3",
          "recordUid": msg.body.extID__c
        }
      ],
      "title": msg.body.Title,
      "salutation": msg.body.Salutation,
      "firstName": msg.body.FirstName,
      "lastName": msg.body.LastName,
      "gender": "",
      "birthday": JSON.stringify(msg.body.Birthdate),
      "notes": JSON.stringify(msg.body.Description),
      "language": msg.body.Languages__c,
      "address": [
        {
          "street": (msg.body.Mailingstreet === null) ? undefined : jsonata(`$trim($substringBefore("${msg.body.Mailingstreet}", $split("${msg.body.Mailingstreet}", ' ')[-1]))`).evaluate(),
          "streetNumber": (msg.body.Mailingstreet === null || msg.body.Mailingstreet === undefined) ? undefined : jsonata(`$number($split("${msg.body.Mailingstreet}", " ")[-1])`).evaluate(),
          "unit": "",
          "zipCode": msg.body.Mailingpostalcode,
          "city": msg.body.Mailingcity,
          "district": "",
          "region": msg.body.Mailingstate,
          "country": msg.body.Mailingcountry,
          "countryCode": "",
          "primaryContact": "",
          "description": "mailing"
        },
        {
          "street": (msg.body.Otherstreet === null) ? undefined : jsonata(`$trim($substringBefore("${msg.body.Otherstreet}", $split("${msg.body.Otherstreet}", ' ')[-1]))`).evaluate(),
          "streetNumber": (msg.body.Mailingstreet === null || msg.body.Mailingstreet === undefined) ? undefined : jsonata(`$number($split("${msg.body.Otherstreet}", " ")[-1])`).evaluate(),
          "unit": "",
          "zipCode": msg.body.Otherpostalcode,
          "city": msg.body.Othercity,
          "district": "",
          "region": msg.body.Otherstate,
          "country": msg.body.Othercountry,
          "countryCode": "",
          "primaryContact": "",
          "description": "other"
        },
      ],
      "contactData": [
        {
          "value": JSON.stringify(msg.body.Email),
          "type": "email",
          "description": "primary"
        },
        {
          "value": JSON.stringify(msg.body.Phone),
          "type": "phone",
          "description": "primary"
        },
        {
          "value": JSON.stringify(msg.body.Fax),
          "type": "fax",
          "description": "primary"
        },
        {
          "value": JSON.stringify(msg.body.Mobilephone),
          "type": "phone",
          "description": "mobile"
        },
        {
          "value": JSON.stringify(msg.body.Homephone),
          "type": "phone",
          "description": "home"
        },
        {
          "value": JSON.stringify(msg.body.Otherphone),
          "type": "phone",
          "description": "other"
        },
        {
          "value": JSON.stringify(msg.body.Assistantphone),
          "type": "phone",
          "description": "assistant"
        }
      ]
    };

  return jsonataExpression;
}
