import { Principal } from "@dfinity/principal";
import { makeLedgerActorWithAgent } from "./ledger-actor-locator";
import { Agent } from "@dfinity/agent";

export async function approveICPSpend(
  spender: Principal,
  amount: bigint,
  agent: Agent
) {
  const ledgerService = await makeLedgerActorWithAgent(agent);

  const result = await ledgerService.icrc2_approve({
    fee: [],
    memo: [],
    from_subaccount: [],
    created_at_time: [],
    amount,
    expected_allowance: [],
    expires_at: [],
    spender: { owner: spender, subaccount: [] },
  });

  if ("Err" in result) {
    console.log(result.Err);
    throw new Error("Error in approving icp spender");
  }
  return result.Ok;
}
