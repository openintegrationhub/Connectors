# Descriptions of standardized actions or triggers

**Version Publish Date:** 12.07.2021

**Semantic Version of Document:** 2.6.0

## Table of Contents

- [Actions](#actions)
  * [Upsert Object](#upsert-object)
  * [Lookup Object (at most 1)](#lookup-object-at-most-1)
  * [Lookup Objects (Plural)](#lookup-objects-plural)
  * [Delete Object](#delete-object)
  * [Make Raw HTTP Request](#make-raw-http-request)
  * [Lookup Set Of Objects By Unique Criteria](#lookup-set-of-objects-by-unique-criteria)
  * [Update Object](#update-object)
  * [Create Object](#create-object)
  * [Linking/Unlinking Objects](#linkingunlinking-objects)
  * [Execute Query or Statement in Query Language](#execute-query-or-statement-in-query-language)
  * [Perform Action/Evaluate Function](#perform-actionevaluate-function)
  * [Assert Option(s) in Set(s)](#assert-options-in-sets)
  * [Merge Objects](#merge-objects)
- [Batch Actions](#batch-actions)
- [Triggers](#triggers)
  * [Get New and Updated Objects Polling](#get-new-and-updated-objects-polling)
  * [Webhooks](#webhooks)
  * [Get Recently Deleted Objects Polling](#get-recently-deleted-objects-polling)
  * [Event Subscription](#event-subscription)
  * [Bulk Extract](#bulk-extract)
- [Attachments](#attachments)
  * [List of Attachment Meta-Information Fields](#list-of-attachment-meta-information-fields)
  * [Attachment Examples](#attachment-examples)

It is important to define common rules on how an adapter responds to changes
and performs actions on generic domain objects.  If adapters follow
common behaviors, then it is possible to build integrations by combining
adapters which are developed by different developers.

## Actions

### Upsert Object

##### Example Use Case
I have some contact data that I want to add to my CRM.  I don't necessarily know if there is already a contact in my CRM, so I want the connector to be smart and determine if the data needs to be matched to an existing contact or added to a new contract.

#### Iteration 1: Upsert Object By ID

##### Config Fields

- Object Type (dropdown)

##### Input Metadata

- One input per field in the ID that is optional.  This field is marked as being the ID.
- Inputs for other fields on the body.  All fields that are not nullable and can’t be populated by the system on create should be required.

##### Pseudo-Code

    function upsertObjectById(obj) {
      // If the object's ID is split across more than one field, we should check
      // that either all ID fields are populated or that none are.  Otherwise we
      // should throw an exception.

      const objectToUpdate = GetObjectById(obj.id);   // Usually GET verb
      if(objectToUpdate == null) {
        const createdObject = CreateObject(obj);    // Usually POST verb
        EmitData(createdObject);
      } else {
        const updatedObject = UpdateObject(obj, id);   // Usually POST/PATCH verb
        EmitData(updatedObject);
      }
    }

##### Output Data

- The object post creation/update as reported by the system

##### Gotcha’s to lookout for

- Updates should be partial updates
- Make sure to Url Encode IDs appearing in HTTP urls

#### Iteration 2: Update Object By Unique Criteria

##### Additional Config Fields

- Upsert Criteria: Drop down with all sets of unique constraints for the object in question

##### Input Metadata Changes

- The fields that are part of the upsert criteria are marked as being part of the criteria.  If the criteria is something other than the ID, they should be marked as required.
  (There is a hypothetical edge case here where the system auto-populates the unique criteria)

##### Pseudo-Code

    function upsertObjectByUniqueCriteria(obj, uniqueCriteria) {
      // Ensure unique criteria are all populated (unless ID)
      // If criteria is th the object's ID and it is split across more than one field, we should check
      // that either all ID fields are populated or that none are.  Otherwise we
      // should throw an exception.

      const objectsToUpdate = GetObjectsByCriteria(uniqueCriteria);   // Usually GET verb
      if(objectsToUpdate.length == 0) {
        const createdObject = CreateObject(obj);    // Usually POST verb
        EmitData(createdObject);
      } else if (objectsToUpdate.length == 1) {
        const updatedObject = UpdateObject(obj, objectsToUpdate[0].id);   // Usually POST/PATCH verb
        EmitData(updatedObject);
      } else {
        throw new Error(`More than one matching object found.`);
      }
    }

### Lookup Object (at most 1)
##### Example Use Case
I have a contact who works for a company.  I have an ID or other distinguishing characteristic (e.g. legal name) of the company and I want to learn some detail about the company (e.g. country of company).

#### Iteration 1: Lookup Object By ID

##### Config Fields

- Object Type (dropdown)
- Allow ID to be omitted (dropdown/checkbox: yes/no); when selected, the ID field becomes optional, otherwise it is a required field
- Allow zero results (dropdown/checkbox: yes/no); When selected, if zero results are returned, the empty object `{}` is emitted, otherwise typically an error would be thrown.
- Wait for object to exist (dropdown/checkbox: yes/no); When selected, if no results are found, apply rebounds and wait until the object exits.
- Linked objects to populate (optional, multi-select dropdown).  Select which linked objects to fetch if supported by the API.

##### Input Metadata

- One input per field in the ID.  Depending on the value of allowIdToBeOmitted this is optional or required.

##### Pseudo-Code

    function lookupObjectById(id) {
      if(!id) {
        if(allowCriteriaToBeOmitted) {
          emitData({});
          return;
        } else {
          throw new Error('No ID provided');
        }
      }

      try {
        const foundObject = GetObjectById(id, linkedObjectsToPopulate);   // Usually GET verb
        emitData(foundObject);
      } catch (NotFoundException e) {
        if(waitForObjectToExist && notAllReboundsExhausted) {
          emitRebound({});
        } else if(allowZeroResults) {
          emitData({});
        } else {
          throw e;
        }
      }
    }

##### Output Data

- The object as reported by the system

##### Gotcha’s to lookout for

- Make sure to Url Encode IDs appearing in HTTP urls

#### Iteration 2: Lookup Object By Unique Criteria

##### Additional Config Fields

- Lookup Criteria: Drop down with all sets of unique constraints for the object in question

##### Input Metadata Changes

- The input matches the selected criteria

##### Pseudo-Code

    function lookupObjectByUniqueCriteria(uniqueCriteria) {
      if(!uniqueCriteria) {
        if(allowCriteriaToBeOmitted) {
          emitData({});
          return;
        } else {
          throw new Error('No unique criteria provided');
        }
      }

      const foundObjects = GetObjectsByCriteria(uniqueCriteria, linkedObjectsToPopulate);   // Usually GET verb
      if(foundObjects.length == 0) {
        if(waitForObjectToExist && notAllReboundsExhausted) {
          emitRebound({});
        } else if(allowZeroResults) {
          emitData({});
        } else {
          throw new Error('Not found');
        }
      } else if (foundObjects.length ==1) {
        emitData(foundObjects[0]);
      } else {
        throw new Error('More than one object found.');
      }
    }


### Lookup Objects (Plural)
##### Example Use Case
I want to search my CRM for data based on some criteria.

##### Config Fields

- Object Type (dropdown, required)
- Behavior (dropdown: Fetch All, Fetch Page, Emit Individually, required)
- Linked objects to populate (multi-select dropdown, optional):  Select which linked objects to fetch if supported by the API.

##### Input Metadata

- Page Size (non-negative integer, optional: defaults to page size used by API): (only if fetch page mode) A value of `0` indicates that the `results` will be an empty array with only `totalCountOfMatchingResults` populated.
- Page Number (non-negative 0 based integer, optional: default to 0): (only if fetch page mode)
- Order (Array of fieldname + sort direction pairs, optional: default to empty array): (only if fetch page mode)
- Search Criteria: (optional: default to empty array). Search terms are to be combined with the *AND* operator. For each search term:
  - fieldName
  - fieldValue
  - condition (equal, not equal, >=, <=, >, <, like (if supported), whatever else is suppored by the API)

##### Pseudo-Code

    function lookupObjects(criteria) {
      switch(mode) {
        case 'fetchAll':
          const results = GetObjectsByCriteria(criteria, linkedObjectsToPopulate);
          emitData({results: results});
          break;
        case 'emitIndividually':
          const results = GetObjectsByCriteria(criteria, linkedObjectsToPopulate);
          results.forEach(result => {
            emitData(result);
          }
          break;
        case 'fetchPage':
          const {results, totalCountOfMatchingResults} = GetObjectsByCritieria(criteria, top: pageSize, skip: pageSize * pageNumber, orderBy: orderByTerms, linkedObjectsToPopulate);
          emitData({results, totalCountOfMatchingResults});
          break;
      }
    }

##### Output Data
- For **Fetch Page** mode:An object with
  - key `results` that has an array as its value
  - key `totalCountOfMatchingResults` which contains the total number of results (not just on the page) which match the search criteria
- For **Fetch All** mode: An object, with  key `results` that has an array as its value.
- For **Emit Individually** mode: Each object should fill the entire message.

##### Gotcha’s to lookout for

- Make sure to Url Encode field values appearing in HTTP urls
- The page size requested for the component may be larger that the page size supported by the API. In this case, the component must fetch multiple pages from the API to combine into a result.

##### Not Handled
- Using the *OR* operator to combine search terms

### Delete Object
##### Example Use Case
I know the ID of a customer that I want to delete.

#### Iteration 1: Delete Object By ID

##### Config Fields

- Object Type (dropdown)

##### Input Metadata

- One input per field in the ID that is required.

##### Pseudo-Code

    function deleteObjectById(id) {
      try {
        DeleteObjectById(id);   // Usually DELETE verb
      } catch (NotFoundException e) {
        emitData({});
        return;
      }
      emitData({id: id});
    }

##### Output Data

- The id of the object deleted.

##### Gotcha’s to lookout for

- If zero objects are deleted, then the empty object should be emitted
- Make sure to Url Encode IDs appearing in HTTP urls

#### Iteration 2: Delete Object By Unique Criteria

##### Additional Config Fields

- Upsert Criteria: Drop down with all sets of unique constraints for the object type in question

##### Input Metadata Changes

- The input matches the selected criteria

##### Pseudo-Code

    function deleteObjectByUniqueCriteria(uniqueCriteria) {
      const foundObjects = GetObjectsByCritieria(uniqueCriteria);   // Usually GET verb
      if(foundObjects.length == 0) {
        emitData({});
      } else if (foundObjects.length == 1) {
        DeleteObjectById(foundObjects[0].id);   // Usually DELETE verb
        emitData({id: foundObjects[0].id});
      } else {
        throw new Error('More than one object found.');
      }
    }

### Make Raw HTTP Request
A simple action to allow integrators to assemble requests to be sent to the system.  The component should expose the parts that vary in a typical request.  The component should handle authentication and error reporting. It can optionally handle paging. In some cases, it may make sense to allow the option to make a series of sequential array requests though this later behavior is not yet standardized.

##### Example Use Case
I'm a technically advanced user who wants to interact with a system in a way not permissible by the existing component actions but would like some simplification relative to using the REST component.

##### Config Fields
* Error Tolerance (dropdown, required): Determines behavior for when an erroneous HTTP code is received. Options are as follows:
  * **No Errors Tolerated**: Any HTTP status code >= 400 should result in an error being thrown
  * **Only Not Found Errors Tolerated**: HTTP status codes of 404, 410 or similar should result in a message being produced with the status code and the HTTP reponse. All other error codes should result in an error being thrown.
  * **None**: Regardless of the HTTP error code, the component should produce an outbound message with the status code and the HTTP reponse.
  * **Manual**: A range of error codes to throw errors on can be configured via the message input.

##### Input Metadata
* Url (string, required): Path of the resource relative to the URL base.
* Method (string enum (Enum options are system specific.), required): HTTP Verb for the request. 
* Request Body (object, optional): Body of the request to send

If **Error Tolerance** is **Manual**:
  * HTTP Codes to throw errors (array of error ranges, optional default to `[]`): A double array with a list of ranges of HTTP response codes to throw errors upon receiving Use a syntax that matches [retry-axios](https://www.npmjs.com/package/retry-axios). Example: `[[400, 403], [405,599]]` - Throw errors on all errors apart from 404.

*For some systems, it may make sense to also add the HTTP headers.*

##### Output Data
* Status Code (integer, required): HTTP status code of the request
* Response Body (object, optional): JSON representation of the response body from the request

*For some systems, it may make sense to also add the HTTP headers.*

### Lookup Set Of Objects By Unique Criteria
Given an array of information where each item in the array uniquely describes exactly one object.  It can be assumed that the array is short enough to reasonably fit the results in a single message.  If any of the objects are not found then it indicates a logic problem in the integration.

##### Example Use Case
I salesperson is responsible for 0 to N accounts (N being reasonably small).  I would like to look up a piece of information for each account associated with the salesperson.

#### Iteration 1: Lookup Object By ID
#### Iteration 2: Lookup Object By Unique Criteria

##### Config Fields

- Object Type (dropdown)
- Linked objects to populate (optional, multi-select dropdown).  Select which linked objects to fetch if supported by the API.
- Wait for object to exist (dropdown/checkbox: yes/no); When selected, if no results are found, apply rebounds and wait until the object exits.
- Iteration 2: Unique Criteria (dropdown)

##### Input Metadata

- An array where each item has one input per field in the ID.  If the ID is a single field, this input can be a simple array (as opposed to an array of objects).  Required.

##### Pseudo-Code (Multi-Field ID Case)

    function lookupSetOfObjects(itemUniqueCriteriaListToLookup) {
      const results = itemUniqueCriteriaListToLookup.map(itemUniqueCriteria => {
        const matchingItems = GetObjectsByCriteria(itemUniqueCriteria, linkedObjectsToPopulate);
        if(matchingItems.length != 1) {
         if(!waitForObjectToExist) {
           throw new NotFoundError();
         }
         emitRebound({});
         return;
        }
        return {
          key: itemCriteria,
          value: matchingItems[0]
        }
      })
      EmitData(results);
    }

##### Pseudo-Code (Single-Field ID Case Where IN Operator is Supported)

    function lookupSetOfObjects(itemIdsToLookup) {
      if(itemIds.length = 0) {
        EmitData({});
        return;
      }

      const searchResults = FetchObjectsWhereIdIn(itemIdsToLookup, linkedObjectsToPopulate);

      const resultDictionary = {};
      for each (let itemId of itemIdsToLookup) {
        const matchingItems = searchResults.filter(result.Id = itemId);
        if(matchingItems.length != 1) {
          if(!waitForObjectToExist) {
            throw new NotFoundError();
          }
          emitRebound({});
          return;
        }
        resultDictionary[itemId] = matchingItems[0];
      }

      EmitData(resultDictionary);
    }

##### Output Data

- In the case of a single field criteria, a dictionary of the form `lookupCriteria: matchingItem`
- In the case of multi-field criteria, an array where each item in the array has the form `{"key": lookupCriteria, "value": matchingItem}`

##### Gotcha’s to lookout for

- Make sure to Url Encode IDs appearing in HTTP urls
- There are different structures depending on the input structure

### Update Object

- Similar to upsert object (both iteration 1 & 2) but:
  - We will not create the object if it does not exist
  - The ID/other unique criteria is required
  - No other fields are required
If the object is not found, then rebounds should be done based on the rebound option.

##### Example Use Case
I want to update the price of a product based on its SKU but I don't want to look up other required attributes such as name since I know those have already been set and are not changing.

### Create Object

Similar to upsert object but needed for the following cases:

- Objects that can be created but can not be updated after creation (e.g. Invoices)
- Cases where you want to create an object and its children
- Cases where the id of the object includes information in the object (e.g. The ID of a sales line is the sales order ID + SKU).

##### Example Use Case
See above.

### Linking/Unlinking Objects

- Given a many-to-many relationship in a system: create/update/remove a relationship between two objects.
- In order to do this, the inbound metadata needs to include:
  - the types of the two objects
  - two sets of unique criteria which describe the two objects
  - Information about the relationship (e.g. if assigning user to company membership, identify the role of the user)
- There should be an option to emit rebounds should be emitted if results aren't found.

    ```
    function linkObjects(obj1, obj2, linkMetadata) {
      const matchingObjects1 = lookupObjectByCriteria(obj1.type, obj1.uniqueCriteria);
      if (matchingObjects1.length > 1) {
        throw new Error('Too many found.');
      } else if (matchingObjects1.length == 0) {
        if(!waitForObjectToExist) {
          throw new NotFoundError();
        }
        emitRebound();
        return;
      }
      const object1Id = matchingObjects1[0].id;

      const matchingObjects2 = lookupObjectByCriteria(obj2.type, obj2.uniqueCriteria);
      if (matchingObjects2.length > 1) {
        throw new Error('Too many found.');
      } else if (matchingObjects2.length == 0) {
        if(!waitForObjectToExist) {
          throw new NotFoundError();
        }
        emitRebound();
        return;
      }
      const object2Id = matchingObjects2[0].id;

      createLink(object1Id, object2Id, linkMetadata);
    }
    ```

##### Example Use Case
A student can be a participant in a class and a class can have many students.  Given a student ID and a course ID I want to enroll that student in that course.

### Execute Query or Statement in Query Language
Examples of this include constructing a query or statement in SQL, Salesforce’s SOQL, etc. Queries return a table of data when executed.  Statements do not return results (other than execution statistics).

##### Example Use Case
Execute SQL query in SQL database

##### Config Fields

- Query Emit Behavior (dropdown: Fetch all, Emit Individually, Expect Single)
- Query

##### Input Metadata

- For each parameterized variable in the query, there should be an input
- If Emit Behavior is Expect Single: a boolean input "Allow Zero Results"

##### Pseudo-Code

    function executeQuery(query, params, mode, allowZeroResults) {
      const results = executeQueryOrStatementOnSystem(query, params);
      if(results is not QueryResultsTable) {
        emitData(results || {});
        return;
      }
      switch(mode) {
        case 'fetchAll':
          if(results.length >= maxResultSize) {
            throw new Error('Too many results');
          }
          emitData({results: results});
          break;
        case 'emitIndividually':
          results.forEach(result => {
            emitData(result);
          }
          break;
        case 'expectSingle':
          if(results.length = 1) {
            emitData(results[0]);
          } else if(results.length = 0 && allowZeroResults) {
            emitData({});
          } else {
            throw new Error('Incorrect Number of Results Found');
          }
          break;
      }
    }

##### Output Data

- If Query: Depends on mode
- If Statement: Execution statistics if available.  Otherwise an empty object as a result.

### Perform Action/Evaluate Function

*This action has not been fully standardized.*

Examples of this include sendEmail, calculatePrice, etc.

### Assert Option(s) in Set(s)
Given a field which can be set to a fixed list of options, ensure that this option exists in the list of selectable options.

##### Example Use Case
You run a store where each product has a color.  The list of colors are finite (e.g. red, green, blue).  One day, you decide to add a new color option yellow.

##### Config Fields

- Object Type (Dropdown)

##### Input Metadata

For each field in the object type where the populated data is a dropdown/multi-select
- One input which identifies the option value that needs to be in the set. Optional
- Inputs for any data related to the option being added.  Not applicable for all systems
Iteration 2: Have the above receive an array

##### Pseudo-Code

    let existingOptions = populateExistingOptions();

    function assertOptionInSet(toAssert) {
      const optionsDictionary = {};

      for([field, option] of Object.entries(toAssert)) {
        let existingOption = existingOptions[field][option.value];
        if(existingOption && existingOption.additionalData = option.additionalData) {
          // Nothing to do.  Publish info on the option
          optionsDictionary[field] = existingOption;
          break;
        }

        // Check for stale cached data
        existingOptions = populateExistingOptions();
        let existingOption = existingOptions[field][option.value];
        if(existingOption && existingOption.additionalData = option.additionalData) {
          // Nothing to do.  Publish info on the option
          optionsDictionary[field] = existingOption;
          break;
        }

        if(!existingOption) {
          // Need to add option
          const addedOption = AddOptionToSet(field, option.value, option.additionalData);
          optionsDictionary[field] = addedOption;
        } else {
          // Need to update option
          const updatedOption = UpdateOptionInSet(field, option.value, option.additionalData);
          optionsDictionary[field] = updatedOption;
        }
      }

      EmitData(optionsDictionary);
    }

##### Output Data

- An object with all the options and associated data

##### Gotcha’s to lookout for

- This action can not be run in parallel

### Merge Objects

*This action has not been fully standardized.*

Example: Contact merge.  There are usually two contacts, A and B with different IDs.  At the end of the merge, one ID remains with all external references to the other contact now pointing to the remaining contact.

## Batch Actions

*This set of actions has not been fully standardized.*

It is possible to make batch variants for many of the above actions.  The batch action should perform operations which behave as the other options described above.

## Triggers

### Get New and Updated Objects Polling
##### Example Use Case
I want to learn about changes to contacts in my CRM when they happen.

##### Config Fields

- Object Type (dropdown)
- Start Time (string, optional): Indicates the beginning time to start polling from (defaults to the beginning of time)
- End Time (string, optional): If provided, don’t fetch records modified after this time (defaults to never)
- Size of Polling Page (optional; positive integer) Indicates the size of pages to be fetched. Defaults to 1000.
- Single Page per Interval (dropdown/checkbox: yes/no; default yes) Indicates that if the number of changed records exceeds the maximum number of results in a page, instead of fetching the next page immediately, wait until the next flow start to fetch the next page.
- Time stamp field to poll on (dropdown: created or modified).  Indicates just new items or new and modified items.

##### Input Metadata

N/A

##### Gotcha’s to lookout for

- If `previousLastModified` is set to `lastSeenTime` and we have `lastModified >= previousLastModified` then each execution will include records from previous execution.  But if at the first execution `previousLastModified` could be equal `cfg.startTime` and we have `lastModified > previousLastModified` then we will lose objects whose last modified date is equal to the `cfg.startTime`.  This is why we compare `previousLastModified` and `cfg.startTime || new Date(0)` and if they are equal, use condition `lastModified >= previousLastModified,` else: `lastModified > previousLastModified,`
- We use `lastModified <= maxTime` as it is more understandable for user.
- We have `Single Page per Interval` default to yes because it is slightly safer.
- We need to be careful about more than a page worth of records having the same timestamp.
- We need to be careful about the last record on one page having the same timestamp as the first record on the next page
- We need to be careful about records on page N being modified before reading page N+1 (thus causing records to be skipped as they move from page N+1 to page N).

##### Assumptions About Server Behavior:
In order for the bellow polling algorithm to work, all of the following must be true about the way the server behaves:
* It is possible to order results by last modified and then by primary key.
* If record A has a timestamp of X and appears within a search but not record B, then if record B appears in a later search than record B MUST have a timestamp that is later (i.e. Not the same or earlier) than record A.

##### Pseudo-Code

**High level steps:**
1. Retrieve a page of data.
2. If the size of the page is less than the max page size, emit the timestamp of the last record on the page.
3. Compare the timestamps of the last and second last items on the page.  If they are different, store the timestamp of the second last record of the page and don't emit the last record.
4. If the timestamps are the same, then store that timestamp and the primary key of the last item.  On the next iteration fetch page where the timestamps are equal and primary key is larger than last seen item.

```
    function getObjectsPolling(cfg, snapshot) {
      const pollingField = cfg.timeStampFieldToPollOn;
      let attemptMorePages = !cfg.singlePagePerInterval;
      do {
        const previousLastModified = snapshot.previousLastModified || cfg.startTime || new Date(0);
        const maxTime = cfg.endTime || Date.MaxDate();

        let whereCondition;
        if(snapshot.previousId) {
          whereCondition = [
            pollingField = previousLastModified,
            Id > snapshot.previousId
          ];
        } else if (previousLastModified === cfg.startTime || new Date(0)){
          whereCondition = [
            pollingField >= previousLastModified,
            pollingField <= maxTime
          ];
        } else {
          whereCondition = [
            pollingField > previousLastModified,
            pollingField <= maxTime
          ];
        }

        const pageOfResults = GetPageOfResults({
          orderBy: [Time ascending, Primary Key Ascending]
          where: whereCondition,
          top: cfg.sizeOfPollingPage
        });

        const hasMorePages = pageOfResults.length == cfg.sizeOfPollinPage;

        if(!hasMorePages) {
          attemptMorePages = attemptMorePages && !snapshot.previousId;
          pageOfResults.forEach(result => {
            emitData(result);
          };
          if(pageOfResults.length > 0) {
            snapshot.previousLastModified = pageOfResults[pageOfResults.length - 1][pollingField]];
            delete snapshot.previousId;
            emitSnapshot(snapshot);
          }
        } else {
          const lastResult = pageOfResults.pop();
          pageOfResults.forEach(result => {
            emitData(result);
          };
          const secondLastResult = pageOfResults[pageOfResults.length - 1];
          snapshot.previousLastModified = secondLastResult[pollingField];
          if(lastResult[pollingField] !== secondLastResult[pollingField]) {
            delete snapshot.previousId;
          } else {
            snapshot.previousId = secondLastResult.id;
          }
          emitSnapshot(snapshot);
        }
      }
    }
```

##### Output Data

- Each object emitted individually.

### Webhooks

*This action has not been fully standardized.*

Receives data pushed to the iPaas from an external system.

### Get Recently Deleted Objects Polling
##### Example Use Case
I want to learn about contacts in my CRM that are deleted so that I can propagate those deletes.

##### Config Fields

Same as `Get New and Updated Objects Polling`.
##### Input Metadata

N/A

##### Pseudo-Code

Same as `Get New and Updated Objects Polling`.
##### Output Data

- Each object emitted individually.

### Event Subscription

*This action has not been fully standardized.*

The platform must have a part that is actively awake and is able to receive events based on some protocol.  Examples:
* Salesforce Event Bus
* AMQP component
* Socket component
* JMX component
* CometD protocol
* Long polling

### Bulk Extract

Useful for:

- Systems that do no track last_modified
- Systems that don’t support filtering by timestamp range
- Systems which have dedicated bulk export functionality
- Providing a way to track object deletions

## Attachments

This section describes what meta-information for attachments should be communicated as part of the message body and how this meta-information should be included.

There are the following cases where a component would produce an attachment:
* **Binary Field Case:** There is some binary/non-text data that is stored as part of an entity (e.g. Photo of a contact in a CRM)
* **File System Case:** The component is interacting with a 3rd party system that could be described as being a "drive" that exposes a file system (e.g. SFTP, Google Drive, etc.)
* **File Generation Case:** The component creates an attachment of a specified type based on the inputs to the step (e.g XML or CSV component creates XML/CSV files based on incoming JSON data)

For the **Binary Field Case**, we would expect the attachment information to appear as an inline object that is appropriately placed within the message body object. Otherwise, for the **File System Case** and the **File Generation Case** the file attachment meta-information can be an object that occupies the entire message body.

### List of Attachment Meta-Information Fields
* `attachmentUrl` (Expected for all three cases): URL to a steward or maester object containing the (potentially) binary data of the attachment
* `size` (Expected for all three cases): Size in bytes of the attachment
* `name` (Expected only for the **File System Case**): Name of the file in the "drive"
* `path` (Expected only for the **File System Case**): Path of the file within the "drive" (includes filename)
* `directory` (Expected only for the **File System Case**): Path of the file within the "drive" (excludes filename)
* `type` (Optional for the **File System Case**, Expected for the **File System Case** and **File Generation Case**): Filename extension suffix (e.g. `.csv`, `.jpg`) of the file
* `modifyTime` (Expected for **File System Case**, optional for **Binary Field Case**): Time when the file was created
* `attachmentCreationTime` (Expected for all three cases): Time when the attachment was created
* `attachmentExpiryTime` (Expected for all three cases): Time when the attachment will be deleted
* `contentType` (Expected for only the **Binary Field Case** and **File Generation Case**): [Value that would normally appear in a `Content-Type` HTTP header field (e.g. `application/xml`, `image/jpeg`)](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types)


### Attachment Examples
#### Binary Field Case
For a contact photo
```json
{
  "contact": {
    "firstName": "Fred",
    "lastName": "Smith",
    "profilePhoto": {
      "attachmentUrl": "http://steward-service.platform.svc.cluster.local:8200/files/8a10d010-10f8-4d1d-88ff-7458f66d574d",
      "size": 126976,
      "modifyTime": "2021-05-01T12:00:00.000Z",
      "attachmentCreationTime": "2021-05-25T12:00:00.000Z",
      "attachmentExpiryTime": "2021-05-27T12:00:00.000Z",
      "contentType": "image/jpeg"
    },
    ...
  }
}
```

#### File System Case
```json
{
  "attachmentUrl": "http://steward-service.platform.svc.cluster.local:8200/files/8a10d010-10f8-4d1d-88ff-7458f66d574d",
  "size": 126976,
  "name": "profilePhoto.jpg",
  "path": "/home/someuser/Documents/profilePhoto.jpg",
  "directory":  "/home/someuser/Documents",
  "type": ".jpg",
  "modifyTime": "2021-05-01T12:00:00.000Z",
  "attachmentCreationTime": "2021-05-25T12:00:00.000Z",
  "attachmentExpiryTime": "2021-05-27T12:00:00.000Z"
}
```

#### File Generation Case
```json
{
  "attachmentUrl": "http://steward-service.platform.svc.cluster.local:8200/files/8a10d010-10f8-4d1d-88ff-7458f66d574d",
  "size": 126976,
  "type": ".xml",
  "attachmentCreationTime": "2021-05-25T12:00:00.000Z",
  "attachmentExpiryTime": "2021-05-27T12:00:00.000Z",
  "contentType": "application/xml"
}
```
