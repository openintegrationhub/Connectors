# Guide for creating an Adapter

**Version Publish Date:** 01.03.2018

**Semantic Version of Document:** 1.0.0

This guide helps to classify an API and to derive a set of functionalities that can be performed by an Adapter with the given API.

## Table of Contents

- [Guide for creating an Adapter](#guide-for-creating-an-adapter)
    - [Table of Contents](#table-of-contents)
    - [Given an API how should an Adapter behave](#given-an-api-how-should-an-adapter-behave)
        - [Questions](#questions)
            - [Question 1: Is the list of business objects dynamic](#question-1-is-the-list-of-business-objects-dynamic)
            - [Question 2: Is the structure of objects dynamic](#question-2-is-the-structure-of-objects-dynamic)
            - [Question 3: Does the API support Webhooks](#question-3-does-the-api-support-webhooks)
    - [Desired Adapter Behavior](#desired-adapter-behavior)
        - [Case 1](#case-1)
            - [Triggers](#triggers)
            - [Actions](#actions)
        - [Case 2](#case-2)
            - [Triggers](#triggers-1)
            - [Actions](#actions-1)
        - [Case 3](#case-3)
            - [Triggers](#triggers-2)
            - [Actions](#actions-2)
        - [Case 4](#case-4)
            - [Triggers](#triggers-3)
            - [Actions](#actions-3)
        - [Case 5](#case-5)
            - [Triggers](#triggers-4)
            - [Actions](#actions-4)
        - [Case 6](#case-6)
            - [Triggers](#triggers-5)
            - [Actions](#actions-5)
    - [DocumentationGuidelines](#documentationguidelines)
        - [Must Have](#must-have)
            - [README.md](#readmemd)
            - [Component.json](#componentjson)
            - [AdapterFunctionalityChecklist.md](#adapterfunctionalitychecklistmd)
        - [Could Have](#could-have)
            - [README.md](#readmemd-1)
            - [AdapterDescriptionAndDocumentationChecklist](#adapterdescriptionanddocumentationchecklist)
            - [Other Files](#other-files)

## Given an API how should an Adapter behave

The expected actions and triggers of an adapter depend on the behavior of the
API.  If the API supports CRUD operations the following diagram explains which
triggers and actions should exist in the adapter.  The triggers and actions
should aim at covering 100% of the objects provided by the API.

 **Note:** Although RESTful APIs are preferred, the API does not necessarily have
 to be a REST API.  It is possible for the above functionality to be exposed via
 a SOAP API, a SQL (or other) DB connection, etc.

![API Classification3](Assets/ConnectorDecisionTree.svg)

A checklist for each case exists in the document
[AdapterCompletenessChecklist.md](/Adapters/AdapterChecklists/DesiredAdapterBehaviors.md).

### Questions

#### Question 1: Is the list of business objects dynamic

Some systems have a fixed list of objects (and corresponding API endpoints)
which exist in the system.  Other systems allow users and admins to create new
types of objects (which result in the system dynamically creating API
endpoints).  In this case, it is common for the system to provide an API
endpoint which can provide a list of all dynamic objects as well as the
structure of every object.

If the system has a fixed list of objects, then the adapter developer can
provide a hardcoded list of objects that the adapter can interact with.  If
the list of objects is dynamic and it is possible to use the API to learn the
list of existing objects, the developer should write code to fetch that list and
[provide that as dynamic
configuration](https://support.elastic.io/support/solutions/articles/14000041559-selectview#dynamic-select).
[See an example in
SugarCRM.](https://github.com/elasticio/sugarcrm-component/blob/master/lib/actions/lookupObject.js#L12-L15)
Furthermore, in the case of a dynamic list of business objects, since the list
of objects is unknown, the structure of objects is also unknown.  This means
that an answer of *yes* to *Question 1* implies an answer of *yes* to *Question
2*.

#### Question 2: Is the structure of objects dynamic

*As explained above, an answer of yes to Question 1 implies an answer of yes to
Question 2.*

Some systems have a fixed list of fields on every object.  Other systems allow
users and admins to customize the structure of each object.  In this case, it is
common for the system to provide an API endpoint which can provide the structure
of any object in the system.

If the objects have a fixed structure, then the adapter developer can hard code
the schema of the objects produced.  Otherwise, the developer should write code
to fetch [the dynamic structure of that
object.](https://github.com/elasticio/sugarcrm-component/blob/master/lib/actions/upsertObject.js#L36-L43).

#### Question 3: Does the API support Webhooks

Some external systems support the concept of **Webhooks**.  The idea of a hook
is that when a change occurs to an object in that external system, that external
system proactively informs other systems about this change.  Webhooks are
hooks where the information is transferred by having the system reporting the
change make a REST API call to the system making the change.  [See here for more
information about elastic.io
webhooks.](https://support.elastic.io/support/solutions/folders/14000109800)
This can be more efficient (both in terms of speed and machine resources) than
having a scheduled job periodically make calls for changes that may or may not
have occurred.

## Desired Adapter Behavior

### Case 1

- The list of business objects is dynamic
- The structure of the objects is dynamic (*Implied by above statement*)
- The API supports webhooks

#### Triggers

- [ ] [getObjectsPolling](https://github.com/openintegrationhub/Connectors/blob/master/Adapters/AdapterBehaviorStandardization/StandardizedActionsAndTriggers.md#get-new-and-updated-objects-polling) including functionality to
  - [ ] supply the list of readable objects
- [ ] [getObjectsWebhook](https://github.com/openintegrationhub/Connectors/blob/master/Adapters/AdapterBehaviorStandardization/StandardizedActionsAndTriggers.md#get-objects-webhook) including functionality to
  - [ ] supply the list of readable objects
  - [ ] supply the structure of the incoming objects
- [ ] [getDeletedObjectsWebhook](https://github.com/openintegrationhub/Connectors/blob/master/Adapters/AdapterBehaviorStandardization/StandardizedActionsAndTriggers.md#get-deleted-objects-webhook) including functionality to
  - [ ] supply the list of deletable objects

#### Actions

- [ ] [upsertObject](https://github.com/openintegrationhub/Connectors/blob/master/Adapters/AdapterBehaviorStandardization/StandardizedActionsAndTriggers.md#upsert-object) including functionality to
  - [ ] supply the list of writable objects
  - [ ] supply the structure of the incoming object
- [ ] [deleteObject](https://github.com/openintegrationhub/Connectors/blob/master/Adapters/AdapterBehaviorStandardization/StandardizedActionsAndTriggers.md#delete-object) including functionality to
  - [ ] supply the list of deletable objects
- [ ] [lookupObjectByField](https://github.com/openintegrationhub/Connectors/blob/master/Adapters/AdapterBehaviorStandardization/StandardizedActionsAndTriggers.md#lookup-object-at-most-1) including functionality to
  - [ ] supply the list of readable objects
  - [ ] supply the list of fields that can be searched

### Case 2

- The list of business objects is dynamic
- The structure of the objects is dynamic (*Implied by above statement*)
- The API does not support webhooks

#### Triggers

- [ ] [getObjectsPolling](https://github.com/openintegrationhub/Connectors/blob/master/Adapters/AdapterBehaviorStandardization/StandardizedActionsAndTriggers.md#get-new-and-updated-objects-polling) including functionality to
  - [ ] supply the list of readable objects
- [ ] [getDeletedObjectsPolling](https://github.com/openintegrationhub/Connectors/blob/master/Adapters/AdapterBehaviorStandardization/StandardizedActionsAndTriggers.md#get-new-and-updated-objects-polling) (if possible)
  - [ ] including functionality to supply the list of deletable objects

#### Actions

- [ ] [upsertObject](https://github.com/openintegrationhub/Connectors/blob/master/Adapters/AdapterBehaviorStandardization/StandardizedActionsAndTriggers.md#upsert-object) including functionality to
  - [ ] supply the list of writable objects
  - [ ] supply the structure of the incoming object
- [ ] [deleteObject](https://github.com/openintegrationhub/Connectors/blob/master/Adapters/AdapterBehaviorStandardization/StandardizedActionsAndTriggers.md#delete-object) including functionality to
  - [ ] supply the list of deletable objects
- [ ] [lookupObjectByField](https://github.com/openintegrationhub/Connectors/blob/master/Adapters/AdapterBehaviorStandardization/StandardizedActionsAndTriggers.md#lookup-object-at-most-1) including functionality to
  - [ ] supply the list of readable objects
  - [ ] supply the list of fields that can be searched

### Case 3

- The list of business objects is static
- The structure of the objects is dynamic
- The API supports webhooks

#### Triggers

- [ ] [getObjectsPolling](https://github.com/openintegrationhub/Connectors/blob/master/Adapters/AdapterBehaviorStandardization/StandardizedActionsAndTriggers.md#get-new-and-updated-objects-polling) including
  - [ ] the static list of readable objects
- [ ] [getObjectsWebhook](https://github.com/openintegrationhub/Connectors/blob/master/Adapters/AdapterBehaviorStandardization/StandardizedActionsAndTriggers.md#get-objects-webhook) including
  - [ ] the static list of readable objects
  - [ ] functionality to supply the structure of the incoming objects
- [ ] [getDeletedObjectsWebhook](https://github.com/openintegrationhub/Connectors/blob/master/Adapters/AdapterBehaviorStandardization/StandardizedActionsAndTriggers.md#get-deleted-objects-webhook) including
  - [ ] the static list of deletable objects

#### Actions

- [ ] [upsertObject](https://github.com/openintegrationhub/Connectors/blob/master/Adapters/AdapterBehaviorStandardization/StandardizedActionsAndTriggers.md#upsert-object) including
  - [ ] the static list of writable objects
  - [ ] functionality to supply the structure of the incoming object
- [ ] [deleteObject](https://github.com/openintegrationhub/Connectors/blob/master/Adapters/AdapterBehaviorStandardization/StandardizedActionsAndTriggers.md#delete-object) including
  - [ ] the static list of deletable objects
- [ ] [lookupObjectByField](https://github.com/openintegrationhub/Connectors/blob/master/Adapters/AdapterBehaviorStandardization/StandardizedActionsAndTriggers.md#lookup-object-at-most-1) including functionality to
  - [ ] the static list of readable objects
  - [ ] supply the list of fields that can be searched

### Case 4

- The list of business objects is static
- The structure of the objects is dynamic
- The API does not support webhooks

#### Triggers

- [ ] [getObjectsPolling](https://github.com/openintegrationhub/Connectors/blob/master/Adapters/AdapterBehaviorStandardization/StandardizedActionsAndTriggers.md#get-new-and-updated-objects-polling) including
  - [ ] the static list of readable objects
- [ ] [getDeletedObjectsPolling](https://github.com/openintegrationhub/Connectors/blob/master/Adapters/AdapterBehaviorStandardization/StandardizedActionsAndTriggers.md#get-new-and-updated-objects-polling) (if possible)
  - [ ] including the static list of readable objects

#### Actions

- [ ] [upsertObject](https://github.com/openintegrationhub/Connectors/blob/master/Adapters/AdapterBehaviorStandardization/StandardizedActionsAndTriggers.md#upsert-object) including
  - [ ] the static list of writable objects
  - [ ] functionality to supply the structure of the incoming object
- [ ] [deleteObject](https://github.com/openintegrationhub/Connectors/blob/master/Adapters/AdapterBehaviorStandardization/StandardizedActionsAndTriggers.md#delete-object) including
  - [ ] the static list of deletable objects
- [ ] [lookupObjectByField](https://github.com/openintegrationhub/Connectors/blob/master/Adapters/AdapterBehaviorStandardization/StandardizedActionsAndTriggers.md#lookup-object-at-most-1) including functionality to
  - [ ] the static list of readable objects
  - [ ] supply the list of fields that can be searched

### Case 5

- The list of business objects is static
- The structure of the objects is static
- The API supports webhooks

#### Triggers

- [ ] [getObjectsPolling](https://github.com/openintegrationhub/Connectors/blob/master/Adapters/AdapterBehaviorStandardization/StandardizedActionsAndTriggers.md#get-new-and-updated-objects-polling) including
  - [ ] the static list of readable objects
- [ ] [getObjectsWebhook](https://github.com/openintegrationhub/Connectors/blob/master/Adapters/AdapterBehaviorStandardization/StandardizedActionsAndTriggers.md#get-objects-webhook) including
  - [ ] the static list of readable objects
  - [ ] the static structure of the incoming objects
- [ ] [getDeletedObjectsWebhook](https://github.com/openintegrationhub/Connectors/blob/master/Adapters/AdapterBehaviorStandardization/StandardizedActionsAndTriggers.md#get-deleted-objects-webhook) including
  - [ ] the static list of deletable objects

#### Actions

- [ ] [upsertObject](https://github.com/openintegrationhub/Connectors/blob/master/Adapters/AdapterBehaviorStandardization/StandardizedActionsAndTriggers.md#upsert-object) including
  - [ ] the static list of writable objects
  - [ ] the static structure of the incoming object
- [ ] [deleteObject](https://github.com/openintegrationhub/Connectors/blob/master/Adapters/AdapterBehaviorStandardization/StandardizedActionsAndTriggers.md#delete-object) including
  - [ ] the static list of deletable objects
- [ ] [lookupObjectByField](https://github.com/openintegrationhub/Connectors/blob/master/Adapters/AdapterBehaviorStandardization/StandardizedActionsAndTriggers.md#lookup-object-at-most-1) including functionality to
  - [ ] the static list of readable objects
  - [ ] the static list of fields that can be searched

### Case 6

- The list of business objects is static
- The structure of the objects is static
- The API does not support webhooks

#### Triggers

- [ ] [getObjectsPolling](https://github.com/openintegrationhub/Connectors/blob/master/Adapters/AdapterBehaviorStandardization/StandardizedActionsAndTriggers.md#get-new-and-updated-objects-polling) including
  - [ ] the static list of readable objects
- [ ] [getDeletedObjectsPolling](https://github.com/openintegrationhub/Connectors/blob/master/Adapters/AdapterBehaviorStandardization/StandardizedActionsAndTriggers.md#get-deleted-objects-polling) (if possible)
  - [ ] including the static list of readable objects

#### Actions

- [ ] [upsertObject](https://github.com/openintegrationhub/Connectors/blob/master/Adapters/AdapterBehaviorStandardization/StandardizedActionsAndTriggers.md#upsert-object) including
  - [ ] the static list of writable objects
  - [ ] the static structure of the incoming object
- [ ] [deleteObject](https://github.com/openintegrationhub/Connectors/blob/master/Adapters/AdapterBehaviorStandardization/StandardizedActionsAndTriggers.md#delete-object) including
  - [ ] the static list of deletable objects
- [ ] [lookupObjectByField](https://github.com/openintegrationhub/Connectors/blob/master/Adapters/AdapterBehaviorStandardization/StandardizedActionsAndTriggers.md#lookup-object-at-most-1) including functionality to
  - [ ] the static list of readable objects
  - [ ] the static list of fields that can be searched

## DocumentationGuidelines

Adapter Repository Requirements:

### Must Have

#### README.md

- [ ] Description of the application adapter connects to
- [ ] List of environment variables that need to be configured (e.g. OAuth ClientID/Secret)
- [ ] Description of the incoming message and outgoing message for each action/trigger (e.g. Update Contact Action)
  - [ ] Description of any attachments generated or consumed for each action/trigger
  
#### Component.json

The component.json acts as an entry point for systems. It holds meta information about the adapters functionality and can be used in several ways e.g. to generate an user interface

See the [AdapterJsonSchema](/Adapters/AdapterJsonSchema.json) for a template to create the `component.json` file.

- [ ] `component.json` should have a global `description` field filled.
- [ ] `component.json` should have a link to the documentation, e.g. `README` file below
- [ ] Each field in credentials should have a `note` on it explaining what exactly is required here (unless it's obvious, e.g. password)
- [ ] Each field except `password` should have a `placeholder` configured with a meaningful sample (unless it's obvious)
- [ ] Each trigger and action should have a `description` field configured explaining what given trigger/action does
- [ ] Each field in the trigger/action should have a `note` explaining what expected to be there as well as meaningful example
 in `placeholder` which could be (for optional fields) a default value if field is empty

#### AdapterFunctionalityChecklist.md

- [ ] A copy of the [Adapter FunctionalityChecklist](/../AdapterChecklists/AdapterFunctionalityChecklist.md) which tracks which functionality has been implemented in the component.

### Could Have

#### README.md

- [ ] Version and compatibility information
- [ ] Documentation for the authentication process (How to find API key, etc.)
- [ ] Screen shot of the parameters for each action/trigger with sample meaningful values (if parameters are defined for given trigger/action)
- [ ] Description of the parameters (if any) for each action/trigger
- [ ] Sample of the minimum viable input (e.g. for updating or creating something) for each action/trigger
- [ ] Description of the dynamic metadata generation rules, metadata discovery rules for each action/trigger
- [ ] Known limitations, may be with link to the issue
- [ ] Contribution guidelines (they should be standardized)
- [ ] License and copyright

#### AdapterDescriptionAndDocumentationChecklist

- [ ] A copy of this checklist which tracks completeness of the documentation.

#### Other Files

- [ ] Logo - 128x128 PNG file with transparent background
- [ ] License file
- [ ] Changelog