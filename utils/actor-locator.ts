import { _SERVICE } from "./declarations/backend/backend.did";
import { ActorSubclass } from "@dfinity/agent";
import { Principal } from "@dfinity/principal";
import {
  createActor as createBackendActor,
  canisterId as backendCanisterId,
} from "./declarations/backend";

import * as backend from "./declarations/backend";

export const makeActor = async (
  canisterId: string,
  createActor: {
    (
      canisterId: string | Principal,
      options?: backend.CreateActorOptions | undefined
    ): ActorSubclass<_SERVICE>;
    (arg0: any, arg1: { agentOptions: { host: string | undefined } }): any;
  }
) => {
  return createActor(canisterId, {
    agentOptions: {
      host: process.env.NEXT_PUBLIC_IC_HOST,
    },
  });
};

export function makeBackendActor() {
  return makeActor(backendCanisterId, createBackendActor);
}
