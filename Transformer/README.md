# Transformer

A transformer is responsible to semantically transform an incoming JSON object into another JSON object.

## Transformer Concept
As already mentioned the transformer transforms one JSON object into another. Prior to this transformation a semantic mapping has to take place where the entities of the source model are mapped against the entities of the Open Integration Hub master data model.

A transformer expects a JSON object which represents the application's proprietary data model as an input. It is possible to automatically pull JSON schemas via the OIH API which represent the structure of the Open Integration Hub master data model. Afterwards it transforms the incoming JSON object into another JSON object (via a transformation language. We suggest [JSONata](http://jsonata.org/) for the transformation) which represents the structure of the Open Integration Hub master data model. The transformer's output is then send to the Open Integration Hub and is validated against a deposited JSON schema.

## Transformation Language
A transformation language is needed to transform one object into another. For the semantic transformation that is performed by the transformer, we suggest JSONata as it is built to transform one JSON object into another.

**JSONata:**
- Is a Lightweight query and transformation language for JSON data
- Helps to extract specific meaningful data from JSON data using a simple logic
- Supports more than 20 operators
- Includes numerous functions such as string- and numeric-functions

For further information of JSONata please visit the [official JSONata documentation](http://jsonata.org/).

## Transformer Evolution
Sometimes there is a need to change the existing data model to adjust to different requirements. In this case, a transformer needs to be adjusted/updated in order to be compatible with the newest version of the data model (Backward compatibility is supported, therefore an existing transformer can still be used with previous versions of the model).

If a new version of a model is created, two options exist:
1. The existing transformer is adjusted/updated according to the structure of the new data model.
2. A completely new transformer is built.

The following illustrations shows how a transformer works and which adjustments have to be made if a change in a data model occurs:

![TransformerEvolution](Assets/TransformerEvolution.svg)
