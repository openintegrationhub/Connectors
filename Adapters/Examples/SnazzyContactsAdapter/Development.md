# Development of elasticio-snazzycontacts-component

## Introduction
The component's (also called **adapter** or **connector**) main goal is to connect [Snazzy Contacts](https://snazzycontacts.com) with third party software via [elastic.io](http://www.elastic.io "elastic.io platform") platform.  With this connector you are able to create different flows on [elastic.io](http://www.elastic.io "elastic.io platform") platform. The component supports **"Triggers"** (e.g. ``getPersons``, ``getOrganizations``) as well as **"Actions"** (e.g. ``updatePerson``, ``createOrganization``, ``updatePersonsOrganization``, etc.), therefore with this component you could both read and fetch data from [Snazzy Contacts](https://snazzycontacts.com) and write and save data in [Snazzy Contacts](https://snazzycontacts.com) via [elastic.io platform](http://www.elastic.io "elastic.io platform").

## Development

### Steps

The component's development went through the following steps:

1. Exploring [elastic.io](http://www.elastic.io "elastic.io platform") platform and its functionality.
2. Reading the documentation on [elastic.io](http://www.elastic.io "elastic.io platform") platform.
3. Analysing the component structure and the process of building it.
4. Experimenting and testing Petstore component(i.e _Hello World_ example).
5. Creating an [elasticio-snazzycontacts-component](https://github.com/openintegrationhub/Data-and-Domain-Models/tree/master/MasterDataModels/SnazzyContactsAdapter) structure (**schemas, actions, triggers**).
6. Implementing the functionality of actions and triggers.
7. Accessing [Snazzy Contacts API](https://snazzycontacts.com) endpoints from [elasticio-snazzycontacts-component](https://github.com/openintegrationhub/Data-and-Domain-Models/tree/master/MasterDataModels/SnazzyContactsAdapter).
8. Deploying the component on [elastic.io](http://www.elastic.io "elastic.io platform") platform.
9. Testing [elasticio-snazzycontacts-component](https://github.com/openintegrationhub/Data-and-Domain-Models/tree/master/MasterDataModels/SnazzyContactsAdapter) with raw data.
10. Generating flows on [elastic.io](http://www.elastic.io "elastic.io platform") platform.

### Flows

>[SilverERP](http://www.silvererp.com/) ---> [elasticio-snazzycontacts-component](https://github.com/openintegrationhub/Data-and-Domain-Models/tree/master/MasterDataModels/SnazzyContactsAdapter) ---> [Snazzy Contacts](https://github.com/openintegrationhub/Data-and-Domain-Models/tree/master/MasterDataModels/SnazzyContactsAdapter)


The idea of this flow is to save data in [Snazzy Contacts](https://snazzycontacts.com) after getting it from [SilverERP](http://www.silvererp.com/). There are three components in this scenario: [SilverERP component](http://www.silvererp.com/) -  [elastic.io Splitter  component](https://github.com/elasticio/splitter-component) - [elasticio-snazzycontacts-component](https://github.com/openintegrationhub/Data-and-Domain-Models/tree/master/MasterDataModels/SnazzyContactsAdapter).

Flow explanation:
  1. Getting data (in this case *persons*) from [SilverERP](http://www.silvererp.com/) through the trigger ``getPersons`` from [SilverERP component](http://www.silvererp.com/).
  2. The response from [SilverERP](http://www.silvererp.com/) is an array of objects:
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
  3. Using [elastic.io Splitter  component](https://github.com/elasticio/splitter-component) which splits incoming data using splitting expression and returns objects which will be sent to [elasticio-snazzycontacts-component](https://github.com/openintegrationhub/Data-and-Domain-Models/tree/master/MasterDataModels/SnazzyContactsAdapter) later on.
  4. Adding data (in this case *person*) from the previous steps in [Snazzy Contacts](https://snazzycontacts.com) via the action ``createPerson`` in [elasticio-snazzycontacts-component](https://github.com/openintegrationhub/Data-and-Domain-Models/tree/master/MasterDataModels/SnazzyContactsAdapter).

## Findings


The following behavior and results were observed during the process of developing and testing the [elasticio-snazzycontacts-component](https://github.com/openintegrationhub/Data-and-Domain-Models/tree/master/MasterDataModels/SnazzyContactsAdapter).


1. According to [elastic.io](http://www.elastic.io "elastic.io platform") platform each flow should be executed in every **3 minutes**. In our case the flow is executing every **20 minutes**, which means that only one person is saved in **20 minutes**. This flow timing issue decreases the performance level.  
2. Sometimes when the trigger ``getPerosns`` in [SilverERP component](http://www.silvererp.com/) is called the response from  [SilverERP API](http://www.silvererp.com/) contains values which do not match to the name (``name:value`` pairs). Therefore after calling [elastic.io Splitter  component](https://github.com/elasticio/splitter-component) and [elasticio-snazzycontacts-component](https://github.com/openintegrationhub/Data-and-Domain-Models/tree/master/MasterDataModels/SnazzyContactsAdapter) in the next step the person is saved in [Snazzy Contacts](https://snazzycontacts.com) with wrong data.
```
[{
      "firstname": "ETF Elektronik GmbH"
      "name": "Herr Schulz"
      "rowid": "7855522711217"
    },
    {
      "firstname": "DBS Electronics"
      "name": ""
      "rowid": "7855765147091"
}]
```

## Conclusion

[elasticio-snazzycontacts-component](https://github.com/openintegrationhub/Data-and-Domain-Models/tree/master/MasterDataModels/SnazzyContactsAdapter) is deployed on [elastic.io](http://www.elastic.io "elastic.io platform") platform and its features could be use for generating flows. The component can be used for further development as well. The reason for the slow flow timing should be determined and thus  the performance of data transmission will be improved.
