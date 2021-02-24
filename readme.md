# Hack A Mole api

A whack-a-mole game backend example 🦔

Using ```nodejs```, ```graphql```, ```apollo```, ```express``` and ```postgresql``` 

## Convertion Effort
- Modernize react w/ hooks
- Convert all components to Typescript
    - create typed objects for models

#### Database Security

- The postgres database requires the docker host has a file under ```~/secrets/passwordfile``` in order to set the default password for the "moleman" postgres user. This file should not be accessible to anyone other than the docker host and instance
