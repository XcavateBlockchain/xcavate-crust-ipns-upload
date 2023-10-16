# Crust IPFS Upload action

This action upload your website to IPFS through [IPFS W3Auth Gateway](https://wiki.crust.network/docs/en/buildIPFSWeb3AuthGW)


## Inputs

### `path`

**Required** Path to directory sent to IPFS

### `seeds`

**Required** Substrate-based chain secret seeds, which support:

- [Crust](https://apps.crust.network/#/accounts): Please go to Crust Apps to get seeds
- [Polkadot](https://polkadot.js.org/apps/#/accounts): Please go to Polkadot Apps to get seeds
- [Kusama](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fkusama-rpc.polkadot.io#/accounts): Please go to Kusama Apps to get seeds
- More substrate based chains

### `gateway`

*Optional*, IPFS Public Gateway which support W3Auth, default is `https://crustipfs.xyz`
