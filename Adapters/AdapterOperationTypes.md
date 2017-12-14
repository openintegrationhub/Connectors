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

**What Adapter Functionality Can Be Build and What API Functionality is
Necessary to Allow Functionality?**

An adapter has the ability to perform the following categories of operations.
Each category of operations requires certain functionality to exist in the API.
The following lists each category of adapter behavior and the required API
functionality to build such adapter behavior.

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
