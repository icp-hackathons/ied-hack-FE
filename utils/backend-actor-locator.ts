import { _SERVICE } from "./declarations/backend/backend.did";
import { ActorSubclass, Agent, HttpAgent } from "@dfinity/agent";
import { Principal } from "@dfinity/principal";
import {
  createActor as createBackendActor,
  canisterId as backendCanisterId,
} from "./declarations/backend";

import * as backend from "./declarations/backend";
import { AuthClient } from "@dfinity/auth-client";

export const makeActor = async (
  canisterId: string,
  createActor: {
    (
      canisterId: string | Principal,
      options?: backend.CreateActorOptions | undefined
    ): ActorSubclass<_SERVICE>;
    (arg0: any, arg1: { agentOptions: { host: string | undefined } }): any;
  },
  authClient?: AuthClient
) => {
  // check if auth client is passed
  if (authClient) {
    let isAuth = await authClient.isAuthenticated();
    if (isAuth) {
      const agent = new HttpAgent({
        host: process.env.NEXT_PUBLIC_IC_HOST,
        identity: authClient.getIdentity(),
      });
      return createActor(canisterId, {
        agent,
        agentOptions: {
          host: process.env.NEXT_PUBLIC_IC_HOST,
        },
      });
    }
  }

  return createActor(canisterId, {
    agentOptions: {
      host: process.env.NEXT_PUBLIC_IC_HOST,
    },
  });
};

export function makeBackendActor(authClient?: AuthClient) {
  return makeActor(backendCanisterId, createBackendActor, authClient);
}
