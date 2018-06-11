# snazzycontacts-jsonata-transform-component [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url]
> Dedicated [Snazzy Contacts](https://snazzycontacts.com) data transformation component for elastic.io platform based on JSONata

## Authentication

This component requires no authentication.

## How it works

The component supports two actions - **Transform to OIH** and **Transform from OIH**. This means that the component takes the incoming message body from the previous step and creates a new expression in a ``JSON`` format. The new generated ``JSON`` object has specific properties which represent the input/output for the next/previous component in the flow.
The uses a fact that JSONata expression is a superset of JSON document so that by default any valid JSON document is a valid JSONata expression.

Let's see how the action **Transform from OIH** works. For example let's take this sample incoming message body from **OIH Database component** and transform it to a valid [Snazzy Contacts](https://snazzycontacts.com) object:

```js
{
  "rowid": msg.body.applicationRecordUid,
  "tenant": msg.body.tenant,
  "name": msg.body.lastName,
  "firstname": msg.body.firstName,
  "salutation": msg.body.salutation,
  "date_of_birth": msg.body.birthday
}
```

The result of that transformation will be the following JSON document:

```json
{
  "rowid": "198562",
  "tenant": "617",
  "name": "Doe",
  "firstname": "John",
  "salutation": "Mr.",
  "date_of_birth": "04.11.1980"
}
```

The action **Transform to OIH** works the same way. Let's take this incoming message body from [Snazzy Contacts](https://snazzycontacts.com) component:

```js
{
  "recordUid": msg.body.rowid,
  "oihLastModified": jsonata("$now()").evaluate(),
  "lastName": msg.body.name,
  "firstName": msg.body.firstname,
  "salutation": msg.body.salutation,
  "birthday": msg.body.date_of_birth,
}
```

The result of that transofrmation will be the following JSON document:

```json
{
  "recordUid": "198562",
  "oihLastModified": "2018-06-11T09:41:45.679Z",
  "lastName": "Doe",
  "firstName": "John",
  "salutation": "Mr.",
  "birthday": "04.11.1980"
}
```

## License

Apache-2.0 © [elastic.io GmbH](http://elastic.io)


[npm-image]: https://badge.fury.io/js/jsonata-transform-component.svg
[npm-url]: https://npmjs.org/package/jsonata-transform-component
[travis-image]: https://travis-ci.org/elasticio/jsonata-transform-component.svg?branch=master
[travis-url]: https://travis-ci.org/elasticio/jsonata-transform-component
[daviddm-image]: https://david-dm.org/elasticio/jsonata-transform-component.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/elasticio/jsonata-transform-component
