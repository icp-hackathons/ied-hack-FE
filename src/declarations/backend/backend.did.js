export const idlFactory = ({ IDL }) => {
  const List = IDL.Rec();
  const List_1 = IDL.Rec();
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
    'donater' : BitcoinAddress,
    'txId' : IDL.Text,
    'category' : Category,
    'amount' : Satoshi,
    'recipientId' : IDL.Nat,
  });
  List_1.fill(IDL.Opt(IDL.Tuple(IDL.Nat, List_1)));
  List.fill(IDL.Opt(IDL.Tuple(IDL.Text, List)));
  const School = IDL.Record({
    'id' : IDL.Nat,
    'students' : List_1,
    'name' : IDL.Text,
    'description' : IDL.Text,
    'amountDonated' : Satoshi,
    'location' : IDL.Text,
    'donations' : List,
    'images' : List,
  });
  const Student = IDL.Record({
    'id' : IDL.Nat,
    'bio' : IDL.Text,
    'gpa' : IDL.Text,
    'name' : IDL.Text,
    'level' : IDL.Text,
    'schoolId' : IDL.Nat,
    'image' : IDL.Text,
    'amountDonated' : Satoshi,
    'donations' : List,
  });
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
    'get_donation' : IDL.Func([IDL.Text], [IDL.Opt(Donation)], ['query']),
    'get_p2pkh_address' : IDL.Func([], [BitcoinAddress__1], []),
    'get_school' : IDL.Func([IDL.Nat], [IDL.Opt(School)], ['query']),
    'get_student' : IDL.Func([IDL.Nat], [IDL.Opt(Student)], ['query']),
    'get_total_donations' : IDL.Func([], [IDL.Nat], ['query']),
    'get_total_schools' : IDL.Func([], [IDL.Nat], ['query']),
    'get_total_students' : IDL.Func([], [IDL.Nat], ['query']),
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
