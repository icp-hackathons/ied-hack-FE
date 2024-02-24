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

dfx canister call icrc1_ledger icrc1_transfer "(record { amount = $1; to = record{ owner = $canister } })"


