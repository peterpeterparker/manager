import {Principal} from "@dfinity/principal";
import {IDL} from '@dfinity/candid';
import {readFileSync} from 'fs';

import {idlFactory} from './.dfx/local/canisters/manager/manager.did.mjs';
import fetch from 'node-fetch';
import {HttpAgent, Actor} from '@dfinity/agent';

const loadWasm = () => {
    const buffer = readFileSync(`${process.cwd()}/.dfx/local/canisters/bucket/bucket.wasm`);
    return [...new Uint8Array(buffer)];
};

const managerPrincipalLocal = () => {
    const buffer = readFileSync('./.dfx/local/canister_ids.json');
    const {manager} = JSON.parse(buffer.toString('utf-8'));
    return Principal.fromText(manager.local);
};

const managerPrincipalIC = () => {
    const buffer = readFileSync('./canister_ids.json');
    const {manager} = JSON.parse(buffer.toString('utf-8'));
    return Principal.fromText(manager.ic);
};

const managerActor = async () => {
    const canisterId = managerPrincipalLocal();

    const agent = new HttpAgent({fetch, host: 'http://localhost:8000/'});

    await agent.fetchRootKey();

    return Actor.createActor(idlFactory, {
        agent,
        canisterId
    });
};

const upgradeBucket = async ({actor, wasmModule, canisterId, arg}) => {
    console.log(`Upgrading: ${canisterId.toText()}`);

    await actor.installCode(canisterId, [...arg], wasmModule);

    console.log(`Done: ${canisterId.toText()}`);
};

const installCode = async () => {
    const canisterId = Principal.fromText('renrk-eyaaa-aaaaa-aaada-cai');

    const actor = await managerActor();

    const wasmModule = loadWasm();

    const arg = IDL.encode([IDL.Text], ['User1']);

    await upgradeBucket({actor, wasmModule, canisterId, arg})
}

try {
    await installCode()
} catch (err) {
    console.error(err);
}
