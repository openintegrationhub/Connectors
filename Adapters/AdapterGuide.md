# Guide for creating an Adapter

This guide explains the problems which an
adapter must solve and the recommended way doing so.

## Table of Contents

- [What is an Adapter?](#what-is-an-adapter)
- [What API functionality is necessary to build an Adapter?](#what-api-functionality-is-necessary-to-build-a-adapter)
- [Given an API how should an Adapter behave?](#given-an-api-how-should-a-adapter-behave)
  - [Question 1: Is the list of business objects dynamic?](#question-1-is-the-list-of-business-objects-dynamic)
  - [Question 2: Is the structure of objects dynamic?](#question-2-is-the-structure-of-objects-dynamic)
  - [Question 3: Does the API support webhooks?](#question-3-does-the-api-support-webhooks)
- [Descriptions of standardized actions or triggers](#descriptions-of-standardized-actions-or-triggers)
  - [Standardized Triggers (including webhooks)](#standardized-triggers-including-webhooks)
    - [Get Objects - Polling](#get-objects---polling)
    - [Get Objects - Webhook](#get-objects---webhook)
    - [Get Deleted Objects - Webhook](#get-deleted-objects---webhook)
    - [Get Deleted Objects - Polling](#get-deleted-objects---polling)
  - [Standardized Actions](#standardized-actions)
    - [Upsert Object](#upsert-object)
    - [Delete Object](#delete-object)
    - [Lookup Object By Field](#lookup-object-by-field)
- [Example of flows in a complete one way integration between two systems](#example-of-flows-in-a-complete-one-way-integration-between-two-systems)


# What is an Adapter?
An **adapter** is a single, reusable piece of functionality that typically
represents a way to communicate with one system and/or API.  This functionality
is created by combining code with a file (`component.json`) which describes:
* **triggers** - functionality which is triggered based on a schedule or by an
 external event (e.g. receiving data through a webhook)
* **actions** - functionality that can be called after the execution of a trigger or another action
* inputs and outputs for triggers and actions
* configuration settings (e.g. authentication information of the service, URL of the service)

[See elastic.io's definition of a component.json
file](https://support.elastic.io/support/solutions/articles/14000036334-component-descriptor-structure)

The intent is that several adapters can be combined to create an [integration
flow](https://support.elastic.io/support/solutions/articles/14000032295-what-is-an-integration-flow-).
 Several integration flows can then collectively form an integration.

# What API functionality is necessary to build an Adapter?
In order to build an adapter which will perform generic CRUD operations (for
business objects where business rules allow CRUD operations) the API must expose
CRUD functionality.  For more details on possible operation types, see
`AdapterOperationTypes.md`.  A guideline compliant adapter includes the following operations:
* Receive updates from a system
* Create and update information in a system
* Lookup Operations

**Note:** Although RESTful APIs are preferred, the API does not necessarily have
to be a REST API.  It is possible for the above functionality to be exposed via
a SOAP API, a SQL (or other) DB connection, etc.

*CRUD: Create, Read, Update and Delete*

# Given an API how should an Adapter behave?
The expected actions and triggers of an adapter depend on the behavior of the
API.  If the API supports CRUD operations the following diagram explains which
triggers and actions should exist in the adapter.  The triggers and actions
should aim at covering 100% of the objects provided by the API.

![API Classification3](https://github.com/openintegrationhub/Connectors/blob/master/Adapters/Assets/ApiClassification.svg)
A checklist for each case exists in the document [AdapterCompletenessChecklist.md](https://github.com/openintegrationhub/Connectors/blob/master/Adapters/AdapterChecklists/DesiredAdapterBehaviors.md).

## Question 1: Is the list of business objects dynamic?
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

## Question 2: Is the structure of objects dynamic?
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

## Question 3: Does the API support Webhooks?
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

# Descriptions of standardized actions or triggers
It is important to define common rules on how an adapter responds to changes
and performs actions on generic domain objects.  If adapters follow
common behavior, it is possible to build integrations by combining
adapters developed by different developers.

In general, all actions or triggers should emit events individually as opposed
to creating batches.

In general, any action or trigger should only make requests to one API endpoint
(with the exception of calls required for authentication). I.e. It is ok
for a trigger to traverse paged results, but it should not make multiple calls
to combine data.

## Standardized triggers (including Webhooks)
### Get Objects - Polling
This trigger will be scheduled to execute periodically.  When executed, it will
fetch all objects in the database that have been modified or created since the
previous execution. During the first execution, the trigger will start at the
beginning of time. This means the trigger will initially fetch all objects.
It will emit one message per object that changed since the last polling interval.
The entire object should be emitted as the message body.

The naming convention for this trigger should be `get<objectNamePlural>Polling`.
For example, if the trigger was for objects called `Customer` objects, the name
of the trigger should be `getCustomersPolling`.  If the lists of objects in a
system are generic, it is possible to write a single trigger where the object
type is a configuration setting.  In this case, the trigger should be named
`getObjectsPolling`.

In many systems, if the number of matching results is too large, only a
subset is returned on the first request (the first page).  Often systems
can return the results based on some ordering.  (In our case, the useful
ordering will be by last updated time.)  The system will often provide either a
link to the next page or the next page can be obtained by modifying the search
criteria so that objects in the first page no longer match the query.  It is up
to the adapter developer to determine how many pages are returned per polling
execution.

[Example in the SugarCRM
adapter](https://github.com/elasticio/sugarcrm-component/blob/master/lib/triggers/getObjectsPolling.js)

### Get Objects - Webhook
Instead of being scheduled periodically, this trigger will be triggered upon
data being delivered via a REST API call to an endpoint on the platform.

The webhook for this trigger should pass information about objects that are
created or updated as the objects are created or updated. There should be one
message per persisted change. The entire object should be emitted as the message
body. In some cases, it is possible to programmatically start and stop a
webhook.

The naming convention for this trigger should be `get<objectNamePlural>Webhook`.
For example, if the trigger was for objects called `Customer` objects, the name
of the trigger should be `getCustomersWebhook`.  If different types of objects
in the system can be fetched in a uniform way, then it is possible to write a
single trigger where the object type is a configuration setting.  In this case,
the trigger should be named `getObjectsWebhook`.

[Example in the SugarCRM
adapter](https://github.com/elasticio/sugarcrm-component/blob/master/lib/triggers/getObjectsWebhook.js)

### Get Deleted Objects - Webhook
This trigger is similar to *Get Objects - Webhook*, however, instead of having
information transferred when an object is created or updated, this trigger is
activated when an object is deleted.  This trigger should emit an event with the
id of the object that was deleted.

The naming convention for this trigger should be `getDeleted<objectNamePlural>Webhook`.

[Example in the SugarCRM
adapter](https://github.com/elasticio/sugarcrm-component/blob/master/lib/triggers/getDeletedObjectsWebhook.js)

### Get Deleted Objects - Polling
This trigger is similar to *Get Objects - Polling* however, instead of having
information transferred when an object is created or updated, this trigger is
activated when an object is deleted.  This trigger should emit an event with the
id of the object that was deleted.

The naming convention for this trigger should be `getDeleted<objectNamePlural>Polling`.

Many APIs may not support this behavior.

## Standardized actions
### Upsert Object
This action accepts an object as its input.  If the incoming object does not
have an ID, this action will create an object in the system it is connected to.
If the incoming object does have an ID, this action will update the object in
the system with the corresponding ID.  The adapter should emit the state of
the object after the update/insert.

The naming convention for this action should be `upsert<objectNameSingular>`. (e.g. `upsertCustomer`)

[Example in the SugarCRM
adapter](https://github.com/elasticio/sugarcrm-component/blob/master/lib/actions/upsertObject.js)

### Delete Object
Given an incoming message with an ID, delete the corresponding object in the
system.  The action should emit a message with the object of the ID which was
deleted.

The naming convention for this action should be `delete<objectNameSingular>`. (e.g. `deleteCustomer`)

[Example in the SugarCRM
adapter](https://github.com/elasticio/sugarcrm-component/blob/master/lib/actions/deleteObject.js)

### Lookup Object by Field
Given a value for a field in which all values are unique, fetches and emits
the corresponding object.  If the action is provided with an empty value
(`undefined`, `null` or the empty string), then this action should emit a new
message with an empty body.  If the non-empty field matches either 0 or more
than 1 object, then the connector should throw an error.

The naming convention for this action should be
`lookup<objectNameSingular>ByField`.
(e.g. `lookupCustomerByField`)

Consider the motivation for this action by considering the following example:
You want to add a new lead for a company in a CRM.  In order to create a new
lead which is linked to the company in the CRM, the `upsertLead` action must
know the CRM's ID for the company.  However, the incoming information doesn't
have the CRM's ID for the company, only information which identifies the company
(e.g. Name, Ticker Symbol, Tax number, etc.).  The `lookupCompanyByTickerSymbol`
could be placed before the `upsertLead` action to learn this information with
the goal of passing this information to the following action.

*Note:* The value of `0` should not be considered as empty since some ecosystems
such as Microsoft's, use `0` as [a default value for an
enum](https://docs.microsoft.com/en-us/dotnet/standard/design-guidelines/enum).

**Example for revised action TBD**

# Example of flows in a complete one way integration between two systems
A complete one way integration between two systems is an integration where:
* One system is the system of truth
* Creations, updates and deletions happen only in one system
* Any creation, update or deletion of an object in that system results in the
 corresponding creation, update or deletion in the other system.

One possible implementation for the complete integration can be done by building
the following flows.  These flows are built exclusively with standardized
actions and triggers.  The two systems are identified by `Foo` and `Bar` where
Foo is the system of truth.  It is assumed that each system falls into *Case 1*
described in the `AdapterCompletenessChecklist.md`.  Additionally, both Foo
and Bar are configured with a field, `externalId` to store the id of the object
once it exists in the other system.  The Mapper is configured to convert the
data in Foo's format to Bar's format.  Additionally, as the objects pass through
the mapper, the values of `id` and `externalId` are swapped.
* Foo.getObjectsPolling -> Mapper -> Bar.upsertObject -> Mapper -> Foo.upsertObject (Flow is run only during initial import)
* Foo.getObjectsWebhook -> Mapper -> Bar.upsertObject -> Mapper -> Foo.upsertObject
* Foo.getDeletedObjectsWebhook -> Mapper -> Bar.deleteObject

 The `Foo.upsertObject` step is done to propagate the id of the object in Bar back into Foo.
