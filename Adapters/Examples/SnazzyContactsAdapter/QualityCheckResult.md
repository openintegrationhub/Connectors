# Quality Checks Results Template

This file presents the output from the quality check result of the SnazzyContacts Adapter.

# Table of Contents

- [Documentation](#documentation)
- [Coverage](#coverage)
- [Functionality](#functionality)

# Template

**Name of the adapter:** [SnazzyContacts Adapter](https://github.com/openintegrationhub/Connectors/tree/master/Adapters/Examples/SnazzyContactsAdapter) <br>
**Date of the quality check:** 2018-05-14 <br>
**Quality check performed by:** Philipp ([philecs](https://github.com/philecs))

## Documentation

The quality check for the documentation was performed on the basis of the [Adapter Description and Documentation Guidelines](https://github.com/openintegrationhub/Connectors/blob/master/Adapters/AdapterChecklists/AdapterDescriptionAndDocumentationChecklist.md)

| Priority  | Impacted File | Impacted Requirement  | What is missing / insufficient |
| ------------- | ------------- | ------------- | ------------- |
| Must Have  |[README.md](https://github.com/openintegrationhub/Connectors/blob/master/Adapters/Examples/SnazzyContactsAdapter/README.md)| _Description of the application adapter connects to_  | Short description of SnazzyContacts is missing |
| Should Have |[component.json](https://github.com/openintegrationhub/Connectors/blob/master/Adapters/Examples/SnazzyContactsAdapter/component.json)| Note and placeholder for triggers/actions  | No notes or placeholder defined for actions & triggers |
| Should Have |[README.md](https://github.com/openintegrationhub/Connectors/blob/master/Adapters/Examples/SnazzyContactsAdapter/README.md)|Copy of adapter functionality checklist  | Copy of adapter functionality checklist is missing (Seperate file) |
| Could Have |[README.md](https://github.com/openintegrationhub/Connectors/blob/master/Adapters/Examples/SnazzyContactsAdapter/README.md)| Version and Compatibility information  | Version and compatibility information missing (For further information see this [example](https://github.com/elasticio/sugarcrm-component#version-and-compatibility-information)) |
| Could Have |[README.md](https://github.com/openintegrationhub/Connectors/blob/master/Adapters/Examples/SnazzyContactsAdapter/README.md)| Documentation of authentication process  | No documentation where the API key can be found within the application |
| Could Have |[README.md](https://github.com/openintegrationhub/Connectors/blob/master/Adapters/Examples/SnazzyContactsAdapter/README.md)| Screenshot of the parameters for actions/triggers... | No screenshot with meaningful examples provided [example](https://github.com/elasticio/sugarcrm-component#fetching-new-and-updated-objects-from-sugarcrm)  |
| Could Have |[README.md](https://github.com/openintegrationhub/Connectors/blob/master/Adapters/Examples/SnazzyContactsAdapter/README.md)| Description of the parameters...  | Description of parameters is missing |
| Could Have |[README.md](https://github.com/openintegrationhub/Connectors/blob/master/Adapters/Examples/SnazzyContactsAdapter/README.md)| Sample of the minimum viable input [...] for each action/trigger  | Minimal viable input missing |
| Could Have |[README.md](https://github.com/openintegrationhub/Connectors/blob/master/Adapters/Examples/SnazzyContactsAdapter/README.md)| Known limitatins  | Known limitations missing |
| Could Have |[README.md](https://github.com/openintegrationhub/Connectors/blob/master/Adapters/Examples/SnazzyContactsAdapter/README.md)| License and copyright  | License and copyright missing |
| Could Have |[README.md](https://github.com/openintegrationhub/Connectors/blob/master/Adapters/Examples/SnazzyContactsAdapter/README.md)| Copy of checklist [...] of the documentation  | Copy of documentation checklist is missing (Seperate file) |
| Could Have |[Logo](https://github.com/openintegrationhub/Connectors/blob/master/Adapters/Examples/SnazzyContactsAdapter/logo.png)|Size| Wrong size. Resize to 128x128 |
| Could Have |License File|License File| License File missing |
| Could Have |Changelog File|Changelog File| Changelog File missing |


## Coverage

The quality checks for coverage and functionality were performed on the basis of the [Desired Adapter Behaviors](https://github.com/openintegrationhub/Connectors/blob/master/Adapters/AdapterChecklists/DesiredAdapterBehaviors.md)


**Number of fully covered objects:** 2/2

| Relating object | Type  |What is missing |
| ------------- | ------------- | ------------- |
| Organization | Get-Trigger | -  |
| Person | Get-Trigger | -  |  
| Organization | Create-Action | -  |
| Organization | Update-Action | -  |
| Organization | Delete-Action | -  |  
| Person | Create-Action | -  |
| Person | Update-Action | -  |
| Person | Delete-Action | -  |
| Person | LookupObjectByField-Action | Action missing |
| Organization | LookupObjectByField-Action | Action missing |
| All Objects | Get-Trigger | Trigger to get static list of readable/writeable objects missing |


## Functionality

| Relating object | Type  |What is missing / insufficient  |
| ------------- | ------------- | ------------- |
| Organization | Get-Trigger | Working  |
| Person | Get-Trigger | Working  |  
| Organization | Create-Action | Not tested yet  |
| Organization | Update-Action | Not tested yet  |
| Organization | Delete-Action | Not tested yet  |  
| Person | Create-Action | Working  |
| Person | Update-Action | Not tested yet |
| Person | Delete-Action | Not tested yet |
