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
    "AccountId": "",
    "LastName": msg.body.lastName,
    "FirstName": msg.body.firstName,
    "Salutation": msg.body.salutation,
    "OtherStreet": jsonata(`$lookup($filter(${msg.body.addresses}, ${function($v) { ${$v.description} = "other"}}), "street")`).evaluate(),
    "OtherCity": jsonata(`$lookup($filter(msg.body.addresses, function($v) { ${$v.description} = "other"}), "city")`).evaluate(),
    "OtherState": jsonata(`$lookup($filter(msg.body.addresses, function($v) { ${$v.description} = "other"}), "region")`).evaluate(),
    "OtherPostalCode": jsonata(`$lookup($filter(msg.body.addresses, function($v) { ${$v.description} = "other"}), "zipcode")`).evaluate(),
    "OtherCountry": jsonata(`$lookup($filter(msg.body.addresses, function($v) { ${$v.description} = "other"}), "country")`).evaluate(),
    "MailingStreet": jsonata(`$lookup($filter(msg.body.addresses, function($v) { ${$v.description} = "mailing"}), "street")`).evaluate(),
    "MailingCity": jsonata(`$lookup($filter(msg.body.addresses, function($v) { ${$v.description} = "mailing"}), "city")`).evaluate(),
    "MailingState": jsonata(`$lookup($filter(msg.body.addresses, function($v) { ${$v.description} = "mailing"}), "region")`).evaluate(),
    "MailingPostalCode": jsonata(`$lookup($filter(msg.body.addresses, function($v) { ${$v.description} = "mailing"}), "zipcode")`).evaluate(),
    "MailingCountry": jsonata(`$lookup($filter(msg.body.addresses, function($v) { ${$v.description} = "mailing"}), "country")`).evaluate(),
    "Phone": jsonata(`$lookup($filter(msg.body.contactData, function($v) { $v.type = "primary" and ${$v.description} = "primary"}), "value")`).evaluate(),
    "Fax": jsonata(`$lookup($filter(msg.body.contactData, function($v) { $v.type = "fax" and ${$v.description} = "primary"}), "value")`).evaluate(),
    "MobilePhone": jsonata(`$lookup($filter(msg.body.contactData, function($v) { $v.type = "phone" and ${$v.description} = "mobile"}), "value"`).evaluate(),
    "HomePhone": jsonata(`$lookup($filter(msg.body.contactData, function($v) { $v.type = "phone" and ${$v.description} = "home"}), "value"`).evaluate(),
    "OtherPhone": jsonata(`$lookup($filter(msg.body.contactData, function($v) { $v.type = "phone" and ${$v.description} = "other"}), "value"`).evaluate(),
    "AssistantPhone": jsonata(`$lookup($filter(msg.body.contactData, function($v) { $v.type = "phone" and ${$v.description} = "assistant"}), "value"`).evaluate(),
    "ReportsToId": "",
    "Email": jsonata(`$lookup($filter(msg.body.contactData, function($v) { $v.type = "email" and ${$v.description} = "primary"}), "value"`).evaluate(),
    "Title": msg.body.title,
    "Department": "",
    "AssistantName": "",
    "LeadSource": "",
    "Birthdate": msg.body.birthday,
    "Description": msg.body.notes,
    "OwnerId": "",
    "EmailBouncedReason": "",
    "EmailBouncedDate": "",
    "Jigsaw": "",
    "Level__c": "",
    "Languages__c": msg.body.language,
    "extID__c": msg.body.oihApplicationRecords.recordUid
  };

  return jsonataExpression;
}
