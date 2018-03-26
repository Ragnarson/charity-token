# Charity Token

The Charity Token is an Ethereum-based, ERC20 compliant token issued for collecting funds for charities. The initial goal of the project is to give donors an possibility to transfer Ether for one closer specified organisation and issue tokens in return. In a later stage, the issued Charity Token will be used to choose on charity organisations that should be supported.

## Running tests

```
npm install
npm test
```

## Deploying

Create `.env` file in the main project directory. Copy & paste the variables from `.env.example` and fill in them with corresponding data. Then run `truffle migrate --network network_name`. `network_name` could be `ropsten` or `mainnet`.

## Variable types

Depending on an environment (`ropsten` or `mainnet`), the variables can differ.

- `INFURA_TOKEN` - Infura acts as a deployment node, a token can be generated at https://infura.io/
- `DEPLOYMENT_WALLET_MNEMONIC` - a passphrase that is used to restore your account and will serve to create addresses for deploying the contracts
- `START_TIME` - a time when purchases start (UNIX timestamp)
- `END_TIME` - a time when purchases end (UNIX timestamp)
- `RATE` - a number of token units a buyer gets per wei (integer)
- `WALLET` - an address where collected funds will be forwarded to
