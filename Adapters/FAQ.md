# FAQ

## In this section you will find the problems which we faced during the component's development

#### 1. Why does the component save only the first object from the incoming array of objects?
Imagine that we have the following scenario, which should get all persons from [Snazzy Contacts](https://snazzycontacts.com) and then transfer them in [Wice CRM](https://wice.de/). The flow should looks like this:

[Snazzy Contacts Component](https://snazzycontacts.com) :arrow_right: [Splitter Component](https://github.com/elasticio/splitter-component) :arrow_right: [Wice Component](https://wice.de/)

First we choose the *trigger* **Get persons** from [Snazzy Contacts Component](https://snazzycontacts.com). After the first step is successfully executed, it returns an array of objects which is actually the input for the second step, in this case [Splitter Component](https://github.com/elasticio/splitter-component). The  [Splitter Component](https://github.com/elasticio/splitter-component) splits the incoming message using splitting expression and after that [Wice Component](https://wice.de/) is called with the *action* **"Create person"**.

**Expected behavior:** all persons from [Snazzy Contacts](https://snazzycontacts.com) saved in [Wice CRM](https://wice.de/)   

**Actual behavior:** only the first person from  [Snazzy Contacts](https://snazzycontacts.com) is saved in [Wice CRM](https://wice.de/)

**Solution:** the component should be structured as a chain from functions which should be called in a proper order depending on the desired outcome. This means that after executing your functions, the [elastic.io events](https://support.elastic.io/support/solutions/folders/14000113713) ``emitData``, ``emitError`` and ``emitEnd`` must be called too. These events are used to return the results of the component execution. :tada:

---

#### 2. Why does the flow execution take more than 3 minutes?
 Regarding [elastic.io](https://www.elastic.io/) ***"The Task will run every 3 minutes"*** but unfortunately in our case it ran every 20 minutes.

 **Expected behavior:** the flow should run every 3 minutes  
 **Actual behavior:**  the flow runs every 20 minutes  
 **Solution:** after executing the functions, we have to call the [elastic.io event](https://support.elastic.io/support/solutions/articles/14000059642-emitend-event) ```emitEnd()``` which announces the end of a program, so the next stage can begin. :tada:

---

#### 3. Why do we need [Splitter Component](https://github.com/elasticio/splitter-component) for incoming/outgoing data?  

Let's say that we want to fetch all contacts from [Snazzy Contacts](https://snazzycontacts.com) and save them in a database. The flow should look similar to this one:

[Snazzy Contacts Component](https://snazzycontacts.com) :arrow_right: [Splitter Component](https://github.com/elasticio/splitter-component) :arrow_right: Database Component

 As a result from calling the *trigger* **Get Persons** we receive an array of objects with this simple incoming message body:

```json
"persons": [
   {
      "rowid": "198562",
      "tenant": "617",
      "name": "Doe",
      "firstname": "John",
      "salutation": "Mr.",
      "date_of_birth": "04.11.1980"
   },
   {
      "rowid": "198563",
      "tenant": "617",
      "name": "Smith",
      "firstname": "Jesica",
      "salutation": "Mrs.",
      "date_of_birth": "23.10.1987"
   }
]
```
The splitting expression in this case is "persons". As the output of the component we will have these two objects, which later on will be sent to Database component.

```json
{
   "rowid": "198562",
   "tenant": "617",
   "name": "Doe",
   "firstname": "John",
   "salutation": "Mr.",
   "date_of_birth": "04.11.1980"
},
{
   "rowid": "198563",
   "tenant": "617",
   "name": "Smith",
   "firstname": "Jesica",
   "salutation": "Mrs.",
   "date_of_birth": "23.10.1987"
}
```
If the incoming message body is an array of objects and we want to save the objects in the Database, we should send every single object to it. In this case we need to use [Splitter Component](https://github.com/elasticio/splitter-component), which splits the array and does the work for us. :tada:

---

#### 4. Why does the error ```Component container failed to start``` occur and what does it mean?

While executing your flow you could see this error. In the logs you could find the following output:
```
[INFO  tini (1)] Spawned child process '/runner/init' with pid '6'
[INFO  tini (1)] Main child exited with signal (with signal 'Killed')
```
That means that the component is running out of memory. The problem mostly occurs when you deal with a big amount of data. In this case you should increase the memory of the component.

**Solution:**
To increase the memory you must have an access to your component repository on [elastic.io](https://www.elastic.io/) platform.   
1. Navigate to the repository page and click on the link situated under ***Environment variables***
2. You will be redirected to another page where you will be able to set ***Environment variables***
3. Click on ***"+Create a new variable"*** and give the name **"EIO_REQUIRED_RAM_MB"** and value **512** and save it. This is the memory of the component.
4. The next time when you deploy the component into the container(during next execution) it should reserve 512MB runtime memory. :tada:
