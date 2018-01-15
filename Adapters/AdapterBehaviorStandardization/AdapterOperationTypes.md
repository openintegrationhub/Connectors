# Table of Contents

<!-- TOC depthFrom:1 depthTo:6 withLinks:1 updateOnSave:1 orderedList:0 -->

- [Table of Contents](#table-of-contents)
- [Adapter Operation Types](#adapter-operation-types)
	- [Receive updates to information that is from a system](#receive-updates-to-information-that-is-from-a-system)
	- [Create and update information in a system](#create-and-update-information-in-a-system)
	- [Lookup Operations](#lookup-operations)
	- [Domains Specific Actions](#domains-specific-actions)
	- [Domain Specific Triggers](#domain-specific-triggers)

<!-- /TOC -->

# Adapter Operation Types

This document lists the types of operations an adapter can perform, the motivations for
providing this functionality as well as the related API functionality which must
exist for an efficient implementation of these functionalities.

This document is formatted in the following way:
1. Different goals of an adapter are listed.
2. For each goal, different implementations of that goal are listed.
3. For each implementation, the required API functionality is listed.

# Triggers
Triggers in an adapter move data from inside the system to outside of the
system.  Triggers are expected to be the first item in an integration flow.

## Bulk Import
**Goal:** An entire data set exists in the system.  An integrator wants to export
all of the data that exists in the system through an integration flow.



## Receive Updates to Information (Updates Propagate out of a System)
**Goal:** As data is added to, updated in and deleted from the system, we want a
flow to be triggered with that information.

There are

## Domain Specific Triggers
**Goal:** Be able to trigger flows when events or modifications happen within
the system which are distinct from *CRUD* operations.

*Examples: be informed of merged records, an email tracking program detects that
an email has been opened, some async operation has been completed*

# Actions
Actions in an adaptor allow flows to interact with the system after some other
event has occurred.

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
