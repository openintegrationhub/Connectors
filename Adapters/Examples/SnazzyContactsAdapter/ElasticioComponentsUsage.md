## Usage of [elastic.io ](http://www.elastic.io "elastic.io platform") built-in components during development of [Snazzy Contacts](https://snazzycontacts.com) component

The component consists of mainly from ***actions*** and ***triggers*** which play the major role in generating flows on [elastic.io ](http://www.elastic.io "elastic.io platform") platform.

If we want to connect two components using [elastic.io ](http://www.elastic.io "elastic.io platform") platform, we should generate a flow which gets data from one component and transfer it to another.  Let's say that we want to transfer all contacts saved by a user in [SilverERP](http://www.silvererp.com/) into [Snazzy Contacts](https://snazzycontacts.com). Then we have to go through the following steps:

1. Choosing the ***trigger*** ``getPersons`` - which will return an array of objects from  [SilverERP](http://www.silvererp.com/) component.

```
[{
    "rowid": "7855651086429",
    "name": "Marc",
    "firstname": "Deusser"
  },
  {
    "rowid": "7855651073225",
    "name": "Benedetto",
    "firstname": "De Lauso"
    }
  }]
```

2. As a result we have an array of objects which we have to split using the built-in [elastic.io Splitter ](https://github.com/elasticio/splitter-component) component. Therefore the component splits the incoming data and returns all objects. Consequently all these objects will be sent to [elasticio-snazzycontacts-component](https://github.com/openintegrationhub/Data-and-Domain-Models/tree/master/MasterDataModels/SnazzyContactsAdapter) in the next step.

3. Choosing the ***action*** ``createPerson`` from [Snazzy Contacts](https://snazzycontacts.com) component - calling this ***action*** we save every single object in [Snazzy Contacts](https://snazzycontacts.com).

### Result

If the above steps were successfully completed you will be able to see all persons from [SilverERP](http://www.silvererp.com/) already saved in your [Snazzy Contacts](https://snazzycontacts.com) account.
