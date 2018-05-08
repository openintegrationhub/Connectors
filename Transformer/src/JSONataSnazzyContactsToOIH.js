{
    "oihUid": "",
    "oihCreated": "",
    "oihLastModified": $now(),
    "oihApplicationRecords": [
      {
        "applicationUid": "",
        "recordUid": rowid,
        "created": "",
        "lastModified": last_update
      }
    ],
    "title": title,
    "salutation": salutation,
    "firstName": firstname,
    "middleName": "",
    "lastName": name,
    "gender": "",
    "birthday": date_of_birth,
    "notes": "",
    "displayName": "",
    "language": "",
    "nickname": "",
    "jobTitle": position,
    "photo": picture_url,
    "anniversary": "",
    "address": [
      {
        "street": (private_street != null) ? $trim($substringBefore(private_street, $split(private_street, ' ')[-1])) : undefined ,
        "streetNumber": (private_street != null) ? $number($split(private_street, ' ')[-1]) : undefined ,
        "unit": "",
        "zipCode": private_zip_code,
        "city": private_town,
        "district": "",
        "region": private_state,
        "country": private_country,
        "countryCode": private_country_symbol,
        "primaryContact": "",
        "description": ""
      }
    ],
    "contactData": [
      {
        "value": phone,
        "type": "phone",
        "description": ""
      },
      {
        "value": phone2,
        "type": "phone",
        "description": "second phone number"
      },
      {
        "value": phone3,
        "type": "phone",
        "description": "third phone number"
      },
      {
        "value": mobile_phone,
        "type": "phone",
        "description": "mobile phone number"
      },
      {
        "value": private_mobile_phone,
        "type": "phone",
        "description": "private mobile phone number"
      },
      {
        "value": private_phone,
        "type": "phone",
        "description": "private phone number"
      },
      {
        "value": fax,
        "type": "fax",
        "description": ""
      },
      {
        "value": email,
        "type": "email",
        "description": ""
      },
      {
        "value": private_email,
        "type": "email",
        "description": "private email"
      },
      {
        "value": xing_url,
        "type": "xing",
        "description": ""
      },
      {
        "value": facebook_url,
        "type": "facebook",
        "description": ""
      },
      {
        "value": linked_in_url,
        "type": "linkedin",
        "description": ""
      },
      {
        "value": twitter_url,
        "type": "twitter",
        "description": ""
      },
      {
        "value": googleplus_url,
        "type": "google+",
        "description": ""
      },
      {
        "value": skype,
        "type": "skype",
        "description": ""
      },
      {
        "value": youtube_url,
        "type": "youtube",
        "description": ""
      },
      {
        "value": url,
        "type": "url",
        "description": ""
      }
    ],
    "calendars":[],
    "categories": []
  }
