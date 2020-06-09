# Hack A Mole API

## A home for the moles

### Setup

#### Firebase Authentication

- In order to generate authentication tokens, you'll need to create a firebase account to generate authentication credentials
- After creating a firebase project, you'll need to export google services account credentials to link the backend with the firebase admin sdk

#### Database Security

- The postgres database requires the server has a file under ~/secrets/passwordfile in order to set the default password for the "moleman" postgres user. This file should not be accessible to anyone other than the database container and process