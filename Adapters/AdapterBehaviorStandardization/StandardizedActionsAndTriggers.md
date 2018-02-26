# Descriptions of standardized actions or triggers
**Version Publish Date: 26.02.2018**

**Semantic Version of Document: 1.0.0**

It is important to define common rules on how an adapter responds to changes
and performs actions on generic domain objects.  If adapters follow
common behaviors, then it is possible to build integrations by combining
adapters which are developed by different developers.

In general, all actions or triggers should emit events individually as opposed
to creating batches.

In general, any action or trigger should only make requests to one API endpoint
(with the exception of any calls required for authentication). (I.e. It is ok
for a trigger to traverse paged results, but it should not make multiple calls
to combine data.)

## Standardized Triggers (including webhooks)
### Get Objects - Polling
This trigger will be scheduled to execute periodically.  When executed, this
trigger will fetch all objects in the database that have been modified or
created since the previous execution.  During the first execution, the trigger
will start at the beginning of time.   This means that this trigger will
initially fetch all objects.  It will emit one message per object that changes
since the last polling interval. The entire object should be emitted as the
message body.

The naming convention for this trigger should be `get<objectNamePlural>Polling`.
For example, if the trigger was for objects called `Customer` objects, the name
of the trigger should be `getCustomersPolling`.  If the lists of objects in a
system are generic, it is possible to write a single trigger where the object
type is a configuration setting.  In this case, the trigger should be named
`getObjectsPolling`.

In many systems, if the number of matching results is too large, then only a
subset will be returned on the first request (the first page).  Often systems
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

## Standardized Actions
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
Given an incoming message with an id, delete the corresponding object in the
system.  The action should emit a message with the object of the ID which was
deleted.

The naming convention for this action should be `delete<objectNameSingular>`. (e.g. `deleteCustomer`)

[Example in the SugarCRM
adapter](https://github.com/elasticio/sugarcrm-component/blob/master/lib/actions/deleteObject.js)

### Lookup Object By Field
Given an a value for a field in which all values are unique, fetches and emits
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
(e.g. Name, Ticker Symbol, Tax number, etc).  The `lookupCompanyByTickerSymbol`
could be placed before the `upsertLead` action to learn this information with
the goal of passing this information to the following action.

*Note:* The value of `0` should not be considered as empty since some ecosystems
such as Microsoft's, use `0` as [a default value for an
enum](https://docs.microsoft.com/en-us/dotnet/standard/design-guidelines/enum).

**Example for revised action TBD**
