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
      "RecurrenceMonthOfYear": null,
      "RecurrenceInstance": null,
      "RecurrenceDayOfMonth": null,
      "RecurrenceDayOfWeekMask": null,
      "RecurrenceInterval": null,
      "RecurrenceType": null,
      "RecurrenceTimeZoneSidKey": null,
      "RecurrenceEndDateOnly": null,
      "RecurrenceStartDateOnly": null,
      "IsRecurrence": false,
      "IsReminderSet": (msg.body.details.reminderdate != "") ? true : false,
      "ReminderDateTime": msg.body.details.reminderdate,
      "CallObject": null,
      "CallDisposition": null,
      "CallType": null,
      "CallDurationInSeconds": null,
      "Description": msg.body.details.content,
      "OwnerId": "005E0000002CozkIAC",
      "Priority": "",
      "Status": msg.body.details.status,
      "ActivityDate": msg.body.details.enddate,
      "Subject": msg.body.details.subject,
      "WhatId": null,
      "WhoId": null,
      "attributes": {
        "url": `/services/data/v25.0/sobjects/Task/${msg.body.oihApplicationRecords.recordUid}` ,
        "type": "Task"
      }
    };

return jsonataExpression;
}
