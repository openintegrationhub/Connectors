# Adapter Goals

The documents in this folder lists the types of operations an adapter can
perform, the motivations for providing this functionality as well as the related
API functionality which must exist for an efficient implementation of these
functionalities.

The ideas in this folder are formatted in the following way:
1. An integrator who is using a connector to build an integration will have a set
   of goals for their integration.
2. For each goal, different implementations of that goal are possible.  Many of the
given behaviors for an implementation can be generalized across connectors.
3. For each possible implementation, the CSP's API is required to expose certain functionality.

The documents in this folder are arranged in the following way:
* [`AdapterGoals.md`](/Adapters/AdapterBehaviorStandardization/AdapterGoals.md)
identifies goals *that can be generalized across systems* and then lists the
standard implementations that satisfy those goals.
* [`StandardizedActionsAndTriggers.md`](/Adapters/AdapterBehaviorStandardization/StandardizedActionsAndTriggers.md)
builds on the `adapterGoals` as it describes in detail the standard behavior of each implementation.  Furthermore,
it describes what functionality is required in the CSP's API in order build such
an action/trigger.
