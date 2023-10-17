const core = require('@actions/core');
const fsPath = require('path');
const fs = require('fs');
const IpfsHttpClient = require('ipfs-http-client');
const { globSource } = IpfsHttpClient;
const { Keyring } = require('@polkadot/keyring');
const { ApiPromise, WsProvider } = require('@polkadot/api');
const { typesBundleForPolkadot } = require('@crustio/type-definitions');
const { checkSeeds, sendTx } = require('./util');

async function main() {
    // 1. Get all inputs
    let path = core.getInput('path') || "./dApp";
    const seeds = core.getInput('seeds') || "success sick foil end pig husband april output rack thing pink wreck";
    const ipfsGateway = core.getInput('gateway') || 'https://crustipfs.xyz';

    // 2. Check path and convert path
    const workspace = process.env.GITHUB_WORKSPACE;
    if (!fsPath.isAbsolute(path) && workspace) {
        path = fsPath.join(workspace.toString(), path);
    }
    if (!fs.existsSync(path)) {
        throw new Error(`File/directory not exist: ${path}`);
    }

    // 3. Construct auth header
    const keyring = new Keyring();
    const pair = keyring.addFromUri(seeds);
    const sig = pair.sign(pair.address);
    const sigHex = '0x' + Buffer.from(sig).toString('hex');

    const authHeader = Buffer.from(`${pair.address}:${sigHex}`).toString('base64');

    // 4. Create ipfs http client
    const ipfs = IpfsHttpClient({
        url: ipfsGateway + '/api/v0',
        headers: {
            authorization: 'Basic ' + authHeader
        }
    });

    const { cid, size } = await ipfs.add(globSource(path, { recursive: true }));
    if (!cid) {
        throw new Error('IPFS add failed, please try again.');
    }
    console.log("CID: " + cid + ", size: " + size);

    const addr = "/ipfs/" + cid;
    const ipnsPublishRes = await ipfs.name.publish(addr);

    console.log("Publishing result: name: " + ipnsPublishRes.name + " value:" + ipnsPublishRes.value);

    const chainAddr = core.getInput('crust-endpoint') || 'wss://rpc.crust.network';
    const chain = new ApiPromise({
        provider: new WsProvider(chainAddr),
        typesBundle: typesBundleForPolkadot
    });
    const chainRes = await chain.isReadyOrError;

    console.log("Crust chain result:  " + chainRes);

    // place order using Crust
    const cidStr = cid.toV0().toString();
    const tx = chain.tx.market.placeStorageOrder(cidStr, size, 0, '');

    // Send tx and disconnect chain
    // returns true iff tx has been successful
    const txRes = await sendTx(tx, seeds);

    console.log("Transaction result: " + txRes);
    chain.disconnect();

    if (txRes === true) {
        core.setOutput('ipfs_cid', cidStr);
        core.setOutput('ipns_name', ipnsPublishRes.name);
    } else {
        throw new Error('Crust transaction failed.');
    }
}

main().catch(error => {
    console.log("Error: " + error);
    core.setFailed(error.message);
});