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

const jsonata = require('jsonata');

module.exports.getExpression = msg => {
  if (Object.keys(msg.body).length === 0 && msg.body.constructor === Object) {
    return msg.body;
  }
  const expression = {
    oihUid: '',
    oihCreated: '',
    oihLastModified: '',
    oihApplicationRecords: [{
      applicationUid: '3',
      recordUid: msg.body.rowid
    }],
    title: msg.body.title,
    salutation: msg.body.salutation,
    firstName: msg.body.firstname,
    middleName: '',
    lastName: msg.body.name,
    gender: '',
    birthday: msg.body.date_of_birth,
    notes: '',
    displayName: '',
    language: '',
    nickname: '',
    jobTitle: msg.body.position,
    photo: msg.body.picture_url,
    anniversary: '',
    addresses: [{
      street: msg.body.private_street === null ? undefined : jsonata(`$trim($substringBefore("${msg.body.private_street}", $split("${msg.body.private_street}", ' ')[-1]))`).evaluate(),
      streetNumber: msg.body.private_street === null ? undefined : jsonata(`$number($split("${msg.body.private_street}", " ")[-1])`).evaluate(),
      unit: '',
      zipCode: msg.body.private_zip_code,
      city: msg.body.private_town,
      district: '',
      region: msg.body.private_state,
      country: msg.body.private_country,
      countryCode: msg.body.private_country_symbol,
      primaryContact: '',
      description: ''
    }],
    contactData: [{
      value: msg.body.phone,
      type: 'phone',
      description: 'phone number'
    },
    {
      value: msg.body.phone2,
      type: 'phone',
      description: 'second phone number'
    },
    {
      value: msg.body.phone3,
      type: 'phone',
      description: 'third phone number'
    },
    {
      value: msg.body.mobile_phone,
      type: 'phone',
      description: 'mobile phone number'
    },
    {
      value: msg.body.private_mobile_phone,
      type: 'phone',
      description: 'private mobile phone number'
    },
    {
      value: msg.body.private_phone,
      type: 'phone',
      description: 'private phone number'
    },
    {
      value: msg.body.fax,
      type: 'fax',
      description: 'fax'
    },
    {
      value: msg.body.email,
      type: 'email',
      description: 'email'
    },
    {
      value: msg.body.private_email,
      type: 'email',
      description: 'private email'
    },
    {
      value: msg.body.xing_url,
      type: 'xing',
      description: 'xing'
    },
    {
      value: msg.body.facebook_url,
      type: 'facebook',
      description: ''
    },
    {
      value: msg.body.linked_in_url,
      type: 'linkedin',
      description: 'linkedin'
    },
    {
      value: msg.body.twitter_url,
      type: 'twitter',
      description: 'twitter'
    },
    {
      value: msg.body.googleplus_url,
      type: 'google+',
      description: 'google+'
    },
    {
      value: msg.body.skype,
      type: 'skype',
      description: 'skype'
    },
    {
      value: msg.body.youtube_url,
      type: 'youtube',
      description: 'youtube'
    },
    {
      value: msg.body.url,
      type: 'url',
      description: 'url'
    }
    ],
    calendars: [],
    categories: []
  };
  return expression;
};
