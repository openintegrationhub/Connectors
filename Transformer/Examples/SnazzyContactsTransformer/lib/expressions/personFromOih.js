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
const jsonata = require('jsonata');

module.exports.getExpression = (msg) => {

  const expression = {
    "rowid": (jsonata(`$filter(${JSON.stringify(msg.body.oihApplicationRecords)}, function($v) { $v.applicationUid = 3})`).evaluate()).recordUid,
    "tenant": "",
    "for_rowid": "",
    "for_table": "",
    "firstname": msg.body.firstName,
    "department": "",
    "position": "",
    "phone2":  (jsonata(`$filter(${JSON.stringify(msg.body.contactData)}, function($v) { $v.description = 'mobile'})`).evaluate()).value,
    "phone3": "",
    "standard_person": "",
    "title": msg.body.title,
    "name": msg.body.lastName,
    "phone": (jsonata(`$filter(${JSON.stringify(msg.body.contactData)}, function($v) { $v.description = 'primary'})`).evaluate()).value,
    "email": (jsonata(`$filter(${JSON.stringify(msg.body.contactData)}, function($v) { $v.type = 'email'})`).evaluate()).value,
    "fax": "",
    "mobile_phone": (jsonata(`$filter(${JSON.stringify(msg.body.contactData)}, function($v) { $v.description = 'secondary'})`).evaluate()).value,
    "remarks": "",
    "updated_by_user": "",
    "updated_by_user_group": "",
    "salutation": msg.body.salutation,
    "serial_salutation": "",
    "address_category1": "",
    "address_category2": "",
    "address_category3": "",
    "address_category4": "",
    "last_update": (jsonata(`$filter(${JSON.stringify(msg.body.oihApplicationRecords)}, function($v) { $v.applicationUid = 3})`).evaluate()).lastModified,
    "date_of_birth": msg.body.birthday,
    "private_street": (jsonata(`$filter(${JSON.stringify(msg.body.addresses)}, function($v) { $v.description = 'primary'})`).evaluate()).street,
    "private_zip_code": (jsonata(`$filter(${JSON.stringify(msg.body.addresses)}, function($v) { $v.description = 'primary'})`).evaluate()).zipCode,
    "private_town": (jsonata(`$filter(${JSON.stringify(msg.body.addresses)}, function($v) { $v.description = 'primary'})`).evaluate()).city,
    "import_key": "",
    "wp_contact_remote_addr": "",
    "deactivated": "",
    "same_contactperson": "",
    "house_post_code": "",
    "picture_url": msg.body.photo,
    "xing_url": (jsonata(`$filter(${JSON.stringify(msg.body.contactData)}, function($v) { $v.description = 'xing'})`).evaluate()).value,
    "caring_employee": "",
    "private_street_number": (jsonata(`$filter(${JSON.stringify(msg.body.addresses)}, function($v) { $v.description = 'primary'})`).evaluate()).streetNumber,
    "private_country": (jsonata(`$filter(${JSON.stringify(msg.body.addresses)}, function($v) { $v.description = 'primary'})`).evaluate()).country,
    "private_country_symbol": "",
    "private_phone": "",
    "private_mobile_phone": "",
    "private_email": "",
    "created_by_wp_contact": "",
    "history_log": "",
    "eternal_exclusion_from_all_mailinglists": "",
    "email_check_result": "",
    "do_not_display_anymore_in_duplicate_list_in_wp_contact": "",
    "created_by_wp_wice_freemium_admin": "",
    "address_category5": "",
    "address_category6": "",
    "address_category7": "",
    "same_contactperson_top": "",
    "facebook_url": "",
    "linked_in_url": "",
    "twitter_url": "",
    "googleplus_url": "",
    "usergroups_read": "",
    "usergroups_write": "",
    "is_private": "",
    "is_favourite": "",
    "skype": "",
    "user_account_rowid": "",
    "is_deleted": "",
    "private_state": (jsonata(`$filter(${JSON.stringify(msg.body.addresses)}, function($v) { $v.description = 'primary'})`).evaluate()).city,
    "youtube_url": "",
    "url": "",
    "company_name": "",
    "name_and_firstname": "",
    "total_entries_readable_with_current_permissions": ""
  };
  return expression;
}
