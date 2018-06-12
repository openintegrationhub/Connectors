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

module.exports.getExpression = function(msg) {
  const expression = {
    "updated_date": jsonata("$now()").evaluate(),
    "address_category2": "",
    "phone": 712372346,
    "wp_contact_remote_addr": "",
    "phone3": 712372346,
    "status_date": "",
    "picture": "",
    "company": "",
    "line_category2": "",
    "address_location_formatted": "",
    "private_email": "",
    "colspan": "",
    "email_check_result": "",
    "address_category1": " ",
    "private_street_number": "",
    "mandant": "",
    "position": "",
    "private_state": "HH",
    "private_country_symbol": "",
    "mobile_phone": "",
    "email_save_note": "",
    "updated_by_user": "",
    "rowid": msg.body.applicationRecordUid,
    "oldstatus_remarks": "",
    "picture_url": msg.body.photo,
    "deactivated": "",
    "delete_link": "",
    "serial_salutation": "",
    "house_post_code": "",
    "history_log": "",
    "for_table": "",
    "class_name": "",
    "firstname": msg.body.firstName,
    "standard_person": "",
    "same_contactperson": "",
    "status_time": "",
    "column_header": "",
    "private_email_save_note": "",
    "private_phone": 135792468,
    "private_street": "Test Str 15",
    "updated_time": "",
    "detail": "",
    "eternal_exclusion_from_all_mailinglists": "",
    "private_phone": 1234566,
    "status_locked": "",
    "address_category3": "",
    "birthday": msg.body.birthday,
    "remarks": "",
    "column_output": "",
    "fax": 9876543,
    "caring_employee": "",
    "last_update": msg.body.applicatioLastModified,
    "address_category4": "",
    "created_by_wp_contact": "0",
    "salutation": msg.body.salutation,
    "updated_by_user_group": "",
    "phone2": "",
    "oldstatus": "",
    "title": msg.body.title,
    "private_country": "Deutschland",
    "private_mobile_phone": "",
    "private_zip_code": 20537,
    "name": msg.body.lastName,
    "import_key": "",
    "xing_url": "www.xing.com/test",
    "url": "www.mywebsite.com",
    "email": "test@mail.com",
    "line_category1": "",
    "private_town": "Hamburg Borgfelde",
    "department": "",
    "for_rowid": 199978

  };
  return expression;
}
