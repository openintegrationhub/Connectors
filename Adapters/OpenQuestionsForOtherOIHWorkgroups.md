# Open Questions For Other OIH Workgroups

This document outlines potential design decisions made by other workgroups which
would effect some of the design decisions related to connector standardization.

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

 The viability of the above proposal should be tested.

 # ID Linking of the Objects Themselves
When an adapter must alter (such as delete or update) a record in the system
that it is connected to, there needs to be a method to link incoming requests
from some  `other` system to the ids which exist in `this` system.

The ID linking is solved by using [**OIHApplicationDataRecords**](https://github.com/openintegrationhub/Data-and-Domain-Models/tree/master/MasterDataModels#4-global-rules-and-regulations-for-omdms).
An **OIHApplicationDataRecord** is a reference to the record of the application or service being the source of the record and contains:
- The open integration hubs identifier for the application (mandatory)
- The record's ID within the application (mandatory)
- Creation and last modification dates of the record within the application (optionally)


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

# Event Debouncing
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
- How to handle object changes in systems, without a change tracking?
  - Implementation of a changelog is needed
  - Which functionalities are possible without a change tracking mechanism?
- How to handle API Limits?
  - Provide best pracitces to handle API limits
- Conflict resolution
  - Which conflicts can/should be handled within the adapters?
- Batching (so that bulk read/write operations can be invoked for the sake of
 saving machine resources or using finite API calls efficiently)
  - Which functionalities must be provided by the Adapter to enable batching
  - Which characteristics must be given in order to be able to support batching
- Two way mapping language (If I want changes to move from FooCRM to BarCRM and
 also from BarCRM to FooCRM does the integrator have to write the mapping twice
 (one for each direction) and enforce that mapping FooCRM -> BarCRM -> FooCRM
 is truly impotent.
   - Demand for two way mapping in the [minimal scenario](https://github.com/openintegrationhub/Board/blob/master/protocols/2017-11-13BoardWorkshop.md#use-case-scenarios)?