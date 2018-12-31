const personFromOih = () => {
  const expression = {
    title: 'Prof.',
    salutation: 'Mr.',
    firstName: 'John',
    middleName: 'Anthony',
    lastName: 'Doe',
    gender: 'male',
    birthday: 'Wed, 14 Jun 1999 07:00:00 GMT',
    notes: 'Private notes',
    displayName: 'johndoe',
    language: 'english',
    nickname: 'johny',
    jobTitle: 'Sales manager',
    photo: 'http://example.org/photo.jpg',
    anniversary: '14 Jun',
    addresses: [{
      street: 'Hohestr',
      streetNumber: '3',
      unit: 'a',
      zipCode: '50667',
      city: 'Cologne',
      district: 'Alstadt-Sued',
      region: 'NRW',
      country: 'Germany',
      primaryContact: 'Hermann Schmitz',
      description: 'primary'
    },
    {
      street: 'Rudolfplatz',
      streetNumber: '3',
      unit: 'a',
      zipCode: '50667',
      city: 'Cologne',
      district: 'Alstadt-Sued',
      region: 'NRW',
      country: 'Germany',
      primaryContact: 'Hermann Schmitz',
      description: 'mailing'
    }
    ],
    contactData: [{
      value: '123456789',
      type: 'phone',
      description: 'primary'
    },
    {
      value: '00224477',
      type: 'phone',
      description: 'private'
    },
    {
      value: '95248793',
      type: 'phone',
      description: 'mobile'
    },
    {
      value: 'jon@doe.com',
      type: 'email',
      description: 'private'
    },
    {
      value: 'xing.de/yourUsername',
      type: 'xing',
      description: 'xing'
    },
    {
      value: '98326307',
      type: 'phone',
      description: 'secondary'
    }
    ],
    calendar: [{
      calendar: 'http://example.org/kalender/emuster',
      busyCalendar: 'http://example.org/kalender/emuster/busy',
      requestCalendar: 'http://example.org/kalender/emuster/appointment',
      description: 'private'
    }],
    category: [{
      name: 'private',
      description: 'private address data of the person'
    }],
    oihApplicationRecords: [{
      applicationUid: '',
      recordUid: '98765',
      created: '23215151',
      lastModified: '36542364'
    },
    {
      applicationUid: '',
      recordUid: '',
      created: '454545454',
      lastModified: {
        userId: '254',
        type: 'modification',
        timestamp: '2018-01-02'
      }
    }
    ]
  };
  return expression;
};

const personToOih = () => {
  const expression = {
    rowid: 98123,
    name: 'Smith',
    firstname: 'Mark',
    private_street: 'Main Str. 120',
    position: 'Marketing Manager',
    title: 'Prof',
    phone: 830238131,
    email: 'm.smith@mail.com'
  };
  return expression;
};

module.exports = {personFromOih, personToOih};
