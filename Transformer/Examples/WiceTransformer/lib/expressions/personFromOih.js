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
    address_category2: '',
    phone: (jsonata(`$filter(${JSON.stringify(msg.body.contactData)}, function($v) { $v.description = 'primary'})`).evaluate()).value,
    wp_contact_remote_addr: '',
    phone3: '',
    status_date: '',
    picture: '',
    company: '',
    line_category2: '',
    address_location_formatted: '',
    private_email: '',
    colspan: '',
    email_check_result: '',
    address_category1: ' ',
    private_street_number: (jsonata(`$filter(${JSON.stringify(msg.body.addresses)}, function($v) { $v.description = 'primary'})`).evaluate()).streetNumber,
    mandant: '',
    position: msg.body.jobTitle,
    private_state: (jsonata(`$filter(${JSON.stringify(msg.body.addresses)}, function($v) { $v.description = 'primary'})`).evaluate()).city,
    private_country_symbol: '',
    mobile_phone: (jsonata(`$filter(${JSON.stringify(msg.body.contactData)}, function($v) { $v.description = 'secondary'})`).evaluate()).value,
    email_save_note: '',
    updated_by_user: '',
    rowid: (jsonata(`$filter(${JSON.stringify(msg.body.oihApplicationRecords)}, function($v) { $v.applicationUid = 2})`).evaluate()).recordUid,
    oldstatus_remarks: '',
    picture_url: msg.body.photo,
    deactivated: '',
    delete_link: '',
    serial_salutation: '',
    house_post_code: '',
    history_log: '',
    for_table: '',
    class_name: '',
    firstname: msg.body.firstName,
    standard_person: '',
    same_contactperson: '',
    status_time: '',
    column_header: '',
    private_email_save_note: '',
    private_phone: '',
    private_street: (jsonata(`$filter(${JSON.stringify(msg.body.addresses)}, function($v) { $v.description = 'primary'})`).evaluate()).street,
    updated_time: '',
    detail: '',
    eternal_exclusion_from_all_mailinglists: '',
    status_locked: '',
    address_category3: '',
    birthday: msg.body.birthday,
    remarks: '',
    column_output: '',
    fax: '',
    caring_employee: '',
    last_update: (jsonata(`$filter(${JSON.stringify(msg.body.oihApplicationRecords)}, function($v) { $v.applicationUid = 3})`).evaluate()).lastModified,
    address_category4: '',
    created_by_wp_contact: '0',
    salutation: msg.body.salutation,
    updated_by_user_group: '',
    phone2: (jsonata(`$filter(${JSON.stringify(msg.body.contactData)}, function($v) { $v.description = 'mobile'})`).evaluate()).value,
    oldstatus: '',
    title: msg.body.title,
    private_country: (jsonata(`$filter(${JSON.stringify(msg.body.addresses)}, function($v) { $v.description = 'primary'})`).evaluate()).country,
    private_mobile_phone: '',
    private_zip_code: (jsonata(`$filter(${JSON.stringify(msg.body.addresses)}, function($v) { $v.description = 'primary'})`).evaluate()).zipCode,
    name: msg.body.lastName,
    import_key: '',
    xing_url: (jsonata(`$filter(${JSON.stringify(msg.body.contactData)}, function($v) { $v.description = 'xing'})`).evaluate()).value,
    url: '',
    email: (jsonata(`$filter(${JSON.stringify(msg.body.contactData)}, function($v) { $v.type = 'email'})`).evaluate()).value,
    line_category1: '',
    private_town: (jsonata(`$filter(${JSON.stringify(msg.body.addresses)}, function($v) { $v.description = 'primary'})`).evaluate()).city,
    department: '',
    for_rowid: 199978
  };
  return expression;
};
