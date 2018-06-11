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

// const jsonata = require('jsonata');

module.exports.getExpression = function(msg) {
  const expression = {
    "rowid": msg.body.applicationRecordUid,
    "tenant": 617,
    "for_rowid": 199978,
    "for_table": "",
    "firstname": msg.body.firstName,
    "department": "",
    "position": "",
    "phone2": "",
    "phone3": "",
    "standard_person": msg.body.standard_person ? msg.body.standard_person : "",
    "title": msg.body.title ? msg.body.title : "",
    "name": msg.body.lastName,
    "phone": "1234566",
    "email": "test@mail.com",
    "fax": "",
    "mobile_phone": "",
    "remarks": "",
    "updated_by_user": "",
    "updated_by_user_group": "",
    "salutation": msg.body.salutation,
    "serial_salutation": "",
    "address_category1": "",
    "address_category2": "",
    "address_category3": "",
    "address_category4": "",
    "last_update": msg.body.applicatioLastModified,
    "date_of_birth": msg.body.birthday,
    "private_street": "Test Str 15",
    "private_zip_code": "20537",
    "private_town": "Hamburg Borgfelde",
    "import_key": "",
    "wp_contact_remote_addr": "",
    "deactivated": 0,
    "same_contactperson": 7242,
    "house_post_code": "",
    "picture_url": msg.body.photo,
    "xing_url": "",
    "caring_employee": 0,
    "private_street_number": "",
    "private_country": "Deutschland",
    "private_country_symbol": "",
    "private_phone": "",
    "private_mobile_phone": "",
    "private_email": "",
    "created_by_wp_contact": 0,
    "history_log": "",
    "eternal_exclusion_from_all_mailinglists": 0,
    "email_check_result": "",
    "do_not_display_anymore_in_duplicate_list_in_wp_contact": 0,
    "created_by_wp_wice_freemium_admin": 0,
    "address_category5": "",
    "address_category6": "",
    "address_category7": "",
    "same_contactperson_top": 1,
    "facebook_url": "",
    "linked_in_url": "",
    "twitter_url": "",
    "googleplus_url": "",
    "usergroups_read": "",
    "usergroups_write": "",
    "is_private": 0,
    "is_favourite": "",
    "skype": "",
    "user_account_rowid": 670,
    "is_deleted": 0,
    "private_state": "Hamburg",
    "youtube_url": "",
    "url": "",
    "company_name": "Test WICE GmbH",
    "name_and_firstname": "HobbsJackTest WICE GmbH",
    "total_entries_readable_with_current_permissions": 239
  };
  return expression;
}
