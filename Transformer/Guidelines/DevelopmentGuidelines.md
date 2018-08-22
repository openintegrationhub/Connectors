# Guide for creating a Transformer

This guide helps to develop a **Transformer** for your particular application. It describes the process and the structure of development.  

## Table of Contents
[Getting started](#getting-started)  
[Entry point](#entry-point)  
[Actions](#actions)  
[Expressions](#expressions)    
[JSONata](#jsonata)  
[Authentication](#authentication)  

## Getting started

As a first step we recommend to clone [jsonata-transform-component](https://github.com/elasticio/jsonata-transform-component) from [elasticio](https://github.com/elasticio) GitHub page. Then you can use it as a base for a further development.  

## Entry point

Entry point of component is `component.json` file. This file acts as a descriptor which is interpreted by the platform to gather all the required information. Here is the only place to list the functionality provided by the component, the so called `triggers` and `actions`. For the **Transformer** you only need `actions`, because we execute the component after we already have called a `trigger` on the top of the flow or in the previous step. In our case we have two actions - `transformXToOih` and `transformXFromOih`.

## Actions

As mentioned earlier, we have two actions - `transformXToOih` and `transformXFromOih`. Both are called from `component.json` when the user selects an action from UI. Each of these actions calls a certain expression depending on the direction of mapping. When we already have an expression we could call `transform()` function from `transform.js` file which does actually the mapping.


## Expressions

Expressions are the models which we use depending on the direction of mapping. We have used [JSONata](https://github.com/jsonata-js/jsonata) functions to determine and get the data which must match the model. For example, `XToOih.js` generates a valid person expression which is based on [OIH Data Model](https://github.com/openintegrationhub/Data-and-Domain-Models/blob/master/src/main/schema/addresses/personV2.json). In the other direction `XFromOih.js` generates a person which matches your application model.

## JSONata

The **Transformer** uses [JSONata](https://github.com/jsonata-js/jsonata) transformation language to transform the incoming JSON object into another JSON object. It uses a fact that [JSONata](https://github.com/jsonata-js/jsonata) expression is a superset of JSON document so that by default any valid JSON document is a valid [JSONata](https://github.com/jsonata-js/jsonata) expression.


## Authentication
This component requires no authentication.
