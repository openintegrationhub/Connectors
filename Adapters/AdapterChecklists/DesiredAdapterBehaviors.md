# Desired Adapter Behaviors
**Version Publish Date: 01.03.2018**

**Semantic Version of Document: 1.0.0**

See the section `Given an API how should an adapter behave?` in the document
[AdapterGuide](https://github.com/openintegrationhub/Connectors/blob/master/Adapters/AdapterGuide.md)
to see which questions must be asked and answered to find out which case your
adapter falls into. The following sections list each case and the expected
actions and triggers of the adapters.

All items in each list is a **should** have.

## Table of Contents

- [Case 1](#case-1)
  - [Triggers](#triggers)
  - [Actions](#actions)
- [Case 2](#case-2)
  - [Triggers](#triggers-1)
  - [Actions](#actions-1)
- [Case 3](#case-3)
  - [Triggers](#triggers-2)
  - [Actions](#actions-2)
- [Case 4](#case-4)
  - [Triggers](#triggers-3)
  - [Actions](#actions-3)
- [Case 5](#case-5)
  - [Triggers](#triggers-4)
  - [Actions](#actions-4)
- [Case 6](#case-6)
  - [Triggers](#triggers-5)
  - [Actions](#actions-5)

## Case 1:
- The list of business objects is dynamic
- The structure of the objects is dynamic (*Implied by above statement*)
- The API supports webhooks

### Triggers
- [ ] [getObjectsPolling](https://github.com/openintegrationhub/Connectors/blob/master/Adapters/AdapterBehaviorStandardization/StandardizedActionsAndTriggers.md#get-objects-polling) including functionality to
  - [ ] supply the list of readable objects
- [ ] [getObjectsWebhook](https://github.com/openintegrationhub/Connectors/blob/master/Adapters/AdapterBehaviorStandardization/StandardizedActionsAndTriggers.md#get-objects-webhook) including functionality to
  - [ ] supply the list of readable objects
  - [ ] supply the structure of the incoming objects
- [ ] [getDeletedObjectsWebhook](https://github.com/openintegrationhub/Connectors/blob/master/Adapters/AdapterBehaviorStandardization/StandardizedActionsAndTriggers.md#get-deleted-objects-webhook) including functionality to
  - [ ] supply the list of deletable objects

### Actions
- [ ] [upsertObject](https://github.com/openintegrationhub/Connectors/blob/master/Adapters/AdapterBehaviorStandardization/StandardizedActionsAndTriggers.md#upsert-object) including functionality to
  - [ ] supply the list of writable objects
  - [ ] supply the structure of the incoming object
- [ ] [deleteObject](https://github.com/openintegrationhub/Connectors/blob/master/Adapters/AdapterBehaviorStandardization/StandardizedActionsAndTriggers.md#delete-object) including functionality to
  - [ ] supply the list of deletable objects
- [ ] [lookupObjectByField](https://github.com/openintegrationhub/Connectors/blob/master/Adapters/AdapterBehaviorStandardization/StandardizedActionsAndTriggers.md#lookup-object-by-fields) including functionality to
  - [ ] supply the list of readable objects
  - [ ] supply the list of fields that can be searched

## Case 2:
- The list of business objects is dynamic
- The structure of the objects is dynamic (*Implied by above statement*)
- The API does not support webhooks

### Triggers
- [ ] [getObjectsPolling](https://github.com/openintegrationhub/Connectors/blob/master/Adapters/AdapterBehaviorStandardization/StandardizedActionsAndTriggers.md#get-objects-polling) including functionality to
  - [ ] supply the list of readable objects
- [ ] [getDeletedObjectsPolling](https://github.com/openintegrationhub/Connectors/blob/master/Adapters/AdapterBehaviorStandardization/StandardizedActionsAndTriggers.md#get-deleted-objects-polling) (if possible)
  - [ ] including functionality to supply the list of deletable objects

### Actions
- [ ] [upsertObject](https://github.com/openintegrationhub/Connectors/blob/master/Adapters/AdapterBehaviorStandardization/StandardizedActionsAndTriggers.md#upsert-object) including functionality to
  - [ ] supply the list of writable objects
  - [ ] supply the structure of the incoming object
- [ ] [deleteObject](https://github.com/openintegrationhub/Connectors/blob/master/Adapters/AdapterBehaviorStandardization/StandardizedActionsAndTriggers.md#delete-object) including functionality to
  - [ ] supply the list of deletable objects
- [ ] [lookupObjectByField](https://github.com/openintegrationhub/Connectors/blob/master/Adapters/AdapterBehaviorStandardization/StandardizedActionsAndTriggers.md#lookup-object-by-fields) including functionality to
  - [ ] supply the list of readable objects
  - [ ] supply the list of fields that can be searched

## Case 3:
- The list of business objects is static
- The structure of the objects is dynamic
- The API supports webhooks

### Triggers
- [ ] [getObjectsPolling](https://github.com/openintegrationhub/Connectors/blob/master/Adapters/AdapterBehaviorStandardization/StandardizedActionsAndTriggers.md#get-objects-polling) including
  - [ ] the static list of readable objects
- [ ] [getObjectsWebhook](https://github.com/openintegrationhub/Connectors/blob/master/Adapters/AdapterBehaviorStandardization/StandardizedActionsAndTriggers.md#get-objects-webhook) including
  - [ ] the static list of readable objects
  - [ ] functionality to supply the structure of the incoming objects
- [ ] [getDeletedObjectsWebhook](https://github.com/openintegrationhub/Connectors/blob/master/Adapters/AdapterBehaviorStandardization/StandardizedActionsAndTriggers.md#get-deleted-objects-webhook) including
  - [ ] the static list of deletable objects

### Actions
- [ ] [upsertObject](https://github.com/openintegrationhub/Connectors/blob/master/Adapters/AdapterBehaviorStandardization/StandardizedActionsAndTriggers.md#upsert-object) including
  - [ ] the static list of writable objects
  - [ ] functionality to supply the structure of the incoming object
- [ ] [deleteObject](https://github.com/openintegrationhub/Connectors/blob/master/Adapters/AdapterBehaviorStandardization/StandardizedActionsAndTriggers.md#delete-object) including
  - [ ] the static list of deletable objects
- [ ] [lookupObjectByField](https://github.com/openintegrationhub/Connectors/blob/master/Adapters/AdapterBehaviorStandardization/StandardizedActionsAndTriggers.md#lookup-object-by-fields) including functionality to
  - [ ] the static list of readable objects
  - [ ] supply the list of fields that can be searched

## Case 4:
- The list of business objects is static
- The structure of the objects is dynamic
- The API does not support webhooks

### Triggers
- [ ] [getObjectsPolling](https://github.com/openintegrationhub/Connectors/blob/master/Adapters/AdapterBehaviorStandardization/StandardizedActionsAndTriggers.md#get-objects-polling) including
  - [ ] the static list of readable objects
- [ ] [getDeletedObjectsPolling](https://github.com/openintegrationhub/Connectors/blob/master/Adapters/AdapterBehaviorStandardization/StandardizedActionsAndTriggers.md#get-deleted-objects-polling) (if possible)
  - [ ] including the static list of readable objects

### Actions
- [ ] [upsertObject](https://github.com/openintegrationhub/Connectors/blob/master/Adapters/AdapterBehaviorStandardization/StandardizedActionsAndTriggers.md#upsert-object) including
  - [ ] the static list of writable objects
  - [ ] functionality to supply the structure of the incoming object
- [ ] [deleteObject](https://github.com/openintegrationhub/Connectors/blob/master/Adapters/AdapterBehaviorStandardization/StandardizedActionsAndTriggers.md#delete-object) including
  - [ ] the static list of deletable objects
- [ ] [lookupObjectByField](https://github.com/openintegrationhub/Connectors/blob/master/Adapters/AdapterBehaviorStandardization/StandardizedActionsAndTriggers.md#lookup-object-by-fields) including functionality to
  - [ ] the static list of readable objects
  - [ ] supply the list of fields that can be searched

## Case 5:
- The list of business objects is static
- The structure of the objects is static
- The API supports webhooks

### Triggers
- [ ] [getObjectsPolling](https://github.com/openintegrationhub/Connectors/blob/master/Adapters/AdapterBehaviorStandardization/StandardizedActionsAndTriggers.md#get-objects-polling) including
  - [ ] the static list of readable objects
- [ ] [getObjectsWebhook](https://github.com/openintegrationhub/Connectors/blob/master/Adapters/AdapterBehaviorStandardization/StandardizedActionsAndTriggers.md#get-objects-webhook) including
  - [ ] the static list of readable objects
  - [ ] the static structure of the incoming objects
- [ ] [getDeletedObjectsWebhook](https://github.com/openintegrationhub/Connectors/blob/master/Adapters/AdapterBehaviorStandardization/StandardizedActionsAndTriggers.md#get-deleted-objects-webhook) including
  - [ ] the static list of deletable objects

### Actions
- [ ] [upsertObject](https://github.com/openintegrationhub/Connectors/blob/master/Adapters/AdapterBehaviorStandardization/StandardizedActionsAndTriggers.md#upsert-object) including
  - [ ] the static list of writable objects
  - [ ] the static structure of the incoming object
- [ ] [deleteObject](https://github.com/openintegrationhub/Connectors/blob/master/Adapters/AdapterBehaviorStandardization/StandardizedActionsAndTriggers.md#delete-object) including
  - [ ] the static list of deletable objects
- [ ] [lookupObjectByField](https://github.com/openintegrationhub/Connectors/blob/master/Adapters/AdapterBehaviorStandardization/StandardizedActionsAndTriggers.md#lookup-object-by-fields) including functionality to
  - [ ] the static list of readable objects
  - [ ] the static list of fields that can be searched

## Case 6:
- The list of business objects is static
- The structure of the objects is static
- The API does not support webhooks

### Triggers
- [ ] [getObjectsPolling](https://github.com/openintegrationhub/Connectors/blob/master/Adapters/AdapterBehaviorStandardization/StandardizedActionsAndTriggers.md#get-objects-polling) including
  - [ ] the static list of readable objects
- [ ] [getDeletedObjectsPolling](https://github.com/openintegrationhub/Connectors/blob/master/Adapters/AdapterBehaviorStandardization/StandardizedActionsAndTriggers.md#get-deleted-objects-polling) (if possible)
  - [ ] including the static list of readable objects

### Actions
- [ ] [upsertObject](https://github.com/openintegrationhub/Connectors/blob/master/Adapters/AdapterBehaviorStandardization/StandardizedActionsAndTriggers.md#upsert-object) including
  - [ ] the static list of writable objects
  - [ ] the static structure of the incoming object
- [ ] [deleteObject](https://github.com/openintegrationhub/Connectors/blob/master/Adapters/AdapterBehaviorStandardization/StandardizedActionsAndTriggers.md#delete-object) including
  - [ ] the static list of deletable objects
- [ ] [lookupObjectByField](https://github.com/openintegrationhub/Connectors/blob/master/Adapters/AdapterBehaviorStandardization/StandardizedActionsAndTriggers.md#lookup-object-by-fields) including functionality to
  - [ ] the static list of readable objects
  - [ ] the static list of fields that can be searched
