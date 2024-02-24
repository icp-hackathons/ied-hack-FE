import { _SERVICE } from "./declarations/icrc1_ledger/icrc1_ledger.did";
import { ActorSubclass, Agent } from "@dfinity/agent";
import { Principal } from "@dfinity/principal";
import { createActor as createLedgerActor } from "./declarations/icrc1_ledger";

import * as ledger from "./declarations/icrc1_ledger";

const ledgerCanisterId = "mxzaz-hqaaa-aaaar-qaada-cai";

export const makeActorWithAgent = async (
  canisterId: string,
  createActor: {
    (
      canisterId: string | Principal,
      options?: ledger.CreateActorOptions | undefined
    ): ActorSubclass<_SERVICE>;
    (arg0: any, arg1: { agentOptions: { host: string | undefined } }): any;
  },
  agent: Agent
) => {
  return createActor(canisterId, {
    agent,
    agentOptions: {
      host: process.env.NEXT_PUBLIC_IC_HOST,
    },
  });
};

export function makeLedgerActorWithAgent(agent: Agent) {
  return makeActorWithAgent(ledgerCanisterId, createLedgerActor, agent);
}
