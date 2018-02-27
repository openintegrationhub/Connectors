As described in [README.md](/REAMDE.md) a transformer semantically transforms one JSON object into another. For this purpose a transformation language such as JSONata can be used. <br>
In the following some general information about JSONata as well as a general example are presented.

<!-- TOC depthFrom:1 depthTo:6 withLinks:1 updateOnSave:1 orderedList:0 -->

- [JSONata Overview](#jsonata-overview)
	- [Exemplary Functions](#exemplary-functions)
		- [String Functions](#string-functions)
		- [Numeric Functions](#numeric-functions)
		- [Array Functions](#array-functions)
- [Exemplary JSONata Transformation](#exemplary-jsonata-transformation)

<!-- /TOC -->

# JSONata Overview
- Is a Lightweight query and transformation language for JSON data
- Helps to extract specific meaningful data from JSON data using a simple logic
- Supports more than 20 operators
- Includes numerous functions such as string-, numeric-, array- and object-functions

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

For further information of JSONata please visit the [official JSONata documentation](http://jsonata.org/).
