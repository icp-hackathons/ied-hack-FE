import Trie "mo:base/Trie";
import Principal "mo:base/Principal";
import Option "mo:base/Option";
import Iter "mo:base/Iter";
import Nat "mo:base/Nat";
import Result "mo:base/Result";
import Array "mo:base/Array";
import Error "mo:base/Error";
import ICRaw "mo:base/ExperimentalInternetComputer";
import List "mo:base/List";
import Time "mo:base/Time";
import Text "mo:base/Text";
import Blob "mo:base/Blob";

import Types "./Types";
import BitcoinWallet "bitcoin/BitcoinWallet";
import BitcoinApi "bitcoin/BitcoinApi";
import Utils "bitcoin/Utils";

shared actor class BitcoinDonations(init : Types.InitParams) = Self {
    stable var schools = Types.schools_fromArray(init.schools);
    stable var students = Types.students_fromArray(init.students);
    stable var donations = Types.emptyDonations();

    // The Bitcoin network to connect to.
    //
    // When developing locally this should be `regtest`.
    // When deploying to the IC this should be `testnet`.
    // `mainnet` is currently unsupported.
    stable let NETWORK : Types.Network = init.network;

    // The derivation path to use for ECDSA secp256k1.
    let DERIVATION_PATH : [[Nat8]] = [];

    // The ECDSA key name.
    let KEY_NAME : Text = switch NETWORK {
        // For local development, we use a special test key with dfx.
        case (#regtest) "dfx_test_key";
        // On the IC we're using a test ECDSA key.
        case _ "test_key_1";
    };

    /// Returns a registered school by its id
    func get_schools(id : Nat) : ?Types.School = Trie.get(schools, Types.trie_key(id), Nat.equal);

    /// Returns a registered student by its id
    func get_students(id : Nat) : ?Types.Student = Trie.get(students, Types.trie_key(id), Nat.equal);

    /// Returns a donation record by its id
    func donation_get(txID : Text) : ?Types.Donation = Trie.get(donations, Types.donation_key(txID), Text.equal);

    /// stores a donation
    func donation_put(txID : Text, donation : Types.Donation) {
        donations := Trie.put(donations, Types.donation_key(txID), Text.equal, donation).0;
    };

    /// parse the transactionId from blob
    func parse_transaction_id(transactionId : Blob) : Text {
        Utils.bytesToText(Array.reverse(Blob.toArray(transactionId)));
    };

    /// check if transaction has been confirmed
    func check_if_transaction_is_confirmed(address : Types.BitcoinAddress, transactionIdToCheck : Text) : async Bool {
        let utxoResponse = await get_utxos(address);
        for (utxo in utxoResponse.utxos.vals()) {
            let transactionId = parse_transaction_id(utxo.outpoint.txid);
            if (transactionId == transactionIdToCheck) {
                return true;
            };
        };
        return false;
    };

    /// get balance from the transaction
    func get_balance_of_transaction(address : Types.BitcoinAddress, transactionIdToCheck : Text) : async Types.Satoshi {
        let utxoResponse = await get_utxos(address);
        for (utxo in utxoResponse.utxos.vals()) {
            let transactionId = parse_transaction_id(utxo.outpoint.txid);
            if (transactionId == transactionIdToCheck) {
                return utxo.value;
            };
        };
        return 0;
    };

    /// Returns the balance of the given Bitcoin address.
    public func get_balance(address : Types.BitcoinAddress) : async Types.Satoshi {
        await BitcoinApi.get_balance(NETWORK, address);
    };

    /// Returns the UTXOs of the given Bitcoin address.
    public func get_utxos(address : Types.BitcoinAddress) : async Types.GetUtxosResponse {
        await BitcoinApi.get_utxos(NETWORK, address);
    };

    /// Returns the 100 fee percentiles measured in millisatoshi/vbyte.
    /// Percentiles are computed from the last 10,000 transactions (if available).
    public func get_current_fee_percentiles() : async [Types.MillisatoshiPerVByte] {
        await BitcoinApi.get_current_fee_percentiles(NETWORK);
    };

    /// Returns the P2PKH address of this canister at a specific derivation path.
    public func get_p2pkh_address() : async Types.BitcoinAddress {
        await BitcoinWallet.get_p2pkh_address(NETWORK, KEY_NAME, DERIVATION_PATH);
    };

    /// Sends the given amount of bitcoin from this canister to the given address.
    /// Returns the transaction ID.
    public func send(request : Types.SendRequest) : async Text {
        Utils.bytesToText(await BitcoinWallet.send(NETWORK, DERIVATION_PATH, KEY_NAME, request.destination_address, request.amount_in_satoshi));
    };

};
