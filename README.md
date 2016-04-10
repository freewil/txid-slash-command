# Bitcoin /txid slash command for Mixmax

## Known Issues
Once the email is sent, Gmail will strip out the svg tags. This should be modified so that the resolver simply returns an img tag. There are two ways to accomplish this:
 * a) upload the generated graph to an external service (such as S3) or
 * b) cache the generated graph and serve it from this web service

This web service will allow you to add a /txid <txid> command to Mixmax which
will provide a simple graph of the outputs of a bitcoin transaction.

![txid slash command demo](https://i.giphy.com/l0LJ1hdNlzOtRlG5q.gif)

## External Dependencies
You will need to make sure you have graphviz/dot installed to render the graphs.

Mac:
```
brew install graphviz
```

## Running locally

1. Install using `npm install`
2. Run using `npm start`

To simulate locally how Mixmax calls the resolver URL (to return HTML that goes into the email), run:

```
curl http://localhost:9145/resolver?text=608a651b4ffeb5a0514cd9074206b1d37b459531a8c0772ee643c5ad88e6e7e0
```

## Adding Mixmax Integration
From your Mixmax dashboard, go to Integrations, and click Add Slash Command:

| Field                                 | You Enter                       |
| ------------------------------------- | ------------------------------- |
| Name                                  | txid graph                      |
| Command                               | txid                            |
| Parameter placeholder                 | [txid]                          |
| Command Parameter Suggestions API URL | http://localhost:9145/typeahead |
| Command Parameter Resolver API URL    | http://localhost:9145/resolver  |
