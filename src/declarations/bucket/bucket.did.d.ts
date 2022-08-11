import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export interface Bucket { 'say' : ActorMethod<[], string> }
export interface _SERVICE extends Bucket {}
