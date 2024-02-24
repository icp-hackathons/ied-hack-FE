import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export type BitcoinAddress = string;
export type BitcoinAddress__1 = string;
export interface BitcoinDonations {
  'create_donation_record' : ActorMethod<[DonationParams], Result_5>,
  'get_btc_balance' : ActorMethod<[BitcoinAddress__1], Satoshi__1>,
  'get_canister_id' : ActorMethod<[], Principal>,
  'get_ckBtc_balance' : ActorMethod<[], bigint>,
  'get_current_fee_percentiles' : ActorMethod<[], BigUint64Array | bigint[]>,
  'get_donation' : ActorMethod<[string], Result_4>,
  'get_logs' : ActorMethod<[], Array<string>>,
  'get_p2pkh_address' : ActorMethod<[], BitcoinAddress__1>,
  'get_school' : ActorMethod<[bigint], Result_3>,
  'get_student' : ActorMethod<[bigint], Result_2>,
  'get_total_donations' : ActorMethod<[], bigint>,
  'get_total_schools' : ActorMethod<[], bigint>,
  'get_total_students' : ActorMethod<[], bigint>,
  'get_utxos' : ActorMethod<[BitcoinAddress__1], GetUtxosResponse>,
  'list_donations' : ActorMethod<[], Array<Donation>>,
  'pay_with_nns' : ActorMethod<[DonationParamsNNS], Result_1>,
  'withdraw_btc' : ActorMethod<[SendRequest], string>,
  'withdraw_ckbtc' : ActorMethod<[SendCkBTCRequest], Result>,
}
export type BlockHash = Uint8Array | number[];
export type BlockIndex = bigint;
export interface Category {
  'ls' : bigint,
  'ss' : bigint,
  'ts' : bigint,
  'cdd' : bigint,
  'categoryType' : bigint,
}
export interface Donation {
  'dti' : string,
  'donationTo' : bigint,
  'paymentMethod' : bigint,
  'donater' : BitcoinAddress,
  'txId' : string,
  'category' : Category,
  'confirmed' : boolean,
  'amount' : Satoshi,
  'recipientId' : bigint,
}
export interface DonationParams {
  'donationTo' : bigint,
  'paymentMethod' : bigint,
  'donater' : BitcoinAddress,
  'txId' : string,
  'donationCategory' : Category,
  'amount' : Satoshi,
  'recipientId' : bigint,
}
export interface DonationParamsNNS {
  'donationTo' : bigint,
  'paymentMethod' : bigint,
  'donationCategory' : Category,
  'amount' : Satoshi,
  'recipientId' : bigint,
}
export interface GetUtxosResponse {
  'next_page' : [] | [Page],
  'tip_height' : number,
  'tip_block_hash' : BlockHash,
  'utxos' : Array<Utxo>,
}
export interface InitParams {
  'students' : Array<InitStudentParams>,
  'network' : Network,
  'schools' : Array<InitSchoolParams>,
}
export interface InitSchoolParams {
  'id' : bigint,
  'students' : Array<bigint>,
  'name' : string,
  'description' : string,
  'location' : string,
  'images' : Array<string>,
}
export interface InitStudentParams {
  'id' : bigint,
  'bio' : string,
  'gpa' : string,
  'name' : string,
  'level' : string,
  'schoolId' : bigint,
  'image' : string,
}
export type MillisatoshiPerVByte = bigint;
export type Network = { 'mainnet' : null } |
  { 'regtest' : null } |
  { 'testnet' : null };
export interface OutPoint { 'txid' : Uint8Array | number[], 'vout' : number }
export type Page = Uint8Array | number[];
export type Result = { 'ok' : BlockIndex } |
  { 'err' : TransferError };
export type Result_1 = { 'ok' : string } |
  { 'err' : TransferFromError };
export type Result_2 = { 'ok' : StudentOutput } |
  { 'err' : string };
export type Result_3 = { 'ok' : SchoolOutput } |
  { 'err' : string };
export type Result_4 = { 'ok' : Donation } |
  { 'err' : string };
export type Result_5 = { 'ok' : string } |
  { 'err' : string };
export type Satoshi = bigint;
export type Satoshi__1 = bigint;
export interface SchoolOutput {
  'id' : bigint,
  'students' : Array<bigint>,
  'name' : string,
  'description' : string,
  'amountDonated' : Satoshi,
  'location' : string,
  'donations' : Array<string>,
  'images' : Array<string>,
}
export interface SendCkBTCRequest {
  'destination_address' : Principal,
  'amount_in_e8s' : bigint,
}
export interface SendRequest {
  'destination_address' : string,
  'amount_in_satoshi' : Satoshi,
}
export interface StudentOutput {
  'id' : bigint,
  'bio' : string,
  'gpa' : string,
  'name' : string,
  'level' : string,
  'schoolId' : bigint,
  'image' : string,
  'amountDonated' : Satoshi,
  'donations' : Array<string>,
}
export type TransferError = {
    'GenericError' : { 'message' : string, 'error_code' : bigint }
  } |
  { 'TemporarilyUnavailable' : null } |
  { 'BadBurn' : { 'min_burn_amount' : bigint } } |
  { 'Duplicate' : { 'duplicate_of' : bigint } } |
  { 'BadFee' : { 'expected_fee' : bigint } } |
  { 'CreatedInFuture' : { 'ledger_time' : bigint } } |
  { 'TooOld' : null } |
  { 'InsufficientFunds' : { 'balance' : bigint } };
export type TransferFromError = {
    'GenericError' : { 'message' : string, 'error_code' : bigint }
  } |
  { 'TemporarilyUnavailable' : null } |
  { 'InsufficientAllowance' : { 'allowance' : bigint } } |
  { 'BadBurn' : { 'min_burn_amount' : bigint } } |
  { 'Duplicate' : { 'duplicate_of' : bigint } } |
  { 'BadFee' : { 'expected_fee' : bigint } } |
  { 'CreatedInFuture' : { 'ledger_time' : bigint } } |
  { 'TooOld' : null } |
  { 'InsufficientFunds' : { 'balance' : bigint } };
export interface Utxo {
  'height' : number,
  'value' : Satoshi,
  'outpoint' : OutPoint,
}
export interface _SERVICE extends BitcoinDonations {}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: ({ IDL }: { IDL: IDL }) => IDL.Type[];
