# Adapter Functionality Checklist
**Version Publish Date: 01.03.2018**

**Semantic Version of Document: 1.0.0**

The goal of this document is to provide a menu of functionality that could exist
in a connector.  Can be provided to a non-CSP MSE (CSP consumer) requesting the
construction of a connector.

# Instructions
1. Provide a copy of this form to the customer.
2. Have the customer complete this form.
3. Prepare the the `AdapterFunctionalityChecklist.md` for the system.
4. Ensure that for all boxes checked yes on this form, that the system's API
supports the required functionality.  If not, inform the customer that their
order can not be completed.
5. Identify which actions and triggers need to be built to support all the cases
checked yes by the customer.

# Questions
## Bulk Extract
1. Do you wish to extract all (or a significant portion) of the information
stored inside this system (with the intent of loading it into another system)?
*(Select One)*
   - [ ] Yes *(proceed to question 2)*
   - [ ] No *(proceed to next section)*

2. If the answer to question 1. is `Yes`, which types of objects do you want to
extract? *(Select One)*
  - [ ] All types of objects
  - [ ] Only certain types of objects *(List types of objects here)*:
  `__________________________________`

3. For a given object type, do you want to extract all objects of that type or
only objects that match a set of criteria? *(Select One)*
  - [ ] All objects
  - [ ] Only objects meeting some criteria *(Describe criteria)*:
  `__________________________________`


## Detect Data/Object Changes
1. Do you wish to be able to trigger a flow when data is added to or changed within the system? *(Select One)*
   - [ ] Yes *(proceed to question 2)*
   - [ ] No *(proceed to next section)*

2. If the answer to question 1. is `Yes`, which types of objects do you want to
detect changes for? *(Select One)*
  - [ ] All types of objects
  - [ ] Only certain types of objects *(List types of objects here)*:
  `__________________________________`

3. For a given object type, do you want to detect changes for all objects of
that type or only objects that match a set of criteria? *(Select One)*
  - [ ] All objects
  - [ ] Only objects meeting some criteria *(Describe criteria)*:
  `__________________________________`

4. Do you wish to detect object deletion? *(Select One)*

  - [ ] Yes
  - [ ] No

5. Do you wish to detect object merges?  *(Select One)*

   *(Example: Duplicate Contact Merge)*

  - [ ] Yes
  - [ ] No

6. Do you need to observe changes in many-to-many relationships? *(Select One)*
  - [ ] Yes
  - [ ] No

7. How do you prefer to detect these changes? *(Select One)*
   - [ ] By polling
   - [ ] Through a webhook
   - [ ] Both mechanisms are preferred (webhook is default mechanism but polling
   mechanism is required to recover from webhook downtime)

## System Specific Event Observation
1. Do you wish to be able to trigger a flow when events or modifications happen
within the system which are distinct from *CRUD* operations? *(Select One)*

   *(Examples: an email tracking program detects that an email has been opened,
   some async operation has been completed)*

   - [ ] Yes  *(List specific events)*: `________________________`  *(proceed to question 2)*
   - [ ] No *(proceed to next section)*

2. For a given event type, do you want to detect events or only events that
match a set of criteria? *(Select One)*
  - [ ] All events
  - [ ] Only events meeting some criteria *(Describe criteria)*:
  `__________________________________`


## Lookup Information in the System
1. Assuming that the system supports a query language, would you like to be able
to construct queries in that language to be executed? *(Select One)*
   - [ ] Yes
   - [ ] No/The system does not support such a language

2. Do you need to lookup a record in the system based on some criteria which
uniquely identifies at most one record? *(Select One)*
   - [ ] Yes *(proceed to question 3)*
   - [ ] No *(proceed to question 4)*

3. Are the uniqueness constraints mentioned in question 2. identifiable from the
metadata provided by the system? *(Select One)*
   - [ ] Yes
   - [ ] I don't know
   - [ ] No

4. Do you need to query for sets of records matching some criteria? *(Select
One)*
   - [ ] Yes *(List search criteria which will be used)*: `________________________`
   - [ ] No

## Modify Records in the System
1. Do you wish to be able to create and/or update objects in the system?
*(Select One)*
   - [ ] Yes *(proceed to question 2)*
   - [ ] No *(proceed to next section)*

2. Do you wish to be able to delete objects in the system? *(Select One)*
   - [ ] Yes
   - [ ] No

3. Are there links between objects within your system that you would like to
modify? *(Select One)*
   - [ ] Yes *(proceed to question 4)*
   - [ ] No *(proceed to question 6)*

4. Would you like to be able to delete links within your system? *(Select One)*
   - [ ] Yes
   - [ ] No

5. Assuming a parent/child relationship between objects in the system, would you
like to create children at the time the parent is created? *(Select One)*
   - [ ] Yes
   - [ ] No/I don't have parent/child relationships between objects

6. Which types of objects do you want to modify? *(Select One)*
     - [ ] All types of objects
     - [ ] Only certain types of objects *(List types of objects here)*:
     `__________________________________`

7. Is there any data related to an object that is not part of that object which
you wish to set?  *(Select One)*

    *(Example: Set Inventory Level for Product)*

    - [ ] Yes *(List types of data here)*: `__________________________________`
    - [ ] No

8. Do you wish to merge objects in your system? *(Select One)*

   *(Example: Duplicate Contact Merge)*

  - [ ] Yes
  - [ ] No

## Perform a System Action/Invoke a System Function
1. Assuming that the system supports a data modification language, would you
like to be able to construct queries in that language to be executed? *(Select
One)*
   - [ ] Yes
   - [ ] No/The system does not support such a language

2. Do you wish to be able to trigger events (which may or may not result in
side-effects outside the system)? *(Select One)*
   - [ ] Yes  *(List specific events)*: `________________________`
   - [ ] No

3. Do you wish to be able to modify data in the system in a way which is
distinct from CRUD operations? *(Select One)*
   - [ ] Yes  *(Describe modifications)*: `________________________`
   - [ ] No

4. Do you wish to be able to invoke calculations exposed by the system? *(Select
One)*
   - [ ] Yes  *(Describe calculations)*: `________________________`
   - [ ] No

## Expose Endpoint(s)
1. Are there any endpoints in the API which you wish to invoke directly?
*(Select One)*
   - [ ] Yes  *(List specific endpoints)*: `________________________`
   - [ ] No

2. Do you wish to be able to construct generic requests against the API?
*(Select One)*
   - [ ] Yes
   - [ ] No
