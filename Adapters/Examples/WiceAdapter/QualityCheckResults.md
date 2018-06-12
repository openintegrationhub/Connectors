# WICE Quality Checks Results

**Name of the adapter:** WICE

**Date of the quality check:** 2018-06-11 <br>

**Quality check performed by:** Jacob

## Documentation

The quality check for the documentation was performed on the basis of the [Adapter Description and Documentation Guidelines](https://github.com/openintegrationhub/Connectors/blob/master/Adapters/AdapterChecklists/AdapterDescriptionAndDocumentationChecklist.md)

| Priority    | Impacted File  | Impacted Requirement                                                             | What is missing / insufficient                                                                                                                     |
|:------------|:---------------|:---------------------------------------------------------------------------------|:---------------------------------------------------------------------------------------------------------------------------------------------------|
| Must Have   | README.md      | Actions & Triggers                                                               | Get Organizations is duplicated                                                                                                                    |
| Must Have   | README.md      | List of environment variables that need to be configured                         | Information is missing                                                                                                                             |
| Should Have | README.md      | Description of the incoming message and outgoing message for each action/trigger | Statements with regards to output from action aren't meaningful                                                                                    |
| Should Have | Component.json |                                                                                  | `Mandant` should be translated to English                                                                                                          |
| Should Have | Component.json |                                                                                  | Password should use the password view                                                                                                              |
| Should Have  | Component.json |                                                                                  | Action names `getXPolling` shouldn't have polling in the name.  Furthermore, the description should more clearly state that they are lookup object by ID actions |
| Could Have  | README.md      |                                                                                  | Section `Component tree structure` doesn't provide much value.                                                                                     |
| Could Have            | logo.png               |   128x128 PNG file with transparent background
                                                                                |  File should be 128x128 not 57x57                                                                                                                                                  |



## Coverage

The quality checks for coverage and functionality were performed on the basis of the [Desired Adapter Behaviors](https://github.com/openintegrationhub/Connectors/blob/master/Adapters/AdapterChecklists/DesiredAdapterBehaviors.md)

**Number of fully covered objects:** 3/3

Coverage seems complete given API functionality

## Functionality

| Relating object | Type               | What is missing / insufficient                                                                                                                                                                                                                                                       |
|:----------------|:-------------------|:-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| N/A             | Verify Credentials | Credentials should be verified against the server                                                                                                                                                                                                                                    |
| All             | Polling Triggers    | The actions as implemented aren't polling triggers (in the sense that they don't poll for changes). They are Bulk Extract Triggers and should be re-labled.  The deletion variant then becomes redundant.  In any case, triggers should emit objects indivdually and not as a batch. |
| All                | Create and Update Actions                   | Should be combined into a smart action `upsertX` where the logic to determine the create vs update endpoint is determined in code                                                                                                                                                                                                                                                                                     |



