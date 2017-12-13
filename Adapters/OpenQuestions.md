# Open Questions Related To Adapter Design

This document discusses problems not addressed by the adapter guide or
proposed changes to the existing guide.

There is an additional guide `AdapterGuide.md` which explains how to design a adapter.

There is an additional document `AdapterCompletenessChecklist.md` which is a
checklist which lists all items which should be done for a fully complete
adapter.

## Table of Contents

- [Open Questions Related To Adapter Design](#open-questions-related-to-adapter-design)
- [ID Linking of the Objects Themselves](#id-linking-of-the-objects-themselves)
  - [Shared ID Pattern](#shared-id-pattern)
  - [Foreign Key pattern](#foreign-key-pattern)
  - [Third Party System Which Links IDs](#third-party-system-which-links-ids)
- [ID matching for Linked Objects](#id-matching-for-linked-objects)
- [Initial Data Fetch](#initial-data-fetch)
- [Standardized Event Metadata Information](#standardized-event-metadata-information)
- [Define behavior for handling object merges](#define-behavior-for-handling-object-merges)
- [Logging](#logging)
- [Event debouncing](#event-debouncing)
- [Other Open Questions](#other-open-questions)

# ID Linking of the Objects Themselves
When an adapter must alter (such as delete or update) a record in the system
that it is connected to, there needs to be a method to link incoming requests
from some  `other` system to the ids which exist in `this` system.  Consider the
following possibilities.

## Shared ID Pattern
Objects share ids between systems.
* Pros: Two way linking is possible
* Cons: Ids need to exist in the same universe (i.e. GUID vs 64-bit integer).
`this` system needs to allow the user to specify an ID upon creation.
* If a native `upsert` operation exists in `this` system is present, use that.
Otherwise, do a query for existence to determine if an insert or update
operation is required.  `isNew` as metadata could be useful.

## Foreign Key pattern
`this` system stores the id of the object in `other` system.
* Assumes that an additional column/property can be created in `this` system.
* Checks to see if an item exists where `otherId === incomingId`.  If yes,
   update that item.  Otherwise create an item. `isNew` as metadata could be
   useful.
* Cons: Two way linking becomes complicated.  One or both systems will have to
 support the capability to add additional fields.

## Third Party System Which Links IDs
* Incoming object already is aware of the id in `this` system because
 this information was previously fetched from a master data system.
  * See **OIH** for implementation.

# ID matching for Linked Objects
Consider the following situation:

Two CRMs, `FooCRM` and `BarCRM`, have both their salespeople and account
information synced.  There is a salesperson `Alice`.  FooCRM stores Alice's
salesperson ID as `123` and BarCRM stores Alice's salesperson ID as `abc`.  In
FooCRM, someone creates an account `Alpha GmbH`.  When the account is created,
some information about Alpha GmbH is recorded such as company name and address.
Additionally, it is recorded that the account is assigned to Alice.  Because
FooCRM and BarCRM accounts are synced, using the flows described in
`AdapterGuide` the creation of Alpha GmbH in FooCRM results in the creation of
an account in BarCRM.  The adapter for BarCRM will receive the
address and name information for Alpha GmbH.  The adapter will also be
informed that this account is assigned to salesperson `123` in FooCRM.  Given
this information, how does the adapter know to assign the new account in
BarCRM to salesperson `abc` in BarCRM?

# Initial Data Fetch
The current proposal dictates that polling triggers perform an initial import
when first run.  This is problematic for the following reasons:
* It is relatively easy to exceed API limits (see below section)
* An integration may not be interested doing an initial import.  This is particularly the case if:
  * The initial import was done offline separately
  * The flow is not new but is a modification of a previously existing flow
* A system may provide more resource efficient ways of providing the initial
 import.  For example, see [Marketo's Bulk Extract
 functionality.](http://developers.marketo.com/rest-api/bulk-extract/)
* Initial imports are uninteresting and time consuming for proof of concept demonstrations
* In the case of systems which support webhooks (such as the SugarCRM example), an integrator would have to:
  1. Start the flow with the polling trigger
  1. Wait for the polling import to finish
  1. Stop the polling flow
  1. Start the webhook flow.

An alternative to the current proposal is to:
* Have polling default to now on the first execution.  (An additional
 possibility is to make the first polling start time configurable.)
* Create an initial import trigger which when executed uses the appropriate Bulk
 Extract functionalities of the system to complete the initial import.
* Require polling trigger have config variables for pollingStart (which defaults
to now) and pollingEnd (which defaults to never).  This provides an operational
tool which can then be used as a recovery mechanism outages to the webhook
infrastructure.

# Standardized Event Metadata Information
Consider the standardized actions and triggers defined in `AdapterGuide.md`
and the following pieces of relevant system-agnostic information that these
triggers and actions likely could emit:
* Get Objects (Polling and webhook):
  * Whether the event reflects an object update or an object creation
  * The time of the object update or creation
  * The user which did the update or create
* Get Deleted Objects (Polling and webhook):
  * The time of the object deletion
  * The user which did the deletion
* Upsert object
  * Whether or not an object was updated or created
  * The time of object update or creation
* Lookup Object
  * The time lookup occurred
* Delete Object
  * The time of the object deletion

Currently, the omission of this information isn't relevant for the SugarCRM
example provided in the `AdapterGuide.md`.  However, providing this
information may be helpful for solving future problems.

# Define behavior for handling object merges
Merge object behavior isn't particularly common in APIs but it does exist.  (For
example, see
[Salesforce](https://developer.salesforce.com/docs/atlas.en-us.api.meta/api/sforce_api_calls_merge.htm)
and
[Marketo](http://developers.marketo.com/rest-api/endpoint-reference/lead-database-endpoint-reference/#!/Leads/mergeLeadsUsingPOST)).
In particular, merging of contact data in CRMs is a common operation and in the
case where contact data is synced between CRMs, it is foreseeable that having
merges in one system propagate to merges in integrated systems would be the
desired behavior.

# Logging
Adapters have the ability to log the data that passes through as well as
record the operations that the adapter completes.  This leads to the following
questions:
* What information needs to be logged so that the logs are useful
* Should logging formats be standardized to facilitate automatic linking of log events between adapters?
* What data passing through should be logged?  What data passing through is too sensitive to be logged?
* Should all adapters be able to work with (the language specific) a
 logging utility which allows logging settings (such as logging levels and log
storage mediums) to be uniformly configured between adapters written by
different developers.  (For example, consider [log4j for
Java](https://en.wikipedia.org/wiki/Log4j) and its ports to other languages.)

# Event debouncing
Consider the following flows:
- FooCRM.getObjects -> BarCRM.upsertObject
- BarCRM.getObjects -> FooCRM.upsertObject

Consider the following sequence of events:
1. An object is updated in FooCRM
1. FooCRM.getObjects detects the change and publishes the message.
1. BarCRM.upsertObject persists the update in BarCRM
1. BarCRM.getObjects detects the update and publishes a message
1. FooCRM.upsertObject persists the update in FooCRM
1. This triggers the event in step 1.

How is this cycle broken?

# Other Open Questions
* How to handle object changes in systems, without a change tracking?
  -> Implementation of a changelog is needed
* How to handle API Limits?
* Conflict resolution
* Batching (so that bulk read/write operations can be invoked for the sake of
 saving machine resources or using finite API calls efficiently)
* Two way mapping language (If I want changes to move from FooCRM to BarCRM and
 also from BarCRM to FooCRM does the integrator have to write the mapping twice
 (one for each direction) and enforce that mapping FooCRM -> BarCRM -> FooCRM
 is truly impotent.
