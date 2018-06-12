# Guide for creating an Adapter

This guide explains the problems which an
adapter must solve and the recommended way doing so.

# Table of Contents

- [Given an API how should an Adapter behave?](#given-an-api-how-should-an-adapter-behave)
  * [Question 1: Is the list of business objects dynamic?](#question-1-is-the-list-of-business-objects-dynamic)
  * [Question 2: Is the structure of objects dynamic?](#question-2-is-the-structure-of-objects-dynamic)
  * [Question 3: Does the API support Webhooks?](#question-3-does-the-api-support-webhooks)

# Given an API how should an Adapter behave?
The expected actions and triggers of an adapter depend on the behavior of the
API.  If the API supports CRUD operations the following diagram explains which
triggers and actions should exist in the adapter.  The triggers and actions
should aim at covering 100% of the objects provided by the API.

 **Note:** Although RESTful APIs are preferred, the API does not necessarily have
 to be a REST API.  It is possible for the above functionality to be exposed via
 a SOAP API, a SQL (or other) DB connection, etc.


![API Classification3](/Adapters/Assets/ApiClassification.svg)
A checklist for each case exists in the document
[AdapterCompletenessChecklist.md](/Adapters/AdapterChecklists/DesiredAdapterBehaviors.md).

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
