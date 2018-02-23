# Adapter Description and Documentation Guidelines
**Version Publish Date: 05.02.2018**

**Semantic Version of Document: 1.0.0**

## Table of Contents

- [Must Have](#must-have)
  - [README.md](#readmemd)
- [Should Have](#should-have)
  - [README.md](#readmemd-1)
  - [component.json](#componentjson)
- [Could Have](#could-have)
  - [README.md](#readmemd-2)
  - [Other Files](#other-files)


Adapter Repository Requirements:

# Must Have
## README.md
- [ ] Description of the application adapter connects to
- [ ] List of environment variables that need to be configured (e.g. OAuth ClientID/Secret)

# Should Have
## README.md
- [ ] Description of the incoming message and outgoing message for each action/trigger (e.g. Update Contact Action)
    - [ ] Description of any attachments generated or consumed for each action/trigger

## Component.json
See the [AdapterJsonSchema](https://github.com/openintegrationhub/Connectors/blob/master/Adapters/AdapterJsonSchema.json) for a template to create the `component.json` file.

- [ ] `component.json` should have a global `description` field filled.
- [ ] `component.json` should have a link to the documentation, e.g. `README` file below
- [ ] Each field in credentials should have a `note` on it explaining what exactly is required here (unless it's obvious, e.g. password)
- [ ] Each field except `password` should have a `placeholder` configured with a meaningful sample (unless it's obvious)
- [ ] Each trigger and action should have a `description` field configured explaining what given trigger/action does
- [ ] Each field in the trigger/action should have a `note` explaining what expected to be there as well as meaningful example
 in `placeholder` which could be (for optional fields) a default value if field is empty

# Could Have
## README.md
- [ ] Version and compatibility information
- [ ] Documentation for the authentication process (How to find API key, etc.)
- [ ] Screen shot of the parameters for each action/trigger with sample meaningful values (if parameters are defined for given trigger/action)
- [ ] Description of the parameters (if any) for each action/trigger
- [ ] Sample of the minimum viable input (e.g. for updating or creating something) for each action/trigger
- [ ] Description of the dynamic metadata generation rules, metadata discovery rules for each action/trigger
- [ ] Known limitations, may be with link to the issue
- [ ] Contribution guidelines (they should be standardized)
- [ ] License and copyright

## Other Files
- [ ] Logo - 128x128 PNG file with transparent background
- [ ] License file
- [ ] Changelog
