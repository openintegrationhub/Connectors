# Quality Checks Results Template

The purpose of this document is to unify the result format of the adapter quality checks. It provides a template to list all required properties which are currently missing, in order to build an adapter of high quality.
The following sections help to structure the results and divide the required properties in logical coherent topics.

In the first section the general template is provided. In the second section, an exemplary quality check on basis of the template is presented.

## Table of Contents

- [Template](#template)
	- [Documentation](#documentation)
	- [Coverage](#coverage)
	- [Functionality](#functionality)

**Name of the adapter:** _Adapter Name_ <br>
**Date of the quality check:** _YYYY-MM-DD_ <br>
**Quality check performed by:** _Name of the tester_

## General

- [ ] Is the code open sourced under **github.com/openintegrationhub**?

- [ ] Is the repository name correct (_applicationname-adapter/transformer_)?

- [ ] Interaction Adapter Transfomer (To test interplay between Adapter & Transformer):

|Relating Adapter Trigger/Action|Relating Transformer Method|Direction (To/From OIH)|Works (Y/N)?|What is not working?|
|---|---|---|---|---|
|_getOrdersPolling_|_transformOrderToOih_|_To Oih_|_yes_|_-_|
||||||
||||||
||||||

## Adapter

### Adapter - Documentation

#### Readme.md

##### Must Have

- [ ] Description of the application adapter connects to

- [ ] List of environment variables that need to be configured (e.g. OAuth ClientID/Secret)

##### Should Have

- [ ] Description of the incoming message and outgoing message for each action/trigger (e.g. Update Contact Action)

- [ ] Description of any attachments generated or consumed for each action/trigger

##### Could Have

- [ ] Version and compatibility information

- [ ] Documentation for the authentication process (How to find API key, etc.)

- [ ] Screen shot of the parameters for each action/trigger with sample meaningful values (if parameters are defined for given trigger/action)

- [ ] Description of the parameters (if any) for each action/trigger

- [ ] Sample of the minimum viable input (e.g. for updating or creating something) for each action/trigger

- [ ] Description of the dynamic metadata generation rules, metadata discovery rules for each action/trigger

- [ ] Known limitations, may be with link to the issue

- [ ] License and copyright

#### Component.json

- [ ] `component.json` should have a global `description` field filled.

- [ ] `component.json` should have a link to the documentation, e.g. `README` file below

- [ ] Each field except `password` should have a `placeholder` configured with a meaningful sample (unless it's obvious)

- [ ] Each trigger and action should have a `description` field configured explaining what given trigger/action does

- [ ] Each field in the trigger/action should have a `note` explaining what expected to be there as well as meaningful example in `placeholder` which could be (for optional fields) a default value if field is empty

#### Other Files

##### Must Have

- [ ] Logo - 128x128 PNG file with transparent background

- [ ] License file

##### Could Have

- [ ] Changelog

### Authentication

- [ ] Authentication works

In case authentication is not working, _what is not working_:

*___________

### Trigger

#### Trigger - Object Coverage

This table should include all obects that can possibly be covered. For each object with at least one relating trigger the value for coulumn **covered** must be **yes**.  

|Business Object|Covered|
|---|---|
|_Order_|_Yes_|
|_Item_|_No_|
|||
|||
|||

#### Trigger - Funcationality Coverage

All object that weren't covered at all (see previous section) shouldn't appear in the following table.

|Business Object|getObjectsPolling|getDeletedObjectsPolling|getObjectsWebhook|getDeletedObjectsWebhook|
|---|---|---|---|---|
|_Order_|_No_|_No (Not possible to implement)_|_Yes_|_No_|
||||||
||||||
||||||

#### Trigger - Working Functionalities

For each **yes** in the table from the section above there must be one line in the following table.

|Business Object|Trigger Type|Works (Yes/No)|What is not working|
|---|---|---|---|
|_Order_|_getOrdersWebhook_|_No_|_Order update in system does not activate the trigger_|
|||||
|||||
|||||

### Action

#### Action - Object Coverage

This table should include all obects that can possibly be covered. For each object with at least one relating action the value for coulumn **covered** must be **yes**. 

|Business Object|Covered|
|---|---|
|_Order_|_Yes_|
|_Item_|_No_|
|||
|||
|||

#### Action - Funcationality Coverage

All object that weren't covered at all (see previous section) shouldn't appear in the following table.

|Business Object|upsertObject|deleteObject|lookupObjectByField|
|---|---|---|---|
|_Order_|_Yes_|_No (Not possible to implement)_|_No Webhooks Supported_|
|||||
|||||
|||||

#### Action - Working Functionalities

For each **yes** in the table from the section above there must be one line in the following table.

|Business Object|Action Type|Works (Yes/No)|What is not working|
|---|---|---|---|
|_Order_|_upsertObject_|_No_|_Order with given was not updated in target system_|
|||||
|||||
|||||

## Transformer

### Transformer - Documentation

#### Readme.md

##### Must Have

- [ ] A short description of the application the transformer refers to

- [ ] Description of the adapter with which the transformer is interacting

- [ ] Type and version of the Open Integration Hub master data model the transformer refers to

##### Should Have

- [ ] Description of domain objects the transformer is able to transform

- [ ] A list of all actions that are available

##### Could Have

- [ ] Version of the adapter the transformer refers to

- [ ] A how it works section that explains how the transformer acutally works including

  - [ ] A textual description

  - [ ] Code Snippets of exemplary JSONata expressions

  - [ ] Screenshots to enhance comprehensibility

- [ ] Version of the transformer (format: Version X.Y.Z)

- [ ] License

#### Component.json

##### Must Have

- [ ] Descriptive title of the transformer that follows the common format: "{yourApplicationName-transformer}"

- [ ] Short description of the transformer

- [ ] All Actions are completly described. This includes:

  - [ ] A title for each action

  - [ ] A short description for each action of what it does

  - [ ] Folder to the main source

  - [ ] Metadata object

- [ ] with an empty out object

- [ ] without an in object

#### Other Files

##### Must Have

- [ ] License file

##### Could Have

- [ ] Changelog

### Transform Methods

#### Transform Methods - Object Coverage

This table should include all obects that can possibly be covered. For each object with at least one relating transforming method the value for coulumn **covered** must be **yes**.

|Business Object|Covered|
|---|---|
|_Order_|_Yes_|
|_Item_|_No_|
|_Contact_|_Yes_|
|||
|||
|||

#### Transform Methods - Functionality Coverage

All object that weren't covered at all (see previous section) shouldn't appear in the following table.

|Business Object|TransformObjectToOih|TransformObjectFromOih|
|---|---|---|
|_Order_|_Yes_|_Yes_|
|_Contact_|_Yes_|_No_|
||||
||||
|||||

#### Transform Methods - Working Functionalities

For each **yes** in the table from the section above there must be one line in the following table.

|Business Object|Transformation Direction|Works (Yes / No) |What is not working|
|---|---|---|---|
|_Order_|_ToOih_|_Yes_|_-_|
|_Contact_|_FromOih_|_Yes_|_-_|
|||||
|||||
|||||

#### Transform Methods- Split / Aggregation

This section should include information about possible (missing) split & aggregate funcationalities. _Example:_ In some cases an object in the source systems must be split into multiple objects to match the OIH structure. If only one object is transferred, some information are lost. The following example data supports this scenario:

**Example Contact Object** in source system:

- Order information
- Customer information relating to order
- Products included by the order

This object should be split into 3 objects when transferring it via oih:

- order
- person
- product(s)
