# Requirements to Test or Build an Adapter
**Version Publish Date: 05.02.2018**

**Semantic Version of Document: 1.0.0**

In order for an individual to test the correctness of an adapter or to build an
adapter for a new system, the following resources are **must haves** in order to
access the API:
- [ ] An instance/account/tenant for the tester to use.  This includes:
  - [ ] A server where the API is set up (or the API is already hosted in the cloud)
  - [ ] All services/daemons to process the API and webhooks are running
  - [ ] The necessary software licenses are provided so that the software may be
  run in the configuration
- [ ] The tester must have permission to:
  - [ ] Log in to the test account/system
  - [ ] Create, Update and Delete objects as required in the UI of the system
  - [ ] Configure API access for the adapter
- [ ] Data in the test instance/account/tenant can only be manipulated by the
tester and the adapter (No shared test instances/accounts/tenants)
- [ ] The tester must be provided all API keys that are required in order for
the adapter to interact with the API
- [ ] Access to the API documentation *(in case of password protected or not 
otherwise publicly available API documentation)*
