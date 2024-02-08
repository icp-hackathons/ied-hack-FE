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
  const BitcoinAddress__1 = IDL.Text;
  const Satoshi__1 = IDL.Nat64;
  const MillisatoshiPerVByte = IDL.Nat64;
  const BitcoinAddress = IDL.Text;
  const Category = IDL.Record({
    'ls' : IDL.Nat,
    'ss' : IDL.Nat,
    'ts' : IDL.Nat,
    'cdd' : IDL.Nat,
    'categoryType' : IDL.Nat,
  });
  const Satoshi = IDL.Nat64;
  const Donation = IDL.Record({
    'dti' : IDL.Text,
    'donationTo' : IDL.Nat,
    'donater' : BitcoinAddress,
    'txId' : IDL.Text,
    'category' : Category,
    'amount' : Satoshi,
    'recipientId' : IDL.Nat,
  });
  const Result_3 = IDL.Variant({ 'ok' : Donation, 'err' : IDL.Text });
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
  const Result_2 = IDL.Variant({ 'ok' : SchoolOutput, 'err' : IDL.Text });
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
  const Result_1 = IDL.Variant({ 'ok' : StudentOutput, 'err' : IDL.Text });
  const MakeDonationParams = IDL.Record({
    'donationTo' : IDL.Nat,
    'txId' : IDL.Text,
    'address' : BitcoinAddress,
    'donationCategory' : Category,
    'amount' : Satoshi,
    'recipientId' : IDL.Nat,
  });
  const Result = IDL.Variant({ 'ok' : IDL.Text, 'err' : IDL.Text });
  const SendRequest = IDL.Record({
    'destination_address' : IDL.Text,
    'amount_in_satoshi' : Satoshi,
  });
  const BitcoinDonations = IDL.Service({
    'get_balance' : IDL.Func([BitcoinAddress__1], [Satoshi__1], []),
    'get_current_fee_percentiles' : IDL.Func(
        [],
        [IDL.Vec(MillisatoshiPerVByte)],
        [],
      ),
    'get_donation' : IDL.Func([IDL.Text], [Result_3], ['query']),
    'get_p2pkh_address' : IDL.Func([], [BitcoinAddress__1], []),
    'get_school' : IDL.Func([IDL.Nat], [Result_2], ['query']),
    'get_student' : IDL.Func([IDL.Nat], [Result_1], ['query']),
    'get_total_donations' : IDL.Func([], [IDL.Nat], ['query']),
    'get_total_schools' : IDL.Func([], [IDL.Nat], ['query']),
    'get_total_students' : IDL.Func([], [IDL.Nat], ['query']),
    'list_donations' : IDL.Func([], [IDL.Vec(Donation)], ['query']),
    'make_donation' : IDL.Func([MakeDonationParams], [Result], []),
    'send' : IDL.Func([SendRequest], [IDL.Text], []),
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
