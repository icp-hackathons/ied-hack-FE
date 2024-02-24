import { Principal } from "@dfinity/principal";
import { makeLedgerActor } from "./ledger-actor-locator";
import { AuthClient } from "@dfinity/auth-client";

export async function approveICPSpend(
  spender: Principal,
  amount: bigint,
  authClient: AuthClient
) {
  const ledgerService = await makeLedgerActor(authClient);

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
