# Guide for creating an Adapter

This guide explains the problems which an
adapter must solve and the recommended way doing so.

## Table of Contents

- [Guide for creating an Adapter](#guide-for-creating-an-adapter)
  * [Table of Contents](#table-of-contents)
- [What is an Adapter?](#what-is-an-adapter)
- [What does an Adapter Abstract?](#what-does-an-adapter-abstract)
  * [1. An Adapter Exposes an Endpoint](#1-an-adapter-exposes-an-endpoint)
  * [2. An Adapter Exposes the Ability to Manipulate Data Stored by a System](#2-an-adapter-exposes-the-ability-to-manipulate-data-stored-by-a-system)
- [Given an API how should an Adapter behave?](#given-an-api-how-should-an-adapter-behave)
  * [Question 1: Is the list of business objects dynamic?](#question-1-is-the-list-of-business-objects-dynamic)
  * [Question 2: Is the structure of objects dynamic?](#question-2-is-the-structure-of-objects-dynamic)
  * [Question 3: Does the API support Webhooks?](#question-3-does-the-api-support-webhooks)


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

 **Note:** Although RESTful APIs are preferred, the API does not necessarily have
 to be a REST API.  It is possible for the above functionality to be exposed via
 a SOAP API, a SQL (or other) DB connection, etc.

# What does an Adapter Abstract?
There are two ways in which an adapter can expose the API functionality:
## 1. An Adapter Exposes an Endpoint
In this approach, the API exposes an endpoint and the adaptor provides actions
as a way to call that endpoint from a flow.  For example, [Mandrill's API
contains the Send Message API
endpoint](https://mandrillapp.com/api/docs/messages.JSON.html#method=send).
This endpoint expects parameters related to email sending and tracking to be
provided to the endpoint.  An adapter exposes this functionality by allowing the
values for all of these parameters to be configured by an integrator.  In this
case, the adapter is responsible for the following:
* Knowing/building the URL to which the request is provided
* Handling any authentication required by the request
* Exposing all inputs to the integration platform
* Carrying out the request, provide the results of the request back to the
platform and handling any errors that occur in the process

## 2. An Adapter Exposes the Ability to Manipulate Data Stored by a System
In this approach, the external system is a system which stores data that can be
read and manipulated through an API.  The adapter, instead of providing explicit
access to API mechanisms, provides actions and triggers which facilitate the
reading and manipulation of the underlying data.  For instance, consider
[Salesforce's REST
API](https://developer.salesforce.com/docs/atlas.en-us.api_rest.meta/api_rest/resources_list.htm).
This API exposes many endpoints where the purpose of most of the endpoints is to
read and manipulate data in Salesforce.  While it is possible to expose these
endpoints using method 1, doing so is generally not useful as it requires the
integrator to have a deep understanding of the mechanisms specific to this API.
Therefore, the adapter should encapsulate/abstract away the mechanics of the API
by making actions and triggers available to the integrator so that the
integrator can manipulate data.  This is in addition to all of the
responsibilities of approach 1.

*Note: Within any given adapter, it is possible to combine the two approaches if
*doing so makes sense.*

# Given an API how should an Adapter behave?
The expected actions and triggers of an adapter depend on the behavior of the
API.  If the API supports CRUD operations the following diagram explains which
triggers and actions should exist in the adapter.  The triggers and actions
should aim at covering 100% of the objects provided by the API.

![API Classification3](https://github.com/openintegrationhub/Connectors/blob/master/Adapters/Assets/ApiClassification.svg)
A checklist for each case exists in the document
[AdapterCompletenessChecklist.md](https://github.com/openintegrationhub/Connectors/blob/master/Adapters/AdapterChecklists/DesiredAdapterBehaviors.md).

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