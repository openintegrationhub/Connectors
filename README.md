# Table of Contents
<!-- TOC depthFrom:1 depthTo:6 withLinks:1 updateOnSave:1 orderedList:0 -->

- [Connectors](#connectors)
	- [Adapter](#adapter)
	- [Transformer](#transformer)
- [General Workgroup Information](#general-workgroup-information)
	- [Workgroup Member](#workgroup-member)
- [Wording](#wording)
- [Contribution](#contribution)
- [Contact](#contact)

<!-- /TOC -->

# Connectors
A connector connects a software solution to the Open Integration Hub. It consists of two distinct parts, namely adapter and transformer. The purpose of a connector is to enable an application to interact with the Open Integration Hub. It contains different functionalities e.g. to fetch and transform data. These functionalities are furhter explained in the sections [adapter](#adapter) and [transformer](#transformer).

The following illustration provides a holistic overview of a connector:
![Connector](Assets/ConnectorsV2.svg)

## Adapter
An adapter is a module for the syntactic connection of an external application and its data to the Open Integration Hub. This includes protocol translation, data format transformation, etc.
Furthermore it provides functionalities to perform e.g. CRUD operations within the source system.

For further information please read through the information within the [adapter folder](/Adapters).

## Transformer
A transformer is responsible to semantically transform an incoming JSON object into another JSON object. Thus the mapping between two data models is done within the transformer.

For further information please read through the information within the [transformer folder](/Transformer).

## Workgroup Member

Additional information on the different roles can be found within the [contribution guidelines](/CONTRIBUTING.md).

| Workgroup  | Member Name | Role |
| ------------- | ------------- | ------------- |
| Connectors  | Philipp (@philecs)  | **Manager**  |
|  | Robin (@RobinBrinkmann)  | Committer   |
|  | Jacob (@jhorbulyk) | Committer   |
|  | Renat (@zubairov) | Contributor   |

# Wording
Within the project different terms and abbreviations are frequently used. All terms and abbrevations are explained within the [glossary](https://github.com/openintegrationhub/Connectors/wiki/Glossary) and our [list of abbrevations](https://github.com/openintegrationhub/Connectors/wiki/Abbreviations).

# Contribution
Before you contribute please read through the [contribution guidelines](/CONTRIBUTING.md).


# Contact
For more information please visit our [official homepage](http://www.openintegrationhub.de/connect.html).

Please contact philipp.hoegner@cloudecosystem.org for additional information on connectors.
