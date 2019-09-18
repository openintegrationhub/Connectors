<p align="center">
  <img src="https://github.com/openintegrationhub/Connectors/blob/master/Assets/medium-oih-einzeilig-zentriert.jpg" alt="Sublime's custom image" width="400"/>
</p>

The revolution in data synchronization — the Open Integration Hub enables simple data synchronization between any software applications and thus accelerates digitalisation

Visit the official [Open Integration Hub homepage](https://www.openintegrationhub.org/)

## Introduction

[![License](https://img.shields.io/badge/License-Apache%202.0-yellow.svg)](LICENSE)

<!-- TOC depthFrom:2 depthTo:6 withLinks:1 updateOnSave:1 orderedList:0 -->

- [Introduction](#introduction)
- [Open Source Connectors](#open-source-connectors)
- [Contribution](#contribution)
	- [Contribution Guidelines](#contribution-guidelines)
	- [Code of Conduct](#code-of-conduct)
- [Contact](#contact)
- [Content](#content)
	- [Folders](#folders)
	- [Documents](#documents)
- [Workgroup](#workgroup)
	- [Member](#member)
- [Wording](#wording)

<!-- /TOC -->

The Open Integration Hub enables data synchronization across a variety of applications. To enable interaction with any software an technical component is needed to the Open Integration Hub - the connector. It consists of two distinct parts: the adapter and the transformer.

An **adapter** is a module for the syntactic connection of an external application and its data to the Open Integration Hub. This includes protocol translation, data format transformation, etc.
Furthermore it provides functionalities to perform e.g. CRUD operations within the source system.

For further information please read through the information within the [adapter folder](/Adapters).

A **transformer** is responsible to semantically transform an incoming JSON object into another JSON object. Thus the mapping between two data models is done within the transformer.

For further information please read through the information within the [transformer folder](/Transformer).

The following illustration provides a holistic overview of a connector:
![Connector](Assets/ConnectorsV3.png)


## Open Source Connectors

Like the Open Integration Hub services, connectors are also standardized components that can be reused in any implementation of the framework. There are several contributors that provide a wide range of open source connectors already. So before you start your own, check out what's already there:

[Open Integration Hub](https://github.com/openintegrationhub)
[Flowground](https://github.com/flowground)
[elastic.io](https://github.com/elasticio)

If you want to build your own connector, we suggest you start with a our node.js example, to understand the structure and what you need to get going. Most components are build in node.js, although you can choose any language you want.

[node.js example](https://openintegrationhub.github.io//docs/Connectors/building-nodejs-component.html)

If you prefer a real world example, the wice components are good place to get inspiration.

[Wice Adapter](https://github.com/openintegrationhub/wicecrm-adapter)

[Wice Transformer](https://github.com/openintegrationhub/wicecrm-transformer)

## Contribution
### Contribution Guidelines
Before you contribute please read our [contribution guidelines](CONTRIBUTING.md).

### Code of Conduct

To see how members of the community are expected to behave, please read the [code of conduct](CODE_OF_CONDUCT.md). We apply the code of conduct defined by the Contributor Covenant, which is used across many open source projects, such as [NodeJS](https://github.com/nodejs/node), [Atom](https://github.com/atom/atom) and [Kubernetes](https://github.com/kubernetes/kubernetes).

## Contact
When looking for further information or support, please contact: philipp.hoegner@cloudecosystem.org.

## Content
### Folders

- [Adapters](Adapters): Describes the adapters, their goals, standardized behavior and checklists for building an adapter
- [Protocols](Protocols): Archive for all protocols by the workgroup
- [Transformer](Transformer): Includes the transformer concept, a basic introduction into the JSONata transformation language,  transformer evolution and suggestions for possible implementations

### Documents
- [CONTRIBUTING](CONTRIBUTING.md): Contains the contribution guideline for the Open Integration Hub project
- [CODE_OF_CONDUCT](CODE_OF_CONDUCT.md): Contains an explanation of the expected behavior of the community members, following  the code of conduct defined by the Contributor Covenant

## Workgroup

### Member
#### Connectors
|Member Name |GitHub Alias|Company| Role |
| --- | --- | --- | --- |
| Selim Achmerzaev |[sachmerz](https://github.com/sachmerz)|[Basaas](http://www.basaas.com/)| Committer  |
| Igor Drobiazko |[drobiazko](https://github.com/drobiazko)|[Elastic.io](http://www.elastic.io/)| Committer  |
| Franz  Degenhardt|[FranzDegenhardt](https://github.com/FranzDegenhardt)|[X-Integrate](https://x-integrate.com/x-integrate-startseite/)| Committer  |
| Hansjörg Schmidt  |[hschmidthh](https://github.com/hschmidthh)|[Wice](https://wice.de/)| Committer  |
| Philipp Hoegner|[philecs](https://github.com/philecs)|[Cloud Ecosystem](http://www.cloudecosystem.org/)| Committer  |

## Wording
Within the project different terms and abbreviations are frequently used. All terms and abbreviations are explained within the [glossary](https://github.com/openintegrationhub/Connectors/wiki/Glossary) and our [list of abbrevations](https://github.com/openintegrationhub/Connectors/wiki/Abbreviations).
