# How does an application communicate with an adapter?

# Moving Data In and Out of Systems

In order for data to move between systems at some point, the data will at some point go from being inside the system to not inside the system (or vice versa).  There are multiple mechanics that can make a read/write/change operation occur.  The selection of an implementation mechanic is, in general, independent of the business requirements driving the integration.  Ultimately, the selected mechanic must have the following properties:

- It must be sufficiently performant
- There must be a commitment from the software vendor that as updates to the software are made, this mechanism will continue to exist
- It must be allowed (in the sense that the security department is not opposed to the permissions granted to that mechanism)
- It must be capable of reading/modifying the data in the was as required by the business rules
- It must not break the system

The following sections describe the different technical sub-decisions that need to be made.  Note that these technical decisions are not necessarily governed or otherwise affected by being cloud based systems vs on premise systems vs hybrid systems.


## Mechanisms to Detect Data Changes
When synchronising large amounts of data and/or working with dynamically changed data it’s highly valuable to only synchronize the data that was actually changed, and not re-sync all data records every time. This causes that detection of data that was changed is a crucial property of the systems. This section describes the different strategies to do that detection.

### Polling by timestamp
For this strategy to work, the system that stores data stores and maintains a last modified date along that describes when a given record or entity has last been modified (including creation and possibly deletion).  In this strategy, there is some job somewhere that wakes up on a scheduled interval and looks for all records/entities that have been updated since the job was last run and reports those records as changed.  In order for this strategy to work, the job that wakes up must either be able to store when it was last run or otherwise reliably learn when it was last run.

#### Pros

- Wide support for this strategy
- Has built in failure tolerance as queries can be repeated

#### Cons

- Not universally supported
- Delay between modification occurring and change detection
- Not as resource efficient as many checks for changes will be empty if the dataset does not change often

### Data push from place of change
In this strategy, as the system that stores data can push modifications made to data to other systems as the modifications occur.  For example, it could publish a REST/SOAP message over HTTP(S), send an email or publish some message to a service bus.

#### Pros

- Fast change detection
- Efficient use of resources

#### Cons

- Not universally supported
- Need to worry about how to recover from failures in the push infrastructure as lost publishes can’t be repeated

### Bulk Extract with Delta Detection
This strategy is the last resort strategy when the above two strategies can not be applied.  In this strategy, in addition to all data records being stored inside the system, there exists a hashed copy of all records along with their IDs outside the system.  At a regular interval, a scheduled job will

1. Wake up
2. Read all records
3. Compute the hash of all records
4. Compare the value of the hash of a record with the stored hash for the corresponding record
5. Report the record as changed if the hashes do not match and store the new hash

#### Pros

- Universally supported
- May be the only way to perform deletion detection
- Can be extended to detect field level changes

#### Cons

- Very resource intensive
- Requires an additional datastore
- Can’t be run as frequently
- Risk of falsely reporting deletions

## Connection Points
This section describes the various ways to connect to a system.  In general, an adapter initiates a connection to the application, not the other way around. (The big notable exceptions are webhooks where data changes are pushed from the application to OIH.)  Often on premise systems include both a web server that exposes an API and a corresponding database.  Both of these may provide connection opportunities.  Cloud based software as a service providers often only expose APIs on the web server while some custom built or specific purpose applications only expose DB connections.
### Web Server API
#### Pros

- Often only way for web based SaaS
- Enforces largest set of business rules
- Highest level of abstraction
- Most granular permissioning
- Can have mechanisms to handle demand spikes
- Has longer support guarantee

#### Cons

- Built on top of HTTP(S) which is both non-reliable and verbose
- Most of the time only partial implementation of HTTP resource semantic is available and can be assumed
- Has performance overhead

### DB Views/DB Tables
#### Pros

- Can be more performant
- Often DB expertise is more plentiful than application expertise
- Often results in fewer bugs
- More abstraction than tables
- Can be used when web APIs don’t exist or are otherwise not very good

#### Cons

- Most of the time is not official API, hence subject of unexpected changes during version upgrades, updated, etc.
