export const idlFactory = ({ IDL }) => {
  const InitStudentParams = IDL.Record({
    'id' : IDL.Nat,
    'bio' : IDL.Text,
    'gpa' : IDL.Text,
    'name' : IDL.Text,
    'level' : IDL.Text,
    'schoolId' : IDL.Nat,
    'image' : IDL.Text,
  });
  const Network = IDL.Variant({
    'mainnet' : IDL.Null,
    'regtest' : IDL.Null,
    'testnet' : IDL.Null,
  });
  const InitSchoolParams = IDL.Record({
    'id' : IDL.Nat,
    'students' : IDL.Vec(IDL.Nat),
    'name' : IDL.Text,
    'description' : IDL.Text,
    'location' : IDL.Text,
    'images' : IDL.Vec(IDL.Text),
  });
  const InitParams = IDL.Record({
    'students' : IDL.Vec(InitStudentParams),
    'network' : Network,
    'schools' : IDL.Vec(InitSchoolParams),
  });
  const BitcoinAddress = IDL.Text;
  const Category = IDL.Record({
    'ls' : IDL.Nat,
    'ss' : IDL.Nat,
    'ts' : IDL.Nat,
    'cdd' : IDL.Nat,
    'categoryType' : IDL.Nat,
  });
  const Satoshi = IDL.Nat64;
  const DonationParams = IDL.Record({
    'donationTo' : IDL.Nat,
    'paymentMethod' : IDL.Nat,
    'donater' : BitcoinAddress,
    'txId' : IDL.Text,
    'donationCategory' : Category,
    'amount' : Satoshi,
    'recipientId' : IDL.Nat,
  });
  const Result_5 = IDL.Variant({ 'ok' : IDL.Text, 'err' : IDL.Text });
  const BitcoinAddress__1 = IDL.Text;
  const Satoshi__1 = IDL.Nat64;
  const MillisatoshiPerVByte = IDL.Nat64;
  const Donation = IDL.Record({
    'dti' : IDL.Text,
    'donationTo' : IDL.Nat,
    'paymentMethod' : IDL.Nat,
    'donater' : BitcoinAddress,
    'txId' : IDL.Text,
    'category' : Category,
    'confirmed' : IDL.Bool,
    'amount' : Satoshi,
    'recipientId' : IDL.Nat,
  });
  const Result_4 = IDL.Variant({ 'ok' : Donation, 'err' : IDL.Text });
  const SchoolOutput = IDL.Record({
    'id' : IDL.Nat,
    'students' : IDL.Vec(IDL.Nat),
    'name' : IDL.Text,
    'description' : IDL.Text,
    'amountDonated' : Satoshi,
    'location' : IDL.Text,
    'donations' : IDL.Vec(IDL.Text),
    'images' : IDL.Vec(IDL.Text),
  });
  const Result_3 = IDL.Variant({ 'ok' : SchoolOutput, 'err' : IDL.Text });
  const StudentOutput = IDL.Record({
    'id' : IDL.Nat,
    'bio' : IDL.Text,
    'gpa' : IDL.Text,
    'name' : IDL.Text,
    'level' : IDL.Text,
    'schoolId' : IDL.Nat,
    'image' : IDL.Text,
    'amountDonated' : Satoshi,
    'donations' : IDL.Vec(IDL.Text),
  });
  const Result_2 = IDL.Variant({ 'ok' : StudentOutput, 'err' : IDL.Text });
  const Page = IDL.Vec(IDL.Nat8);
  const BlockHash = IDL.Vec(IDL.Nat8);
  const OutPoint = IDL.Record({
    'txid' : IDL.Vec(IDL.Nat8),
    'vout' : IDL.Nat32,
  });
  const Utxo = IDL.Record({
    'height' : IDL.Nat32,
    'value' : Satoshi,
    'outpoint' : OutPoint,
  });
  const GetUtxosResponse = IDL.Record({
    'next_page' : IDL.Opt(Page),
    'tip_height' : IDL.Nat32,
    'tip_block_hash' : BlockHash,
    'utxos' : IDL.Vec(Utxo),
  });
  const DonationParamsNNS = IDL.Record({
    'donationTo' : IDL.Nat,
    'paymentMethod' : IDL.Nat,
    'donationCategory' : Category,
    'amount' : Satoshi,
    'recipientId' : IDL.Nat,
  });
  const TransferFromError = IDL.Variant({
    'GenericError' : IDL.Record({
      'message' : IDL.Text,
      'error_code' : IDL.Nat,
    }),
    'TemporarilyUnavailable' : IDL.Null,
    'InsufficientAllowance' : IDL.Record({ 'allowance' : IDL.Nat }),
    'BadBurn' : IDL.Record({ 'min_burn_amount' : IDL.Nat }),
    'Duplicate' : IDL.Record({ 'duplicate_of' : IDL.Nat }),
    'BadFee' : IDL.Record({ 'expected_fee' : IDL.Nat }),
    'CreatedInFuture' : IDL.Record({ 'ledger_time' : IDL.Nat64 }),
    'TooOld' : IDL.Null,
    'InsufficientFunds' : IDL.Record({ 'balance' : IDL.Nat }),
  });
  const Result_1 = IDL.Variant({ 'ok' : IDL.Text, 'err' : TransferFromError });
  const SendRequest = IDL.Record({
    'destination_address' : IDL.Text,
    'amount_in_satoshi' : Satoshi,
  });
  const SendCkBTCRequest = IDL.Record({
    'destination_address' : IDL.Principal,
    'amount_in_e8s' : IDL.Nat,
  });
  const BlockIndex = IDL.Nat;
  const TransferError = IDL.Variant({
    'GenericError' : IDL.Record({
      'message' : IDL.Text,
      'error_code' : IDL.Nat,
    }),
    'TemporarilyUnavailable' : IDL.Null,
    'BadBurn' : IDL.Record({ 'min_burn_amount' : IDL.Nat }),
    'Duplicate' : IDL.Record({ 'duplicate_of' : IDL.Nat }),
    'BadFee' : IDL.Record({ 'expected_fee' : IDL.Nat }),
    'CreatedInFuture' : IDL.Record({ 'ledger_time' : IDL.Nat64 }),
    'TooOld' : IDL.Null,
    'InsufficientFunds' : IDL.Record({ 'balance' : IDL.Nat }),
  });
  const Result = IDL.Variant({ 'ok' : BlockIndex, 'err' : TransferError });
  const BitcoinDonations = IDL.Service({
    'create_donation_record' : IDL.Func([DonationParams], [Result_5], []),
    'get_btc_balance' : IDL.Func([BitcoinAddress__1], [Satoshi__1], []),
    'get_canister_id' : IDL.Func([], [IDL.Principal], []),
    'get_ckBtc_balance' : IDL.Func([], [IDL.Nat], []),
    'get_current_fee_percentiles' : IDL.Func(
        [],
        [IDL.Vec(MillisatoshiPerVByte)],
        [],
      ),
    'get_donation' : IDL.Func([IDL.Text], [Result_4], ['query']),
    'get_logs' : IDL.Func([], [IDL.Vec(IDL.Text)], ['query']),
    'get_p2pkh_address' : IDL.Func([], [BitcoinAddress__1], []),
    'get_school' : IDL.Func([IDL.Nat], [Result_3], ['query']),
    'get_student' : IDL.Func([IDL.Nat], [Result_2], ['query']),
    'get_total_donations' : IDL.Func([], [IDL.Nat], ['query']),
    'get_total_schools' : IDL.Func([], [IDL.Nat], ['query']),
    'get_total_students' : IDL.Func([], [IDL.Nat], ['query']),
    'get_utxos' : IDL.Func([BitcoinAddress__1], [GetUtxosResponse], []),
    'list_donations' : IDL.Func([], [IDL.Vec(Donation)], ['query']),
    'pay_with_nns' : IDL.Func([DonationParamsNNS], [Result_1], []),
    'withdraw_btc' : IDL.Func([SendRequest], [IDL.Text], []),
    'withdraw_ckbtc' : IDL.Func([SendCkBTCRequest], [Result], []),
  });
  return BitcoinDonations;
};
export const init = ({ IDL }) => {
  const InitStudentParams = IDL.Record({
    'id' : IDL.Nat,
    'bio' : IDL.Text,
    'gpa' : IDL.Text,
    'name' : IDL.Text,
    'level' : IDL.Text,
    'schoolId' : IDL.Nat,
    'image' : IDL.Text,
  });
  const Network = IDL.Variant({
    'mainnet' : IDL.Null,
    'regtest' : IDL.Null,
    'testnet' : IDL.Null,
  });
  const InitSchoolParams = IDL.Record({
    'id' : IDL.Nat,
    'students' : IDL.Vec(IDL.Nat),
    'name' : IDL.Text,
    'description' : IDL.Text,
    'location' : IDL.Text,
    'images' : IDL.Vec(IDL.Text),
  });
  const InitParams = IDL.Record({
    'students' : IDL.Vec(InitStudentParams),
    'network' : Network,
    'schools' : IDL.Vec(InitSchoolParams),
  });
  return [InitParams];
};
