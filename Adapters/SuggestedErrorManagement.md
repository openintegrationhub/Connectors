# Error Management Ideas

As an integrator who has multiple production flows which move large amounts of
data, I will get a large amount of errors.  (E.g. if I have a flow that runs
every three minutes and has an error rate of 0.5%, then I would expect 2 errors
per day for that flow.)  I want better tooling so that I can:

* Fix data records which are not in the expected state due a flow encountering an error before completion
* Understand if a flow is broken or if errors are simply occurring at an expected rate
* Triage errors so that their root cause can be addressed
* Be alerted to any possible misconfiguration of my flows or their related systems

Below are some possible mechanisms that can be used to achieve these goals.

# Possible Error Features
## Manual Replay on Error
*(Not particularly applicable to Request-Reply flows)*
If an error occurs during the execution, it would be nice if an integrator could
edit the input message and then click a button to resubmit the error message to
that point in the flow or opt to dismiss the error message.

## Group by error view
If it would be possible to do group by's on reported errors based on
flow/step/account/stack trace/error message and provide a frequency count of
each error, an integrator would have a better view of what is happening in the
system.

## Auto-retry
*(Not particularly applicable to Request-Reply flows)*
If a component throws an exception (and the component can tell the
platform/sailor that retry-ing this input may be successful) then sailor/the
platform should automatically invoke the `rebound` case without requiring the
component developer to call rebound.

## On-Error Action for Flow Component
If an error happens somewhere in a flow and the user wants to have that error
reporting/recovery partially or fully handled by an external system in an
automated way, we could add an 'On Error' step for a flow which is a component
which is invoked and passed the error information for any errors which happen
from any step in the flow.

## Track Last Execution Date
Allow integrators to set a "Alert me if not run in {Some Time Span}" setting on
a flow.  Send an alert if time span elapses without any executions.

# Triage on error type & Semi-automated error recovering
Depending on the root cause of the error (e.g. authentication error vs system
error vs business validation error) a corporate customer may want different
individuals to be responsible for managing different errors.  If the component
developer has the ability to categorize the errors the component emits and the
platform can respect that categorization, then the platform can put different
errors into different manual error resolution queues to be picked up by
different individuals at an organization.

Consider the list of possible error causes and a (suggested) way that the platform could respond to that error:

## Authentication Error
(A previously valid account starts throwing authentication errors when trying to
access it because a token has expired, a password changed, a system user
deleted, etc.)
1. Platform starts sending error alerts very loudly so that they are not missed by individuals responsible for monitoring integrations.
1. All messages arriving at any step in any non request-reply flow are stored.
1. Once a user has fixed the error-ed account, the user can click a button to process failed messages.
1. The platform will then fees the previously held messages into the previously paused steps.

## Business Validation Error
(A step emits error because the API rejects the request with a `400`-like error
because the incoming message does not conform to some business rule enforced by
the system.)
1. Place message into business validation resolution queue for manual correction before being retried.

## System Error
(A step emits error because the API returns with a `500` response code, timeout or failure to connect.)
1. Automatically start retrying.
1. If this failure is observed for all (or a high %) of interactions with this system/account (across multiple input messages), flag the system is down.
1. Platform starts sending error alerts very loudly so that they are not missed by individuals responsible for monitoring integrations.
1. All messages arriving at any step in any non request-reply flow are stored.
1. Once a user has fixed the error-ed account, the user can click a button to process failed messages.
1. The platform will then fees the previously held messages into the previously paused steps.
**Aside: One could build an additional mechanism into the platform to track external system health.**

## Dev Bug
(A step emits an error that is not caught by the developer (e.g. Null pointer
exception, maybe out of memory) or explicitly thrown by the developer (e.g. enum
in invalid state))
1. Platform sends stacktrace to component developer via email or bug tracking system so that component developer is aware of the problem and can fix the bug.

## API starvation error
(A component fails to complete an API call because the API call limit has been reached.)
1. Component tells the platform when more API calls will be available.
1. Platform retries at that time.
1. Number of such starvation errors for an account is stored.  If this number is increasing, then the platform should alert the integrator.
**Aside: One could build an additional mechanism into the platform to track API call limit usage.**

## Emit Warning
(A component receives some warnings from some API that they are calling.)
1. Component passes warning to platform.
1. Platform places warning in message queue for the user so that the user can resolve or dismiss the warning.

## Incoming message too large
(Courtesy of @zubairov : a component with 512 MB RAM emits a 300 MB message which can not be loaded into the following component with only 256 MB RAM.)
????