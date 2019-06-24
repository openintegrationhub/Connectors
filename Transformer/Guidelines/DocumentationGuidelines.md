# Transformer Description and Documentation Guidelines

In order to enhance understandability and to simplify reuse of a transformer the repository should fulfill the following documentation requirements:

(For an example see: [Salesforce Transformer](https://github.com/openintegrationhub/salesforce-transformer))

## README.md
- [ ] A short description of the application the transformer refers to
- [ ] Description of the adapter with which the transformer is interacting
- [ ] Version of the adapter the transformer refers to
- [ ] Type and version of the Open Integration Hub master data model the transformer refers to
- [ ] Description of domain objects the transformer is able to transform
- [ ] A list of all actions that are available
- [ ] A _how it works_ section that explains how the transformer acutally works including
  - [ ] A textual description
  - [ ] Code Snippets of exemplary JSONata expressions
  - [ ] Screenshots to enhance comprehensibility
- [ ] Version of the transformer (format: Version X.Y.Z)
- [ ] License

## Component.json
- [ ] Descriptive title of the transformer that follows the common format: _"{yourApplicationName-transformer}"_
- [ ] Short description of the transformer
- [ ] All Actions are completly described. This includes:
  - [ ] A title for each action
  - [ ] A short description for each action of what it does
  - [ ] Folder to the main source
  - [ ] Metadata object with an empty _out_ object

## Other Files
- License file
- Changelog file
