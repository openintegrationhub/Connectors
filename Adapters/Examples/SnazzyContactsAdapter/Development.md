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

In the most cases the process of calling functions in the component is synchronous. For instance, if we want to create a person in [Snazzy Contacts](https://snazzycontacts.com), we should invoke the action ``createPerson``, which first creates a session in [Snazzy Contacts](https://snazzycontacts.com). When the session is created, [Snazzy Contacts](https://snazzycontacts.com) returns a cookie which we have to use when we send request to [Snazzy Contacts](https://snazzycontacts.com) API endpoints. The next function in the action ``createPerson`` is ``checkForExistingUser()`` which checks if the person already exists. If yes, we update the person otherwise we create a new person. For these purposes we have used callback functions and the  promise library ([Q](https://www.npmjs.com/package/q)) to achieve the synchronous behavior. As you can see at the end of action ``createPerson``, we first call [Q](https://www.npmjs.com/package/q) and then the functions which must be executed one after other.

## Conclusion

[elasticio-snazzycontacts-component](https://github.com/openintegrationhub/Data-and-Domain-Models/tree/master/MasterDataModels/SnazzyContactsAdapter) is deployed on [elastic.io](http://www.elastic.io "elastic.io platform") platform and its features could be use for generating flows. The component can be used for further development as well. 
