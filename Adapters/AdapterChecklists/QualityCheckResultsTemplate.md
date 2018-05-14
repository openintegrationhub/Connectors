# Quality Checks Results Template

The purpose of this document is to unify the result format of the adapter quality checks. It provides a template to list all required properties which are currently missing, in order to build an adapter of high quality.
The following sections help to structure the results and divide the required properties in logical coherent topics.

In the first section the general template is provided. In the second section, an exemplary quality check on basis of the template is presented.


# Table of Contents

- [Template](#template)
	- [Documentation](#documentation)
	- [Coverage](#coverage)
	- [Functionality](#functionality)
- [Example](#example)
	- [Documentation](#documentation-1)
	- [Coverage](#coverage-1)
	- [Functionality](#functionality-1)


# Template

**Name of the adapter:** _Adapter Name_ <br>
**Date of the quality check:** _YYYY-MM-DD_ <br>
**Quality check performed by:** _Name of the tester_

## Documentation

The quality check for the documentation was performed on the basis of the [Adapter Description and Documentation Guidelines](https://github.com/openintegrationhub/Connectors/blob/master/Adapters/AdapterChecklists/AdapterDescriptionAndDocumentationChecklist.md)

| Priority  | Impacted File | Impacted Requirement  | What is missing / insufficient |
| ------------- | ------------- | ------------- | ------------- |
|  | |   |  |
|  ||   |  |
|  | |  |  |



## Coverage

The quality checks for coverage and functionality were performed on the basis of the [Desired Adapter Behaviors](https://github.com/openintegrationhub/Connectors/blob/master/Adapters/AdapterChecklists/DesiredAdapterBehaviors.md)


**Number of fully covered objects:** _E.g. 9/10_

| Relating object | Type  |What is missing |
| ------------- | ------------- | ------------- |
|  |  |   |
|  |  |   |  
|  |  |   |  

## Functionality

| Relating object | Type  |What is missing / insufficient  |
| ------------- | ------------- | ------------- |
|  |  |   |  
|  |  |   |  
|  |  |   |  

# Example

**Name of the adapter:** SilverERP Adapter <br>
**Date of the quality check:** 2018-01-24 <br>
**Quality check performed by:** Philipp

## Documentation

The quality check for the documentation was performed on the basis of the [Adapter Description and Documentation Guidelines](https://github.com/openintegrationhub/Connectors/blob/master/Adapters/AdapterChecklists/AdapterDescriptionAndDocumentationChecklist.md)

| Priority  | Impacted File | Impacted Requirement  | What is missing / insufficient |
| ------------- | ------------- | ------------- | ------------- |
| Must Have  | README.md | Description of the application adapter conntects to  | Description is missing |
| Could Have | README.md | Version and compatibility information  | Information about version is missing  |
| Should Have  | Component.json | Global description field  | Global description field is missing |
| Could Have  | Logo | 128x128 PNG file with transparent background   | Wrong size: 66x66 |

## Coverage

The quality checks for coverage and functionality were performed on the basis of the [Desired Adapter Behaviors](https://github.com/openintegrationhub/Connectors/blob/master/Adapters/AdapterChecklists/DesiredAdapterBehaviors.md)

**Number of fully covered objects:** 9/10

| Relating object  | Type |What is missing  |
| ------------- | ------------- | ------------- |
| Products  | Trigger | getObjectsPolling  |
| Products |Action  |  upsertObject |

## Functionality

| Relating object  | Type |What is missing / insufficient  |
| ------------- | ------------- | ------------- |
| Person | Trigger | getDeletedObjectsWebhook is not working properly.  No notification sent about deletion of a data record  |
| Person | Action |deleteObject is not working properly.  Data record wasn't deleted in the target system  |
