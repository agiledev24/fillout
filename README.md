## The node.js example app

[![CircleCI](https://img.shields.io/circleci/project/github/contentful/the-example-app.nodejs.svg)](https://circleci.com/gh/contentful/the-example-app.nodejs)

The node.js example app teaches the very basics of how to work with Contentful:

- consume content from the Contentful Delivery and Preview APIs
- model content
- edit content through the Contentful web app

The app demonstrates how to implement an endpoint, for fetching responses from a form with filters.

You can see a hosted version of `REST API` on <a href="https://fillout-obwp.onrender.com/cLZojxk94ous/filteredResponses?filters[0][id]=bE2Bo4cGUv49cjnqZ4UnkW&filters[0][condition]=equals&filters[0][value]=Johnny&filters[1][id]=fFnyxwWa3KV6nBdfBDCHEA&filters[1][condition]=less_than&filters[1][value]=3" target="_blank">Render</a>.

## Requirements

* Node >=v18.19.x
* Git

## Common setup

Clone the repo and install the dependencies.

```bash
git clone https://github.com/agiledev24/fillout.git
cd fillout
```

```bash
npm install
```

## Steps for running locally
Step 1: Create and open `.env` and inject your credentials so it looks like this

```
ENVIRONMENT=prod
API_KEY=
API_BASE_URL=https://api.fillout.com/v1/api
APP_PORT=3000
```

Step 2: To start the express server, run the following
```bash
npm start
```
Final Step:

Open [http://localhost:3000/cLZojxk94ous/filteredResponses?filters[0][id]=bE2Bo4cGUv49cjnqZ4UnkW&filters[0][condition]=equals&filters[0][value]=Johnny&filters[1][id]=fFnyxwWa3KV6nBdfBDCHEA&filters[1][condition]=less_than&filters[1][value]=3](http://localhost:3000/cLZojxk94ous/filteredResponses?filters[0][id]=bE2Bo4cGUv49cjnqZ4UnkW&filters[0][condition]=equals&filters[0][value]=Johnny&filters[1][id]=fFnyxwWa3KV6nBdfBDCHEA&filters[1][condition]=less_than&filters[1][value]=3) and take a look around. This URL demonstrates how filtering works in the endpoint.