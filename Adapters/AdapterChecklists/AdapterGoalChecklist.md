# Adapter Goal Checklist

**Version Publish Date:** 01.03.2018

**Semantic Version of Document:** 1.0.0

The goal of this document is to provide a menu of functionality that could exist
in a connector.

# Instructions

1. Provide a copy of this form to the customer.
2. Have the customer complete this form.
3. Prepare the the `AdapterFunctionalityChecklist.md` for the system.
4. Ensure that for all boxes checked yes on this form, that the system's API
   supports the required functionality. If not, inform the customer that their
   order can not be completed.
5. Identify which actions and triggers need to be built to support all the cases
   checked yes by the customer.

# Questions

## Bulk Extract

1. Do you wish to extract all (or a significant portion) of the information stored inside this system (with the intent of loading it into another system)? _(Select One)_

   - [ ] Yes _(proceed to question 2)_
   - [ ] No _(proceed to next section)_

2. If the answer to question 1. is `Yes`, which types of objects do you want to extract? _(Select One)_

- [ ] All types of objects
- [ ] Only certain types of objects _(List types of objects here)_:
      `__________________________________`

3. For a given object type, do you want to extract all objects of that type or only objects that match a set of criteria? _(Select One)_

- [ ] All objects
- [ ] Only objects meeting some criteria _(Describe criteria)_:
      `__________________________________`

## Detect Data/Object Changes

1. Do you wish to be able to trigger a flow when data is added to or changed within the system? _(Select One)_

   - [ ] Yes _(proceed to question 2)_
   - [ ] No _(proceed to next section)_

2. If the answer to question 1. is `Yes`, which types of objects do you want to detect changes for? _(Select One)_

- [ ] All types of objects
- [ ] Only certain types of objects _(List types of objects here)_:
      `__________________________________`

3. For a given object type, do you want to detect changes for all objects of that type or only objects that match a set of criteria? _(Select One)_

- [ ] All objects
- [ ] Only objects meeting some criteria _(Describe criteria)_:
      `__________________________________`

4. Do you wish to detect object deletion? _(Select One)_

- [ ] Yes
- [ ] No

5. Do you wish to detect object merges? _(Select One)_

   _(Example: Duplicate Contact Merge)_

- [ ] Yes
- [ ] No

6. Do you need to observe changes in many-to-many relationships? _(Select One)_

- [ ] Yes
- [ ] No

7. How do you prefer to detect these changes? _(Select One)_

   - [ ] By polling
   - [ ] Through a webhook
   - [ ] Both mechanisms are preferred (webhook is default mechanism but polling
         mechanism is required to recover from webhook downtime)

## System Specific Event Observation

1. Do you wish to be able to trigger a flow when events or modifications happen within the system which are distinct from _CRUD_ operations? _(Select One)_

   _(Examples: an email tracking program detects that an email has been opened,
   some async operation has been completed)_

   - [ ] Yes _(List specific events)_: `________________________` _(proceed to question 2)_
   - [ ] No _(proceed to next section)_

2. For a given event type, do you want to detect events or only events that match a set of criteria? _(Select One)_

- [ ] All events
- [ ] Only events meeting some criteria _(Describe criteria)_:
      `__________________________________`

## Lookup Information in the System

1. Assuming that the system supports a query language, would you like to be able to construct queries in that language to be executed? _(Select One)_

   - [ ] Yes
   - [ ] No/The system does not support such a language

2. Do you need to lookup a record in the system based on some criteria which uniquely identifies at most one record? _(Select One)_

   - [ ] Yes _(proceed to question 3)_
   - [ ] No _(proceed to question 4)_

3. Are the uniqueness constraints mentioned in question 2. identifiable from the metadata provided by the system? _(Select One)_

   - [ ] Yes
   - [ ] I don't know
   - [ ] No

4. Do you need to query for sets of records matching some criteria? _(Select One)_

   - [ ] Yes _(List search criteria which will be used)_: `________________________`
   - [ ] No

## Modify Records in the System

1. Do you wish to be able to create and/or update objects in the system? _(Select One)_

   - [ ] Yes _(proceed to question 2)_
   - [ ] No _(proceed to next section)_

2. Do you wish to be able to delete objects in the system? _(Select One)_

   - [ ] Yes
   - [ ] No

3. Are there links between objects within your system that you would like to modify? _(Select One)_

   - [ ] Yes _(proceed to question 4)_
   - [ ] No _(proceed to question 6)_

4. Would you like to be able to delete links within your system? _(Select One)_

   - [ ] Yes
   - [ ] No

5. Assuming a parent/child relationship between objects in the system, would you like to create children at the time the parent is created? _(Select One)_

   - [ ] Yes
   - [ ] No/I don't have parent/child relationships between objects

6. Which types of objects do you want to modify? _(Select One)_

   - [ ] All types of objects
   - [ ] Only certain types of objects _(List types of objects here)_:
         `__________________________________`

7. Is there any data related to an object that is not part of that object which you wish to set? _(Select One)_

   _(Example: Set Inventory Level for Product)_

   - [ ] Yes _(List types of data here)_: `__________________________________`
   - [ ] No

8. Do you wish to merge objects in your system? _(Select One)_

   _(Example: Duplicate Contact Merge)_

   - [ ] Yes
   - [ ] No

## Perform a System Action/Invoke a System Function

1. Assuming that the system supports a data modification language, would you like to be able to construct queries in that language to be executed? _(SelectOne)_

   - [ ] Yes
   - [ ] No/The system does not support such a language

2. Do you wish to be able to trigger events (which may or may not result in side-effects outside the system)? _(Select One)_

   - [ ] Yes _(List specific events)_: `________________________`
   - [ ] No

3. Do you wish to be able to modify data in the system in a way which is distinct from CRUD operations? _(Select One)_

   - [ ] Yes _(Describe modifications)_: `________________________`
   - [ ] No

4. Do you wish to be able to invoke calculations exposed by the system? _(Select One)_

   - [ ] Yes _(Describe calculations)_: `________________________`
   - [ ] No

## Expose Endpoint(s)

1. Are there any endpoints in the API which you wish to invoke directly? _(Select One)_

   - [ ] Yes _(List specific endpoints)_: `________________________`
   - [ ] No

2. Do you wish to be able to construct generic requests against the API? _(Select One)_

   - [ ] Yes
   - [ ] No
