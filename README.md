# Charity Token

The Charity Token is an Ethereum-based, ERC20 compliant token issued for collecting funds for charities. The initial goal of the project is to give donors a possibility to transfer Ether for one closer specified organisation and issue tokens in return. In a later stage, the issued Charity Token will be used to choose on charity organisations that should be supported.

## Mission and purpose

The Charity Token is inspired by The Pineapple Fund which is a philanthropic project. An anonymous individual founded it in December 2017 in order to give away 5,057 Bitcoins to charity.

Many people in crypto industry got rich over the recent years. We think many of them would like to share their prosperity with those in need.

Our goal is to create an easy and trustless crypto-based way to donate charities. We want to create a solution that will be of use anytime someone in crypto space feels like to make an impact.

Charity Token is an universal way to do something good to others. We don't want to make donators think which organisation they are supposed to support. We want to make them sure that their assets are  spent for a good cause and make a positive impact on our society.

Our final vision is to create an  always on-going ICO for Charity Token. The token will be supported by a decentralized governance mechanism. It will allow token holders to decide which organisation should be supported with  collected fund. We invite entire crypto community to a discussion upon this governance mechanism and designing its framework.

Our first iteration (currently  in progress) supports just one organisation chosen by us. We decided to begin  with this baby step to show it is not mere  talking, but actions. Here we would like to  to start a discussion about a final version of the governance protocol.

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
