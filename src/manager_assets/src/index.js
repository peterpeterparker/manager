import { Actor, HttpAgent } from '@dfinity/agent';
import { child_can } from '../../declarations/child_can';
import { idlFactory } from '../../declarations/bucket';

export const createBucketActor = async ({ canisterId }) => {
  const agent = new HttpAgent();

  if (process.env.NODE_ENV !== 'production') {
    await agent.fetchRootKey();
  }

  return Actor.createActor(idlFactory, {
    agent,
    canisterId
  });
};

let bucket;

const initCanister = async () => {
  try {
    bucket = await child_can.init();
    console.log('New bucket:', bucket.toText());
  } catch (err) {
    console.error(err);
  }
};

const sayHello = async () => {
  try {
    const actor = await createBucketActor({
      canisterId: bucket
    });
    console.log(await actor.say());
  } catch (err) {
    console.error(err);
  }
};

const init = () => {
  const btnInit = document.querySelector('button#init');
  btnInit.addEventListener('click', initCanister);

  const btnSay = document.querySelector('button#say');
  btnSay.addEventListener('click', sayHello);
};

document.addEventListener('DOMContentLoaded', init);
