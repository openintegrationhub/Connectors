# Transformer Description and Documentation Guidelines

In order to enhance understandability and to simplify reuse of a transformer the repository should fulfill the following transfomer repository requirements:

## README.md
- Description of the adapter from which the transformer is receiving its input
- Version of the adapter the transformer refers to
- A short description of the application the transformer refers to
- Version of the Open Integration Hub model the transformer refers to
- Description of the expected structure input object in the source model format (If no existing description is provided by within the application documentation)
  - Each attribute of each objects should be described with the following information: _Name of the attribute_, _type of the attribute_, _properties_ and a _short description_
- Version of the transformer

## Other Files
- License file
- Changelog file
