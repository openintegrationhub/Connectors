<p align="center">
  <img src="https://github.com/openintegrationhub/Connectors/blob/master/Assets/medium-oih-einzeilig-zentriert.jpg" alt="Sublime's custom image" width="400"/>
</p>

The revolution in data synchronization — the Open Integration Hub enables simple data synchronization between any software applications and thus accelerates digitalisation 

# Connector

## Table of Content

- [Introduction](#Introduction)
  - [Adapter](#adapter)
  - [Transformer](#transformer)

- [Content](#content)
  - [Folders](#folders)
  - [Documents](#documents)

- [Workgroup](#workgroup)
  - [Information](#information)
  - [Member](#member)
  
- [Wording](#wording)
- [Contribution](#contribution)
- [Contact](#contact)

## Introduction
A connector connects a software solution to the Open Integration Hub. It consists of two distinct parts, namely adapter and transformer. The purpose of a connector is to enable an application to interact with the Open Integration Hub. It contains different functionalities e.g. to fetch and transform data. These functionalities are further explained in the sections [adapter](#adapter) and [transformer](#transformer).

The following illustration provides a holistic overview of a connector:
![Connector](Assets/ConnectorsV2.svg)

#### Adapter
An adapter is a module for the syntactic connection of an external application and its data to the Open Integration Hub. This includes protocol translation, data format transformation, etc.
Furthermore it provides functionalities to perform e.g. CRUD operations within the source system.

For further information please read through the information within the [adapter folder](/Adapters).

#### Transformer
A transformer is responsible to semantically transform an incoming JSON object into another JSON object. Thus the mapping between two data models is done within the transformer.

For further information please read through the information within the [transformer folder](/Transformer).

## Content

#### Folders

- `Adapters`: Describes the adapters, their goals, standardized behavior and checklists for completing one adapter
- `ApplicationDocuments`: Contains all application documents needed to apply for the funding of the creation of a connector
- `Protocols`: Collection of all taken protocols
- `Transformer`: Includes the transformer concept, language, evolution and suggestions for their possible implementation

#### Documents

- `CONTRIBUTING`: Contains the contribution guideline



## Workgroup
#### Information
- Each workgroup has atleast one status call every two weeks
- Every committer must attend the status call
- The governance model defines the workgroup members' roles into managers, committers or contributors


#### Member
| Workgroup  | Member Name | Role |
| ------------- | ------------- | ------------- |
| Connectors  | Philipp (@philecs)  | **Manager**  |
|  | Robin (@RobinBrinkmann)  | Committer   |
|  | Jacob (@jhorbulyk) | Committer   |
|  | Renat (@zubairov) | Contributor   |

## Wording
Within the project different terms and abbreviations are frequently used. All terms and abbrevations are explained within the [glossary](https://github.com/openintegrationhub/Connectors/wiki/Glossary) and our [list of abbrevations](https://github.com/openintegrationhub/Connectors/wiki/Abbreviations).

## Contribution
Before you contribute please read through the [contribution guidelines](/CONTRIBUTING.md).


## Contact
For more information please visit our [official homepage](http://www.openintegrationhub.de/connect.html).

Please contact philipp.hoegner@cloudecosystem.org for additional information on connectors.
