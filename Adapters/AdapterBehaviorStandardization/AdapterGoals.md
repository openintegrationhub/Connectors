# Adapter Goals

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

## System Specific Event Observation
**Goal:** Be able to trigger flows when events or modifications happen within
the system which are distinct from *CRUD* operations.

*Examples: an email tracking program detects that
an email has been opened, some async operation has been completed*

**Standardized Actions and Triggers:**
* Polling for Events
* Events Webhook
* Bulk Extract (of event log with integration platform side delta detection)

## Lookup a Single Record Based on Some Criteria
**Goal:** You have some information which is expected to match exactly one
record in the system.  You want the rest of the information associated with
that record.

## Perform a Query in the System for Information
**Goal:** The system supports some system specific query language.  You want to
execute some query expression in order to learn the result.

*Examples: SQL in a SQL database, [Salesforce's
SOQL](https://developer.salesforce.com/docs/atlas.en-us.soql_sosl.meta/soql_sosl/sforce_api_calls_soql.htm)*

## Invoke a Function Which Returns a Value Based on Some Inputs (Without Any Side Effects)
**Goal:** The system supports the ability to provide the results a complex
*calculation based on some inputs.

*Examples: Calculate the shipping price of a package, [OData
Functions](http://docs.oasis-open.org/odata/odata/v4.0/errata03/os/complete/part1-protocol/odata-v4.0-errata03-os-part1-protocol-complete.html#_Functions_1)*

## Create, Update and Delete Information in the System
**Goal:** The system duplicates some part of some set of information that is
stored in another system.  As information in the other system changes, you want
those changes to be propogated into this system.

## Domains Specific Actions Which have Side Effects
**Goal:** The system has the ability trigger events or to modify the state of
data inside the system in a way that is distinct from *CRUD* operations.

*Examples: Send an email, merge contact records, [OData
Actions](http://docs.oasis-open.org/odata/odata/v4.0/errata03/os/complete/part1-protocol/odata-v4.0-errata03-os-part1-protocol-complete.html#_Actions_1)*





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
