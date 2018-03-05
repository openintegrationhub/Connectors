<!-- TOC depthFrom:1 depthTo:6 withLinks:1 updateOnSave:1 orderedList:0 -->

- [Introduction](#introduction)
- [JSONata Overview](#jsonata-overview)
	- [Exemplary Functions](#exemplary-functions)
		- [String Functions](#string-functions)
		- [Numeric Functions](#numeric-functions)
		- [Array Functions](#array-functions)
- [Exemplary JSONata Transformation](#exemplary-jsonata-transformation)

<!-- /TOC -->
# Introduction
As described in [README.md](/REAMDE.md) a transformer semantically transforms one JSON object into another. For this purpose a programming language or a transformation language such as JSONata can be used. <br>

Short description of model transformation languages in general:

> A model transformation, which is essentially a program which operates on models, can be written in a general-purpose programming language, such as Java. However, special-purpose model transformation languages can offer advantages, such as syntax that makes it easy to refer to model elements.

_Source:_ [Wikipedia](https://en.wikipedia.org/wiki/Model_transformation_language)

Due to its focus on JSON objects and its simplicity, JSONata is the recommended transformation language for creating a transformer.

# JSONata Overview
- Is a Lightweight query and transformation language for JSON data
- Helps to extract specific meaningful data from JSON data using a simple logic
- Supports more than 20 operators
- Includes numerous functions such as string-, numeric-, array- and object-functions

In the following some exemplary functions as well as a general JSONata mapping example is provided.

For further information of JSONata please visit the [official JSONata documentation](http://docs.jsonata.org/), which also includes a listing of all supported functions. <br>
If you want to test JSONata check out the [JSONata Excerciser](http://try.jsonata.org/).

## Exemplary Functions
### String Functions
Find and replace of a pattern within a string and replace it with a certain value:
```
$replace(str, pattern, replacement [, limit])
```

_Example_:
```
$replace("Have a nice day", "day", "week") ==> "Have a nice week"
```

### Numeric Functions
Sum the values of an array:
```
$sum(array)
```

_Example:_
```
$sum([1,1,3,5]) ==> 10
```

### Array Functions
Concatenate the values of two array:
```
$append(array1, array2)`
```

_Example:_
```
$append(["This","is","a"], ["JSONata","example"]) ==> ["This", "is", "a", "JSONata", "example"]
```


# Exemplary JSONata Transformation
The following example aims to provide an overview of the simplicity of JSONata.<br>
For reasons of clarity and comprehensibility the exemplary JSON objects are simplified.

The JSON object that is used as input:

```
"alias": "mropen",
"email": "connected@openintegrationhub.org",
"salutation": "mr.",
"title": "Prof. Dr.",
"firstname": "Open",
"middlename": "Integration",
"lastname": "Hub",
"phone": [
  {
    "number": "0151123456"
  },
  {
    "number": "0177654321"
  }
],
"gender": "male",
"signupdate": "2017-07-01",
"description": "open source project",
"weight": "80,3",
"age": "30"

```
The following JSONata expression transforms the input into the needed JSON object
```
"alias": alias,
"fullname": title & ' ' & firstname & ' ' & middlename & ' ' & lastname,
"memberSince": signupdate,
"Surname": lastname,
"Name": firstname,
"Middlename": middlename,
"Academictitle": title,
"Phonenumbers": phone.number,
"description": $lowercase(description),
"weight": $number($replace(weight, "," , ".")),
"age": $number(age)
```
The following JSON object results from the transformation:
```
"alias": "mropen",
"fullname": "Prof. Dr. Open Integration Hub",
"memberSince": "2017-07-01",
"Surname": "Hub",
"Name": "Open",
"Middlename": "Integration",
"Academictitle": "Prof. Dr.",
"Phonenumbers": [
  "0151123456",
  "0177654321"
],
"description": "open source project",
"weight": 80.3,
"age": 30
```
