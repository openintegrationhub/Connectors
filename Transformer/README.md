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
Sometimes there is a need to change the existing data model to adjust to different requirements. In this case, a transformer needs to be adjusted/updated in order to be compatible with the newest version of the data model. (Backward compatibility should be supported, therefore a transformer can still be used with previous versions of the model if).

Some changes do not affect existing mappings or transformations and transformers can still be used (although they are not representing the newest model version). Thus, backward compatibility is automatically given. According to the [OData specification](http://docs.oasis-open.org/odata/odata/v4.0/errata03/os/complete/part1-protocol/odata-v4.0-errata03-os-part1-protocol-complete.html#_Toc453752210)(shortened/modified list) the following changes do not require a change within a transformer:

- Adding an attribute that is nullable
- Adding a object to the model
- Adding a new complex type to the model
- Adding a new entity set
- Adding an enumeration
- Adding a new term

Apart from that various changes require transformer adjustements as they break existing mappings or transformations. Thus, backward compatibility is not given (if the Open Integration Hub operator does not run both model versions in parallel). In the following changes which require a transformer adjustment are listed:

- Renaming an existing attribute
- Changing the type of an existing attribute
- Deleting an existing attribute
- Renaming an existing object
- Deleting an existing object
- Adding an attribute that is not nullable

If a new version of a model is created, two options exist to create a transformer that is compatible with the newest model version:
1. The existing transformer is adjusted/updated according to the structure of the new data model.
2. A completely new transformer is built.

The following illustrations shows how a transformer works and which adjustments have to be made if a change in a data model occurs:

![TransformerEvolution](Assets/TransformerEvolution.svg)
