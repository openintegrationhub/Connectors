# elasticio-snazzycontacts-component
> [Snazzy Contacts](https://snazzycontacts.com) Node.js component for [elastic.io platform](http://www.elastic.io "elastic.io platform")

This is a connector(*component*) which connects [Snazzy Contacts](https://snazzycontacts.com) with [elastic.io platform](http://www.elastic.io "elastic.io platform"). With this connector you are able to create different flows on [elastic.io](http://www.elastic.io "elastic.io platform"). The component supports **"Triggers"** (e.g. ``getPersons``, ``getOrganizations``) as well as **"Actions"** (e.g. ``updatePerson``, ``createOrganization``, ``updatePersonsOrganization``, etc.), therefore with this component you could both read and fetch data from [Snazzy Contacts](https://snazzycontacts.com) and write and save data in [Snazzy Contacts](https://snazzycontacts.com) via [elastic.io platform](http://www.elastic.io "elastic.io platform").

## Before you begin

Before you can use the component you **must be a registered snazzy contacts user**. Please visit the home page of [https://snazzycontacts.com](https://snazzycontacts.com) to sign up.
> Any attempt to reach [Snazzy Contacts](https://snazzycontacts.com) endpoints without registration will not be successful

After you are already registered in [Snazzy Contacts](https://snazzycontacts.com) you have to activate your **API Key** (in [Snazzy Contacts](https://snazzycontacts.com) named *Data Sharing Key*).
> For activation you **have to be logged in**, then click of ``Administration`` and under ```Einstellungen``` click of ``Unternehmensdaten``. Once you are in ``Unternehmensdaten`` click of the button ``Data Sharing aktivieren`` for generating your API key.

Once the activation is done you have an access to **API Key** which is required for an authentication when you make a request to Snazzy Contacts.

## Actions and triggers
The connector supports the following **actions** and **triggers**:
#### Triggers:
  - Get persons (```getPersonsPolling.js```)
  - Get organizations (```getOrganizationsPolling.js```)

#### Actions:
  - Create person (```createPerson.js```)
  - Create organization(```createOrganization.js```)
  - Delete person (```deletePerson.js```)
  - Delete organization (```deleteOrganization.js```)
  - Update person (```updatePerson.js```)
  - Update person's organizations (```updatePersonsOrganization.js```)
  - Update organization (```updateOrganization.js```)

> **NOTE:** As mentioned before, to perform an action or a call trigger you have to be a registered [Snazzy Contacts](https://snazzycontacts.com) user and you have to pass your **API Key** (in [Snazzy Contacts](https://snazzycontacts.com) named *Data Sharing Key*) when you send a request.

In each trigger or action, before sending a request we create a session in [Snazzy Contacts](https://snazzycontacts.com) via calling a function ```createSession()``` from ```snazzy.js``` file, which is located in directory **actions**. This function creates a session and as a second parameter accepts a callback function ```continueOnSuccess()``` which calls the certain trigger or the action.

##### Get persons

Get persons trigger (```getPersonsPolling.js```) performs a request which fetch all persons saved by a user in [Snazzy Contacts](https://snazzycontacts.com). The response consist of an **array of objects** with all persons and their attributes.

##### Get organizations

Get organizations trigger (```getOrganizationsPolling.js```) performs a request which fetch all organizations saved by a user in [Snazzy Contacts](https://snazzycontacts.com). The response consist of an **array of objects** with all organizations and their attributes.

##### Create person

Create person action (``createPerson.js``) creates a person in [Snazzy Contacts](https://snazzycontacts.com). At this point of time the function accepts as required parameters ``name`` and ``firstname``, but of course you can also pass other parameters like ``email``, ``phone``, ``salutation``, ``title``, etc.

##### Create organization

Create organization action (``createOrganization.js``) creates a new organization in [Snazzy Contacts](https://snazzycontacts.com). This function accepts as required parameter only ``name``, but if you wish you can also pass ``town``, ``street``, ``street_number``, ``zip_code``, ``country``etc.

##### Delete person

Delete person action (``deletePerson.js``) deletes a person in [Snazzy Contacts](https://snazzycontacts.com). The required parameter which must be passed is ``rowid`` of the person which you want to delete.

>**NOTE**: We do ***NOT*** really delete the person from our database, we just set a value in field ``is_deleted`` to ``1`` which actually ***hides*** the person from the view.

##### Delete organization

Delete organization action (``deleteOrganization.js``) deletes an organization in [Snazzy Contacts](https://snazzycontacts.com). The required parameter which must be passed is ``rowid`` of the organization which you want to delete.

>**NOTE**: We do ***NOT*** really delete the organization from our database, we just set a value in field ``is_deleted`` to ``1`` which actually ***hides*** the organization from the view.

##### Update person

Update person action (``updatePerson.js``) updates a specific person in [Snazzy Contacts](https://snazzycontacts.com). The function accepts as required parameter ``rowid`` of the person and respectively the values of the properties which you want to update.

##### Update person's organizations
Update person's organizations action (```updatePersonsOrganization.js```) assign one person to one or more organizations. This means that one person could be  assigned to as many organizations as you want. The function accepts as required parameters ``same_contactperson``, ``for_rowid``, ````name```` und ``firstname``.

###### Rrequired parametes:
  - ``same_contactperson`` - that is an ``id`` which is generated when the person was created
  - ``for_rowid`` - that is the ``rowid`` of the organization to which you want to assign the current person
  - ``name`` - you need to pass the same ``name`` as the initial one  
  - ``firstname`` - you need to pass the same ``firstname`` as the initial one

>**IMPORTANT**:  With this action we actually create a duplicate of the person which has the same ``same_contactperson``, that's why you have to pass the same ``name`` and ``firstname`` to prevent misconception

##### Update organization

Update organization action (``updateOrganization.js``) updates a specific organization in [Snazzy Contacts](https://snazzycontacts.com). The function accepts as required parameter ``rowid`` of the organization  and respectively the values of the properties which you want to update.

***

### Component tree structure

    |-- .gitignore
    |-- README.md
    |-- component.json
    |-- logo.png
    |-- package-lock.json
    |-- package.json
    |-- verifyCredentials.js
    |-- lib
        |-- actions
        |   |-- createOrganization.js
        |   |-- createPerson.js
        |   |-- deleteOrganization.js
        |   |-- deletePerson.js
        |   |-- snazzy.js
        |   |-- updateOrganization.js
        |   |-- updatePerson.js
        |   |-- updatePersonsOrganization.js
        |-- schemas
        |   |-- createOrganization.in.json
        |   |-- createOrganization.out.json
        |   |-- createPerson.in.json
        |   |-- createPerson.out.json
        |   |-- deleteOrganization.in.json
        |   |-- deleteOrganization.out.json
        |   |-- deletePerson.in.json
        |   |-- deletePerson.out.json
        |   |-- getOrganizations.out.json
        |   |-- getPersons.in.json
        |   |-- getPersons.out.json
        |   |-- updateOrganization.in.json
        |   |-- updateOrganization.out.json
        |   |-- updatePerson.in.json
        |   |-- updatePerson.out.json
        |   |-- updatePersonsOrganization.in.json
        |   |-- updatePersonsOrganization.out.json
        |-- triggers
            |-- getOrganizationsPolling.js
            |-- getPersonsPolling.js
