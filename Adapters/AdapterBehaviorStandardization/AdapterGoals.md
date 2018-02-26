# Adapter Goals
**Version Publish Date: 26.02.2018**

**Semantic Version of Document: 1.0.0**

This document identifies goals *that can be generalized across systems* and then
lists the standard implementations that satisfy those
goals.

This document is formatted in the following way:
1. Different goals of an adapter are listed.
2. For each goal, different implementations of that goal are listed.

## Bulk Extract
**Goal:** An entire data set exists in the system.  An integrator wants to export
all of the data or all of that data which matches certain criteria that exists in the system through an integration flow.

**Standardized Actions and Triggers:**
* Bulk Extract
* Get Objects Polling

## Detect Data/Object Changes
**Goal:** As object data is added to, updated in and deleted from the system, we want a
flow to be triggered with that information.

We may also want to observe changes in many-to-many relationships

We may also want to be able to trigger flows when objects undergo a merge operation (e.g. merge duplicate contacts).

**Standardized Actions and Triggers:**
Basic Case:
* Get Objects Polling
* Get Objects Webhook
* Bulk Extract (with integration platform side delta detection)
Delete Case:
* Get Deleted Objects Polling
* Get Deleted Objects Webhook
* Bulk Extract (with integration platform side deletion detection)
Merge Case:
TBD
Link Case:
TBD

## System Specific Event Observation
**Goal:** Be able to trigger flows when events or modifications happen within
the system which are distinct from *CRUD* operations.

*Examples: an email tracking program detects that
an email has been opened, some async operation has been completed*

**Standardized Actions and Triggers:**
* Get Events Polling
* Get Events Webhook
* Bulk Extract (of event log with integration platform side delta detection)

## Lookup Information in the System
**Goal:** The system supports some mechanisms to query data.  You want to execute some
 query in order to fetch the corresponding data.  This includes the case when
 you have some information which is expected to at most one record in the system
 and you want the rest of the information associated with that record.  Some
 systems support system specific query language that may be exposed. (e.g. SQL
 in a SQL database, [Salesforce's
 SOQL](https://developer.salesforce.com/docs/atlas.en-us.soql_sosl.meta/soql_sosl/sforce_api_calls_soql.htm),
 etc.)

**Standardized Actions and Triggers:**
* Lookup Object By Field(s)
* Lookup Objects By Criteria
* Execute System Specific Query/Modification Language Operation

## Modify Records in the System
**Goal:** The system duplicates some part of some set of information that is
stored in another system.  As information in the other system changes, you want
those changes to be propagated into this system.

The system may also have objects which have relationships to other objects
*within the same system.  We want to modify those relationships.

The system has objects which can be merged with other objects of the
same type within the system. We want to trigger such merges.

*Examples: Duplicate contact merge, corporate merge*

**Standardized Actions and Triggers:**
Create, Update and Delete Information in the System:
* upsertObject
* deepCreateObject
* deleteObject
Manipulate Links Between Objects:
* upsertLink
* deleteLink
Merge Objects:
TBD

## Perform a System Action/Invoke a System Function
**Goal:** The system supports the ability to
* trigger events (which may or may not result in side-effects outside the system)
* to modify the state of data inside the system in a way that is distinct from *CRUD* operations
* provide the results a complex calculation based on some inputs
* execute statements in a system specific data modification language that is
exposed. (e.g. SQL in a SQL database, [Salesforce's
SOQL](https://developer.salesforce.com/docs/atlas.en-us.soql_sosl.meta/soql_sosl/sforce_api_calls_soql.htm),
etc.)

*Examples: Send an email, flag document as helpful, [OData
Actions](http://docs.oasis-open.org/odata/odata/v4.0/errata03/os/complete/part1-protocol/odata-v4.0-errata03-os-part1-protocol-complete.html#_Actions_1),
Calculate the shipping price of a package, [OData
Functions](http://docs.oasis-open.org/odata/odata/v4.0/errata03/os/complete/part1-protocol/odata-v4.0-errata03-os-part1-protocol-complete.html#_Functions_1), SQL stored procedures*

**Standardized Actions and Triggers:**
* Perform Action/Evaluate Function
* Execute System Specific Query/Modification Language Operation

## Expose Endpoint(s)
**Goal:** The system has a API which exposes some endpoints.  An integrator
wants to interact with those endpoints directly and does not want the API
functionality abstracted away from them.  The only abstractions the integrator
may want are:
* Knowing/building the URL to which the request is provided
* Handling any authentication required by the request
* Exposing all inputs to the integration platform
* Carrying out the request, provide the results of the request back to the
platform and handling any errors that occur in the process

**Standardized Actions and Triggers:**
* Exposed Endpoint
* Generic Request



## Receive updates to information that is from a system
*(Updates propagate out of a system)*: The ability to extract new and updated
 information from a system.
  - [ ] Record the time of the last modification of all objects in the system
    - [ ] When a sub-object is modified that is not directly fetchable via the API
      (such as an address of a contact, a variant of a product or a shipment in an
      order) then the last modification time of the parent object should be updated
      as well.
    - [ ] When a link is created, updated or destroyed between two objects, an
    update must be triggered on at least one of the objects
  - [ ] Allow objects to be fetched based on the modification time
  - [ ] When an object is deleted in the system, allow information of that
  deletion to be propagated to an integration platform either by:
    * having deletion events be propagated through webhooks
    * allowing a list of recently deleted ids to be fetched

## Create and update information in a system
*(Updates propagate into a system)*: The ability to add information
 to a system and to update information once it is present in the system.
  - [ ] Given an object that is semantically valid (as per the business rules of
  the application), allow that object to be created.
  - [ ] Given the id of an object which already exists in the system, allow that
  object to be updated either fully or partially
  - [ ] Given an id of an object in the application, delete that object

## Lookup Operations
The ability to lookup some (mostly) static information
 based on some criteria.
  - [ ] Allow objects to be fetched by ID or some other unique field
  - [ ] (Optionally) Expose other generic search or lookup mechanisms

## Domains Specific Actions
The ability to modify the state of data inside
 the system that is distinct from *CRUD* operations (e.g. merge records) or the
 ability to trigger behavior which affects other systems (e.g. send an email).
  - [ ] Allow the action to be performed via the API

## Domain Specific Triggers
The ability to be informed of modifications
 inside the system that are distinct from *CRUD* operations (e.g. be informed
 of merged records) or the ability to be informed by behavior from outside the
 system by the system (e.g. an email tracking program detects that an email has
 been opened.)
  - [ ] Allow the event to be detected through webhooks or polling
