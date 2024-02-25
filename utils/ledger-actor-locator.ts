import { _SERVICE } from "./declarations/icrc1_ledger/icrc1_ledger.did";
import { ActorSubclass, HttpAgent } from "@dfinity/agent";
import { Principal } from "@dfinity/principal";
import { createActor as createLedgerActor } from "./declarations/icrc1_ledger";

import * as ledger from "./declarations/icrc1_ledger";
import { AuthClient } from "@dfinity/auth-client";

const ledgerCanisterId = "mxzaz-hqaaa-aaaar-qaada-cai";

export const makeActor = async (
  canisterId: string,
  createActor: {
    (
      canisterId: string | Principal,
      options?: ledger.CreateActorOptions | undefined
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

export function makeLedgerActor(authClient?: AuthClient) {
  return makeActor(ledgerCanisterId, createLedgerActor, authClient);
}
