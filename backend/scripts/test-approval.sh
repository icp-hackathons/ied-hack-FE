#!/bin/bash

# mint tokens to your account
# ./mint-ledger-tokens <amount> <accountIdentifier>"

if [ -z "$1" ] 
then
    echo -e 'Please set amount to fund'
    exit 1
    echo -e "Please set account identifier from frontend"
    exit 1
fi
dfx identity use default

# get canister principal
canister=$(dfx canister call backend get_canister_id)

dfx canister call icrc1_ledger icrc2_approve "(record { amount = $1; spender = record{ owner = $canister } })"

dfx canister call backend pay_with_nns "(record {donationTo = 1; paymentMethod = 1; donationCategory = record {ls = 25000000; ss = 25000000; ts = 25000000; cdd = 25000000; categoryType = 0}; amount = 100_000_000; recipientId = 1})"


