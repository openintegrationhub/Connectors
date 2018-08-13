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
        "recordUid": jsonata(`$split('${msg.body.attributes.url}', '/')[-1]`).evaluate()
      }
    ],
    "collaborationElement":{
      "header": {},
      "date": {},
      "properties": {},
      "content": {},
      "attachments": []
    },
    "subtasks": [],
    "details": {
      "subject": msg.body.Subject,
      "startdate": "",
      "enddate": msg.body.ActivityDate,
      "reminderdate": msg.body.ReminderDateTime,
      "content": msg.body.Description,
      "status": msg.body.Status
    }
  };

  return jsonataExpression;
}
