import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export interface _SERVICE {
  'getCanisterId' : ActorMethod<[], [] | [Principal]>,
  'init' : ActorMethod<[], Principal>,
  'installCode' : ActorMethod<
    [Principal, Array<number>, Array<number>],
    undefined,
  >,
}
