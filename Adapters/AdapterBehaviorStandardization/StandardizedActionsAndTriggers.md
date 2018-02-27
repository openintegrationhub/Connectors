# Descriptions of standardized actions or triggers
**Version Publish Date: 26.02.2018**

**Semantic Version of Document: 1.0.0**

It is important to define common rules on how an adapter responds to changes
and performs actions on generic domain objects.  If adapters follow
common behaviors, then it is possible to build integrations by combining
adapters which are developed by different developers.

This document describes standards for these actions and triggers.  For each
standardization, it provides:
* A description of the behavior for the action/trigger
* A description of required configurations/inputs for the action/trigger
* The outputs of the action/trigger (including the metadata which is learned by the action/trigger)
* Operational concerns related to the action/trigger
* The required functionality which must exist in the underlying API
* A sample pseudo-code for an implementation against a typical REST API

Many of these actions and triggers operate on objects where systems support multiple types of
If the lists of objects in a
system are generic, it is possible to write a single trigger where the object
type is a configuration setting.

# Standardized Triggers (including webhooks)
## Bulk Extract
Given an object type, outputs each object of that type in the system once by
some mechanism which is different than paging through all results based on the
`modifiedOn` timestamp. An example of such a mechanism is [Marketo's Bulk
Extract mechanism](http://developers.marketo.com/rest-api/bulk-extract/). After
the first execution, further runs should not produce further output.  Can expose
server-side filters if they exist in the system.

**Required configurations/inputs:**
* The type of object to extract
* Ideally, the configuration
should take a `onlyModifiedBefore` timestamp which limits the results to records
created on or modified before this timestamp.
* This action can optionally be configured to handle server-side filters.

**Outputs (including metadata):**
* Each record in the system as an individual output
* Each record should have the timestamp for the last modified datetime
accessible at `modifiedOn` in ISO 8601 format
* Each record should have the timestamp for the creation datetime accessible at
 `createdOn` in ISO 8601 format
* Each record should have a timestamp in ISO 8601 for when the record was emitted.

**Operational concerns:**
Generally, this trigger will be combined with `Get Objects Polling` or `Get
Objects Webhook` which will be configured to pick up changes which happen after
the `onlyModifiedBefore`.

Sometimes when webhooks and polling by date modified are not supported by a
system, a solution is to regularly run Bulk Extract on a daily basis and use
delta detection to identify changes.

**Required API functionality:**
- [ ] A mechanism which allows all objects of a type to be iterated
- [ ] A `modifiedOn` timestamp should exist on each object to identify when it
was modified so that the `onlyModifiedBefore` can be applied

**Sample pseudo-code implementation:**
DB Dump Case:
```
async function BulkExtract(onlyModifiedBefore, objectType) {
    const dbDumpJob = await StartDbDumpJob(objectType);
    const dbDumpUrl = await dbDumpJob;
    const dbDumpReader = CreateDbDumpReader(dbDumpUrl);
    
    dbDumpReader.on('record', (record) => {
        const output = StandardizeModifiedOnAndCreatedOnForRecord(record);
        if(output.modifiedOn < onlyModifiedBefore) {
            EmitOutput(output);
        }
    }
    
    dbDumpReader.on('end', () => {
        SetTriggerToNotExecuteAgain();
    }
}
```
Stable List with Pagination Case:
```
async function BulkExtract(onlyModifiedBefore, objectType) {
    let hasMorePages = true;
    let pageNum = 0;
    while (hasMorePages) {
        const pageOfResults = await MakeRequestForResultsPage(pageNum, objectType);
        pageOfResults.records.forEach(record => {
            const output = StandardizeModifiedOnAndCreatedOnForRecord(record);
            if(output.modifiedOn < onlyModifiedBefore) {
                EmitOutput(output);
            }
        }
        hasMorePages = PageOfResults.hasMorePages;
    }
    SetTriggerToNotExecuteAgain();
}
```

## Get Objects Polling
This trigger will be scheduled to execute periodically.  When executed, this
trigger will fetch all objects in the database that have been modified or
created since the previous execution.  It will emit one message per object that changes or is added
since the last polling interval. The entire object should be emitted as the
message body.

**Required configurations/inputs:**
* The type of object to poll for
* Optionally filter values for any server side filters supported
* A timestamp which indicates where in time to begin polling from.  If this
 value is set to the begining of time, the trigger will do a DB export on the
 inital run.  If set to now, only future modifications will be exported and the
 first execution will return no results.
* An optional timestamp which indicates the end of polling time.  The trigger
 will not return results which have been modified after this timestamp.
* Optionally, any server-side hydration of linked objects.

**Outputs (including metadata):**
* Each record as an individual output
* Each record should have the timestamp for the last modified datetime
accessible at `modifiedOn` in ISO 8601 format
* Each record should have the timestamp for the creation datetime accessible at
 `createdOn` in ISO 8601 format
* Each record should have a timestamp in ISO 8601 for when the record was emitted.
* Each record should have a `isNew` flag to indicate if the record was created
 during the poll window.

**Operational concerns:**
Sometimes, this trigger will be configured to start running after `Bulk Exact` is executed.
Sometimes, this trigger will act as a fallback mechanism for webhook failures.

**Required API functionality:**
- [ ] Allow objects to be fetched based on the modification time
- [ ] Record the time of the last modification of all objects in the system
OR
- [ ] Support for [delta links](http://docs.oasis-open.org/odata/odata/v4.0/errata03/os/complete/part1-protocol/odata-v4.0-errata03-os-part1-protocol-complete.html#_Toc453752294)
AND
  - [ ] When a sub-object is modified that is not directly fetchable via the API
    (such as an address of a contact, a variant of a product or a shipment in an
    order) then the parent object should be considered updated as well.
  - [ ] When a link is created, updated or destroyed between two objects, an
    update must be triggered on at least one of the objects

**Sample pseudo-code implementation:**
TBD

## Get Objects Webhook
Instead of being scheduled periodically, this trigger will be triggered upon
data being delivered via a REST API call to an endpoint on the platform.

The webhook for this trigger should pass information about objects that are
created or updated as the objects are created or updated. There should be one
message per persisted change. The entire object should be emitted as the message
body. In some cases, it is possible to programmatically start and stop a
webhook.

**Required configurations/inputs:**
* The type of object to receive
* Optionally filter values for any server side filters supported
* Optionally, any server-side hydration of linked objects.

**Outputs (including metadata):**
* Each record as an individual output
* Each record should have the timestamp for the last modified datetime
accessible at `modifiedOn` in ISO 8601 format
* Each record should have the timestamp for the creation datetime accessible at
 `createdOn` in ISO 8601 format
* Each record should have a timestamp in ISO 8601 for when the record arrived at the webhook.
* Each record should have a `isNew` flag to indicate if the record was created
 during the poll window.

**Operational concerns:**
This can be deployed along side a polling trigger so that the polling trigger
can recover data lost during outages.

**Required API functionality:**
* Webhooks
* Optionally, these webhooks can be programatically configured, started and stopped.

**Sample pseudo-code implementation:**
TBD

## Get Deleted Objects Polling
This trigger is similar to `Get Objects Polling` however, instead of having
information transferred when an object is created or updated, this trigger is
activated when an object is deleted.

**Required configurations/inputs:**
* Type of object to poll

**Outputs (including metadata):**
* This trigger should emit an event with the id of the object that was deleted.
* This trigger should emit the time of deletion if possible.
* This trigger should emit the time the deletion was detected.

**Operational concerns:**
Same as all polling triggers

**Required API functionality:**
- [ ] When an object is deleted in the system, allow information of that
deletion to be propagated to an integration platform by allowing a list
of recently deleted ids to be fetched.

**Sample pseudo-code implementation:**
TBD

## Get Deleted Objects Webhook
Webhook variant of `Get Deleted Objects Polling`.

**Required configurations/inputs:**
* Type of object to detect

**Outputs (including metadata):**
* This trigger should emit an event with the id of the object that was deleted.
* This trigger should emit the time of deletion if possible.
* This trigger should emit the time the deletion was detected.

**Operational concerns:**
Same as all webhook triggers

**Required API functionality:**
- [ ] When an object is deleted in the system, allow information of that
deletion to be propagated to an integration platform by having deletion events
be propagated through webhooks

**Sample pseudo-code implementation:**
TBD


## Get Events Polling
Similar to `Get Objects Polling` except for events

**Required configurations/inputs:**
* Optionally filter values for any server side filters supported
* A timestamp which indicates where in time to begin polling from.  If this
 value is set to the begining of time, the trigger will do a DB export on the
 inital run.  If set to now, only future modifications will be exported and the
 first execution will return no results.
* An optional timestamp which indicates the end of polling time.  The trigger
 will not return results which have been modified after this timestamp.

**Outputs (including metadata):**
* Each event as an individual output
* Each event should have the timestamp for the time of the event
  accessible at `happenedOn` in ISO 8601 format.
* Each record should have a timestamp in ISO 8601 for when the record is emitted.

**Operational concerns:**
Same as for `Get Objects Polling`.

**Required API functionality:**
* The ability to poll an event log by event time

**Sample pseudo-code implementation:**
TBD

## Get Events Webhook
Webhook variant of `Get Events Polling`.

**Required configurations/inputs:**
* Optionally filter values for any server side filters supported

**Outputs (including metadata):**
* Each event as an individual output
* Each event should have the timestamp for the time of the event
  accessible at `happenedOn` in ISO 8601 format.
* Each record should have a timestamp in ISO 8601 for when the record arrives at the webhook.

**Operational concerns:**
Same as for `Get Objects Webhook`.

**Required API functionality:**
* Events Webhooks
* Optionally, these webhooks can be programatically configured, started and stopped.

**Sample pseudo-code implementation:**
TBD





# Actions
## Lookup Object by Field(s)
Given a set of criteria which matches at most one record, find that matching
record.

**Required configurations/inputs:**
* Object type to look up
* Field to search by
* Value for the fields
* Behavoir for when 0 records match (error vs emit empty)

**Outputs (including metadata):**
If no matches, emit the empty object or error.
If exactly one match, emit the matched object.
If multiple matches, throw an exception.
If the action is provided with an empty value
(`undefined`, `null` or the empty string), then this action should emit a new
message with an empty body.
*Note:* The value of `0` should not be considered as empty since some ecosystems
such as Microsoft's, use `0` as [a default value for an
enum](https://docs.microsoft.com/en-us/dotnet/standard/design-guidelines/enum).

**Operational concerns:**
This will generally sit before an upsert or create operation where the ids of
objects to be linked need to be fetched.
Consider the motivation for this action by considering the following example:
You want to add a new lead for a company in a CRM.  In order to create a new
lead which is linked to the company in the CRM, the `upsertLead` action must
know the CRM's ID for the company.  However, the incoming information doesn't
have the CRM's ID for the company, only information which identifies the company
(e.g. Name, Ticker Symbol, Tax number, etc).  The `lookupCompanyByTickerSymbol`
could be placed before the `upsertLead` action to learn this information with
the goal of passing this information to the following action.
This action may incorporate caching.

**Required API functionality:**
Allow objects to be fetched by ID or some other unique field

**Sample pseudo-code implementation:**
TBD

## Lookup Objects By Criteria
Given some search criteria, find the objects matching this criteria.  The entire
search criteria should be emitted as an array.

**Required configurations/inputs:**
* Object type to search
* Max number of results to return.
* Server side sort order of result set
* Criteria defining the search

**Outputs (including metadata):**
The search criteria as an array.  If no records match, then the empty array
should be returned.

**Operational concerns:**
Generally, this component will exist in an HTTP request-reply flow.
This action may incorporate caching.

**Required API functionality:**
The ability to do searches for objects

**Sample pseudo-code implementation:**
TBD

## Execute System Specific Query/Modification Language Operation
If the system has a query or data modification language, provide the ability to
execute arbitrary data modification expressions.

**Required configurations/inputs:**
The expression to execute

**Outputs (including metadata):**
The results of the query in the same schema returned by the system.

**Operational concerns:**

**Required API functionality:**
The existence of a Query/Modification Language in the system.

**Sample pseudo-code implementation:**
TBD




## Upsert Object
This action accepts an object as its input.  If the incoming object does not
have an ID, this action will create an object in the system it is connected to.
If the incoming object does have an ID, this action will update the object in
the system with the corresponding ID.    If an update is performed, a partial
instead of full update operation should be performed.

**Required configurations/inputs:**
* The type of object to upsert
* The id of the object in the system where the upsert is occuring
* The object being updated.  Ids which point to linked objects can be included in the

**Outputs (including metadata):**
The adapter should emit the state of the object after the update/insert (including the ID).
The adapter should indicate if a create was performed as part of the operation.
The adapter should indicate the time that the operation was performed at.

**Operational concerns:**
In many cases, the endpoints for updating and creating are different.  However,
it is common to have this action sit in a flow which is started by `Get Objects
Polling` or `Get Objects Webhook`.  To avoid boilerplate if branches in flows,
these two operations should be combined.

**Required API functionality:**

**Sample pseudo-code implementation:**
TBD

## Deep Create Object
Some APIs allow linked objects to be created along side other objects.  This
action is designed to expose that functionality.

**Required configurations/inputs:**
* The parent object to create
* The structure of the

**Outputs (including metadata):**
The adapter should emit the state of the object after the creation (including the ID).
The adapter should indicate the time that the operation was performed at.

**Operational concerns:**
Generally, this action will be in a flow started by a webhook which receives
commands from some external application.

**Required API functionality:**

**Sample pseudo-code implementation:**
TBD


## Delete Object
Deletes an object.

**Required configurations/inputs:**
* The type of object to delete.
* The Id of the object to delete.

**Outputs (including metadata):**
The time the deletion was completed.

**Operational concerns:**

**Required API functionality:**

**Sample pseudo-code implementation:**
TBD

## Upsert Link
Creates a link between two objects.

**Required configurations/inputs:**
The types and ids of the two objects to link.
The type of link to create.

**Outputs (including metadata):**
The link created.
The time of creation.

**Operational concerns:**
Some systems allow one to many relationships to be set by modifying the 1 side
of the relationship.  This pattern is mainly intended for many to many
relationships and APIs where link modification is separate from object
modification.

**Required API functionality:**

**Sample pseudo-code implementation:**
TBD

## Delete Link
Inverse of upsertLink

**Required configurations/inputs:**
The types and ids of the two objects to unlink.

**Outputs (including metadata):**
The time of link destruction.

**Operational concerns:**

**Required API functionality:**

**Sample pseudo-code implementation:**
TBD

## Set Data For Object
Given some structured metadata for an object, set the metadata for the object to
this structure.
E.g. Update inventory

**Required configurations/inputs:**
* Related Object ID
* The metadata

**Outputs (including metadata):**

**Operational concerns:**

**Required API functionality:**

**Sample pseudo-code implementation:**
TBD

## Perform Action/Evaluate Function
The system supports the ability to
* trigger events (which may or may not result in side-effects outside the system)
* to modify the state of data inside the system in a way that is distinct from *CRUD* operations
* provide the results a complex calculation based on some inputs

**Required configurations/inputs:**
Inputs for the action/function.

**Outputs (including metadata):**
Output of the action/function.
Time of invocation.

**Operational concerns:**

**Required API functionality:**

**Sample pseudo-code implementation:**
TBD

## Exposed Endpoints
The system has a API which exposes some endpoints.  An integrator
wants to interact with those endpoints directly and does not want the API
functionality abstracted away from them.  The only abstractions the integrator
may want are:
* Knowing/building the URL to which the request is provided
* Handling any authentication required by the request
* Exposing all inputs to the integration platform
* Carrying out the request, provide the results of the request back to the
platform and handling any errors that occur in the process

## Generic Request
The system has an API of which the integrator has a deep understanding.  An
integrator wants to craft a raw request to the API where the integrator will
construct the URL, the request body and possibly some headers.  The only
abstractions provided by the component is handling authentication and parsing the response.
