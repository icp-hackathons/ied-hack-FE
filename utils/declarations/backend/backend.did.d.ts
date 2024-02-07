import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export type BitcoinAddress = string;
export type BitcoinAddress__1 = string;
export interface BitcoinDonations {
  'get_balance' : ActorMethod<[BitcoinAddress__1], Satoshi__1>,
  'get_current_fee_percentiles' : ActorMethod<[], BigUint64Array | bigint[]>,
  'get_donation' : ActorMethod<[string], [] | [Donation]>,
  'get_p2pkh_address' : ActorMethod<[], BitcoinAddress__1>,
  'get_school' : ActorMethod<[bigint], [] | [School]>,
  'get_student' : ActorMethod<[bigint], [] | [Student]>,
  'get_total_donations' : ActorMethod<[], bigint>,
  'get_total_schools' : ActorMethod<[], bigint>,
  'get_total_students' : ActorMethod<[], bigint>,
  'make_donation' : ActorMethod<[MakeDonationParams], Result>,
  'send' : ActorMethod<[SendRequest], string>,
}
export interface Category {
  'ls' : bigint,
  'ss' : bigint,
  'ts' : bigint,
  'cdd' : bigint,
  'categoryType' : bigint,
}
export interface Donation {
  'dti' : string,
  'donater' : BitcoinAddress,
  'txId' : string,
  'category' : Category,
  'amount' : Satoshi,
  'recipientId' : bigint,
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
export type List = [] | [[string, List]];
export type List_1 = [] | [[bigint, List_1]];
export interface MakeDonationParams {
  'donationTo' : bigint,
  'txId' : string,
  'address' : BitcoinAddress,
  'donationCategory' : Category,
  'amount' : Satoshi,
  'recipientId' : bigint,
}
export type MillisatoshiPerVByte = bigint;
export type Network = { 'mainnet' : null } |
  { 'regtest' : null } |
  { 'testnet' : null };
export type Result = { 'ok' : string } |
  { 'err' : string };
export type Satoshi = bigint;
export type Satoshi__1 = bigint;
export interface School {
  'id' : bigint,
  'students' : List_1,
  'name' : string,
  'description' : string,
  'amountDonated' : Satoshi,
  'location' : string,
  'donations' : List,
  'images' : List,
}
export interface SendRequest {
  'destination_address' : string,
  'amount_in_satoshi' : Satoshi,
}
export interface Student {
  'id' : bigint,
  'bio' : string,
  'gpa' : string,
  'name' : string,
  'level' : string,
  'schoolId' : bigint,
  'image' : string,
  'amountDonated' : Satoshi,
  'donations' : List,
}
export interface _SERVICE extends BitcoinDonations {}
