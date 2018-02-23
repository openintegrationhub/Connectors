# Adapter Functionality Checklist
**Version Publish Date: 26.02.2018**

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
1. Do you wish to extract all (or a significant portion) of the information stored inside this system (with the intent of loading it into another system)? *(Select One)*
   - [ ] Yes *(proceed to question 2)*
   - [ ] No *(proceed to next section)*

2. If the answer to question 1. is `Yes`, which types of objects do you want to extract? *(Select One)*
  - [ ] All types of objects
  - [ ] Only certain types of objects *(List types of objects here)*: `__________________________________`

3. For a given object type, do you want to extract all objects of that type or only objects that match a set of criteria? *(Select One)*
  - [ ] All objects
  - [ ] Only objects meeting some criteria *(Describe criteria)*: `__________________________________`


## Detect Data/Object Changes
1. Do you wish to be able to trigger a flow when data is added to or changed within the system? *(Select One)*
   - [ ] Yes *(proceed to question 2)*
   - [ ] No *(proceed to next section)*

2. If the answer to question 1. is `Yes`, which types of objects do you want to detect changes for? *(Select One)*
  - [ ] All types of objects
  - [ ] Only certain types of objects *(List types of objects here)*: `__________________________________`

3. For a given object type, do you want to detect changes for all objects of that type or only objects that match a set of criteria? *(Select One)*
  - [ ] All objects
  - [ ] Only objects meeting some criteria *(Describe criteria)*: `__________________________________`

4. Do you wish to detect object deletion? *(Select One)*

  - [ ] Yes
  - [ ] No

5. Do you wish to detect object merges?  *(Select One)*

   *(Example: Contact Merge)*

  - [ ] Yes
  - [ ] No


## System Specific Event Observation
1. Do you wish to be able to trigger a flow when events or modifications happen within the system which are distinct from *CRUD* operations? *(Select One)*

   *(Examples: an email tracking program detects that an email has been opened, some async operation has been completed)*

   - [ ] Yes  *(List specific events)*: `________________________`
   - [ ] No






