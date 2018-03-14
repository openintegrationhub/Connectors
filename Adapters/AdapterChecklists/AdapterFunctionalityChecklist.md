# Adapter Functionality Checklist
**Version Publish Date: 01.03.2018**

**Semantic Version of Document: 1.0.0**

The goal of this document is to track connector completeness based on the
functionality provided by the API or  to formalize estimates for a non-CSP MSE
(CSP consumer) requesting the construction of a connector.

# Instructions
1. Copy this document from the OIH repository and place it in the repository for
the adapter.
2. Identify what can be built:
   * Of the following possible Actions and Triggers listed, strike through all
actions and triggers which can not be built for a system based on API
limitations of that system.
   * Enter system specific functionality that can be exposed by the adapter.
   * Identify static object types (if object types are static).
   * Identify endpoints which may be sensibly exposed by the adapter.
3. As actions and triggers are built, check of those items on this checklist.

## Checklist
- [ ] Bulk Extract

  - [ ] All Objects Programmatically Detectable Covered
  - [ ] Objects Explicitly Covered: `_________________`

  List of Server-side Filters Supported: `_________________`

- [ ] Get Objects Polling

  - [ ] All Objects Programmatically Detectable Covered
  - [ ] Objects Explicitly Covered: `_________________`

  List of Polling Filters Supported: `_________________`

  List of Server-side Hydration Supported: `_________________`


- [ ] Get Objects Webhook

  - [ ] All Objects Programmatically Detectable Covered
  - [ ] Objects Explicitly Covered: `_________________`

  List of Server-side Filters Supported: `_________________`

  List of Server-side Hydration Supported: `_________________`

- [ ] Get Deleted Objects Polling

  - [ ] All Events Programmatically Detectable Covered
  - [ ] Events Explicitly Covered: `_________________`

- [ ] Get Deleted Objects Webhook

  - [ ] All Events Programmatically Detectable Covered
  - [ ] Events Explicitly Covered: `_________________`

- [ ] Get Events Polling

  - [ ] All Events Programmatically Detectable Covered
  - [ ] Events Explicitly Covered: `_________________`

  List of Polling Filters Supported: `_________________`


- [ ] Get Events Webhook

  - [ ] All Events Programmatically Detectable Covered
  - [ ] Events Explicitly Covered: `_________________`

  List of Server-side Filters Supported: `_________________`


- [ ] Lookup Object by Field(s)

  - [ ] All Events Programmatically Detectable Covered
  - [ ] Events Explicitly Covered: `_________________`

  - [ ] All Fields Programmatically Detectable Covered
  - [ ] Fields Explicitly Covered: `_________________`

- [ ] Lookup Objects By Criteria

  - [ ] All Events Programmatically Detectable Covered
  - [ ] Events Explicitly Covered: `_________________`

  - [ ] All Criteria Programmatically Detectable Covered
  - [ ] Criteria Explicitly Covered: `_________________`

- [ ] Execute System Specific Query/Modification Language Operation
- [ ] Upsert Object

  - [ ] All Objects Programmatically Detectable Covered
  - [ ] Objects Explicitly Covered: `_________________`

- [ ] Deep Create Object

  - [ ] All Objects Programmatically Detectable Covered
  - [ ] Objects Explicitly Covered: `_________________`

- [ ] Delete Object

  - [ ] All Objects Programmatically Detectable Covered
  - [ ] Objects Explicitly Covered: `_________________`

- [ ] Upsert Link
- [ ] Delete Link
- [ ] Set Data For Object

    List all types of settable data:  `_________________`

- [ ] Perform Action/Evaluate Function

  - [ ] All Actions/Functions Programmatically Detectable Covered
  - [ ] Actions/Functions Explicitly Covered: `_________________`

- [ ] Exposed Endpoints

   List all exposed endpoints: `_________________`

- [ ] Generic Request
- [ ] Other Functionality

   List all other functionality: `_________________`