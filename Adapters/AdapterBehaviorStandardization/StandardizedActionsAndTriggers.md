# Descriptions of standardized actions or triggers

**Version Publish Date:** 10.12.2018

**Semantic Version of Document:** 2.0.2

## Table of Contents

- [Actions](#actions)
  - [Upsert Object](#upsert-object)
  - [Lookup Object (at most 1)](#lookup-object-at-most-1)
  - [Lookup Objects (Plural)](#lookup-objects-plural)
  - [Delete Object](#delete-object)
  - [Update Object](#update-object)
  - [Create Object](#create-object)
  - [Linking/Unlinking Objects](#linkingunlinking-objects)
  - [Execute Query or Statement in Query Language](#execute-query-or-statement-in-query-language)
  - [Perform Action/Evaluate Function](#perform-actionevaluate-function)
- [Triggers](#triggers)
  - [Get New and Updated Objects Polling](#get-new-and-updated-objects-polling)
  - [Webhooks](#webhooks)
  - [Bulk Extract](#bulk-extract)

It is important to define common rules on how an adapter responds to changes
and performs actions on generic domain objects.  If adapters follow
common behaviors, then it is possible to build integrations by combining
adapters which are developed by different developers.

## Actions

### Upsert Object

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
      // If criteira is th the object's ID and it is split across more than one field, we should check 
      // that either all ID fields are populated or that none are.  Otherwise we
      // should throw an exception.
    
      const objectsToUpdate = GetObjectsByCritieria(uniqueCriteria);   // Usually GET verb
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

#### Iteration 1: Lookup Object By ID

##### Config Fields

- Object Type (dropdown)
- Allow ID to be omitted (dropdown/checkbox: yes/no)
- Allow zero results (dropdown/checkbox: yes/no)

##### Input Metadata

- One input per field in the ID.  Depending on the value of allowIdToBeOmited this is optional or required.

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
        const foundObject = GetObjectById(id);   // Usually GET verb
        emitData(foundObject);    
      } catch (NotFoundException e) {
        if(allowZeroResults) {
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

##### Not defined now

- How to handle populating linked objects.

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
      
      const foundObjects = GetObjectsByCritieria(uniqueCriteria);   // Usually GET verb
      if(foundObjects.length == 0) {
        if(allowZeroResults) {
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

##### Config Fields

- Object Type (dropdown)
- Behavior (dropdown: Fetch all, Fetch Page, Emit Individually)
- Number of search terms (text field: integer >= 1) (iteration 2)

##### Input Metadata

- Page size: optional positive integer that defaults to 100 (only if fetch page mode)
- page number: required non-negative integer that is 0 based (only if fetch page mode)
- order: optional array of fieldname + sort direction pairs (only if fetch page mode)
- max result size: optional positive integer that defaults to 1000 (only if fetch all mode)
- For each search term:
  - fieldName
  - fieldValue
  - condition (equal, not equal, >=, <=, >, <, like (if supported), possibly more in the future)
- For each search term - 1: (iteration 2)
  - criteriaLink (and/or)

##### Pseudo-Code

    function lookupObjects(criteria) {
      switch(mode) {
        case 'fetchAll':
          const results = GetObjectsByCritieria(criteria);
          if(results.length >= maxResultSize) {
            throw new Error('Too many results');
          }
          emitData({results: results});
          break;
        case 'emitIndividually':
          const results = GetObjectsByCritieria(criteria);
          results.forEach(result => {
            emitData(result);
          }
          break;
        case 'fetchPage': 
          const results = GetObjectsByCritieria(criteria, top: pageSize, skip: pageSize * pageNumber, orderBy: orderByTerms);
          emitData({results: results});
          break;
      }
    }

##### Output Data

- An object, with  key `results` that has an array as its value.

##### Gotcha’s to lookout for

- Make sure to Url Encode field values appearing in HTTP urls

##### Not Handled

- Order of operations in multiple terms
- How to get total number of matching objects

### Delete Object

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

### Update Object

- Similar to upsert object (both iteration 1 & 2) but:
  - We will not create the object if it does not exist
  - The ID/other unique criteria is required
  - No other fields are required

### Create Object

Similar to upsert object but needed for the following cases:

- Objects that can be created but can not be updated after creation (e.g. Invoices)
- Cases where you want to create an object and its children
- Cases where the id of the object includes information in the object (e.g. The ID of a sales line is the sales order ID + SKU).

### Linking/Unlinking Objects

- Given a many-to-many relationship in a system: create/update/remove a relationship between two objects.
- In order to do this, the inbound metadata needs to include:
  - the types of the two objects
  - two sets of unique criteria which describe the two objects
  - Information about the relationship (e.g. if assigning user to company membership, identify the role of the user)

    ```
    function linkObjects(obj1, obj2, linkMetadata) {
      const matchingObjects1 = lookupObjectByCriteria(obj1.type, obj1.uniqueCriteria);
      if (matchingObjects1.length != 1) {
        throw new Error('Not found/too many found.');
      }
      const object1Id = matchingObjects1[0].id;

      const matchingObjects2 = lookupObjectByCriteria(obj2.type, obj2.uniqueCriteria);
      if (matchingObjects2.length != 1) {
        throw new Error('Not found/too many found.');
      }
      const object2Id = matchingObjects2[0].id;

      createLink(object1Id, object2Id, linkMetadata);
    }
    ```

### Execute Query or Statement in Query Language

*This action has not been fully standardized.*

Examples of this include constructing a query in SQL, Salesforce’s SOQL, etc.

### Perform Action/Evaluate Function

*This action has not been fully standardized.*

Examples of this include sendEmail, calculatePrice, etc.

## Triggers

### Get New and Updated Objects Polling

##### Config Fields

- Object Type (dropdown)
- Start Time (string, optional): Indicates the begining time to start polling from (defaults to the begining of time)
- End Time (string, optional): If provided, don’t fetch records modified after this time (defaults to never)
- Size of Polling Page (optional; positive integer) Indicates the size of pages to be fetched. Defaults to 1000.
- Single Page per Interval (dropdown/checkbox: yes/no; default yes) Indicates that if the number of changed records exceeds the maximum number of results in a page, instead of fetching the next page immediately, wait until the next flow start to fetch the next page.

##### Input Metadata

N/A

##### Pseudo-Code

    function getObjectsPolling(cfg, snapshot) {
      const previousLastModified = snapshot.previousLastModified || cfg.startTime || new Date(0);
      const maxTime = cfg.endTime || Date.MaxDate();
      let hasMorePages = true;
      snapshot.pageNumber = snapshot.pageNumber || 0;
      let lastSeenTime = previousLastModified;
      do {
        let whereCondition;
        if (previousLastModified === cfg.startTime || new Date(0)){
          whereCondition = [
            lastModified >= previousLastModified,
            lastModified <= maxTime
          ];
        } else {
          whereCondition = [
            lastModified > previousLastModified,
            lastModified <= maxTime
          ];
        }
          
        const pageOfResults = GetPageOfResults({
          orderBy: Time ascending
          where: whereCondition,
          top: sizeOfPollingPage,
          skip: snapshot.pageNumber * sizeOfPollingPage
        });
        pageOfResults.forEach(result => {
          emitData(result);
        };
        snapshot.pageNumber++;
        hasMorePages = pageOfResults.length == pageSize;
        if(pageOfResults.length > 0) {
          lastSeenTime = pageOfResults[pageOfResults.length - 1].lastModified;
        }
        emitSnapshot(snapshot);
        if(singlePagePerInterval && hasMorePages) {
          return;
        }          
      } while (hasMorePages)
      delete snapshot.pageNumber;
      snapshot.previousLastModified = lastSeenTime;
      emitSnapshot(snapshot);
    }

##### Output Data

- Each object emitted individually.

##### Gotcha’s to lookout for

- If `previousLastModified` is set to `lastSeenTime` and we have `lastModified >= previousLastModified` then each execution will include records from previous execution.  But if at the first execution `previousLastModified` could be equal `cfg.startTime` and we have `lastModified > previousLastModified` then we will lose objects whose last modified date is equal to the `cfg.startTime`.  This is why we compare `previousLastModified` and `cfg.startTime || new Date(0)` and if they are equal, use condition `lastModified >= previousLastModified,` else: `lastModified > previousLastModified,`
- We use `lastModified <= maxTime` as it is more understandable for user.
- We have `Single Page per Interval` default to yes because it is slightly safer.
- TODO

### Webhooks

*This action has not been fully standardized.*

Receives data pushed to the iPaas from an external system.

### Bulk Extract

Useful for:

- Systems that do no track last_modified
- Systems that don’t support filtering by timestamp range
- Systems which have dedicated bulk export functionality
