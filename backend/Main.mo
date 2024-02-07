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
import Bool "mo:base/Bool";

import Types "./Types";
import BitcoinWallet "bitcoin/BitcoinWallet";
import BitcoinApi "bitcoin/BitcoinApi";
import Utils "bitcoin/Utils";

shared (actorContext) actor class BitcoinDonations(init : Types.InitParams) = Self {
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

    // Define getter and setter functions
    func school_get(id : Nat) : ?Types.School = Trie.get(schools, Types.trie_key(id), Nat.equal);

    func school_put(id : Nat, school : Types.School) {
        schools := Trie.put(schools, Types.trie_key(id), Nat.equal, school).0;
    };

    func student_get(id : Nat) : ?Types.Student = Trie.get(students, Types.trie_key(id), Nat.equal);

    func student_put(id : Nat, student : Types.Student) {
        students := Trie.put(students, Types.trie_key(id), Nat.equal, student).0;
    };

    func donation_get(dti : Text) : ?Types.Donation = Trie.get(donations, Types.donation_key(dti), Text.equal);

    func donation_put(dti : Text, donation : Types.Donation) {
        donations := Trie.put(donations, Types.donation_key(dti), Text.equal, donation).0;
    };

    func parse_transaction_id(transactionId : Blob) : Text {
        Utils.bytesToText(Array.reverse(Blob.toArray(transactionId)));
    };

    /// Return the school with the given ID, if one exists
    public query func get_school(school_id : Nat) : async ?Types.School {
        school_get(school_id);
    };

    /// Return the student with the given ID, if one exists
    public query func get_student(student_id : Nat) : async ?Types.Student {
        student_get(student_id);
    };

    /// Return donation by dti
    public query func get_donation(dti : Text) : async ?Types.Donation {
        donation_get(dti);
    };

    public query func get_total_schools() : async Nat {
        Trie.size(schools);
    };

    public query func get_total_students() : async Nat {
        Trie.size(students);
    };

    public query func get_total_donations() : async Nat {
        Trie.size(donations);
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

    /// Check txId;
    func check_dti_not_used(dti : Text) : async Bool {
        switch (donation_get dti) {
            case null { return true };
            case (?donation) { return false };
        };
    };

    /// User Donation
    public func make_donation(inputs : Types.MakeDonationParams) : async Types.Result<Text, Text> {
        // get transaction balance from transaction id and verify them.
        let dti = Types.get_dti(inputs.txId);
        let transactionBalance : Types.Satoshi = await get_balance_of_transaction(inputs.address, inputs.txId);
        let transactionConfirmed : Bool = await check_if_transaction_is_confirmed(inputs.address, inputs.txId);
        let transactionDTINotUsed : Bool = await check_dti_not_used(dti);

        if (not transactionConfirmed) {
            return #err "Transaction not valid";
        };

        if (transactionBalance != inputs.amount) {
            return #err "Invalid Transaction amount";
        };

        if (not transactionDTINotUsed) {
            return #err "Transaction ID already exists in record";
        };

        let donationTo : Nat = inputs.donationTo;
        let donation_total = inputs.amount;
        let new_donation_total = donation_total + inputs.amount;

        if (donationTo == 0) {
            return switch (school_get(inputs.recipientId)) {
                case null { #err "Not found" };
                case (?school) {

                    // check again that txId does not already exist
                    if (List.some(school.donations, func(e : Text) : Bool = e == inputs.txId)) {
                        return #err("Already exists");
                    };

                    // create new donation
                    let donation : Types.Donation = {
                        amount = inputs.amount;
                        category = inputs.donationCategory;
                        donater = inputs.address;
                        dti = dti;
                        recipientId = inputs.recipientId;
                        txId = inputs.txId;
                    };

                    let donations = List.push(dti, school.donations);

                    let updated_school : Types.School = {
                        id = school.id;
                        name = school.name;
                        location = school.location;
                        description = school.description;
                        images = school.images;
                        amountDonated = new_donation_total;
                        students = school.students;
                        donations;
                    };

                    donation_put(donation.dti, donation);
                    school_put(school.id, updated_school);

                    // update
                    return #ok "Successful";
                };
            };
        } else {
            if (donationTo != 1) {
                return #err "invalid donation";
            };
            return switch (student_get(inputs.recipientId)) {
                case null { #err "Not found" };
                case (?student) {
                    // create new donation
                    let donation : Types.Donation = {
                        amount = transactionBalance;
                        category = inputs.donationCategory;
                        donater = inputs.address;
                        dti = dti;
                        recipientId = inputs.recipientId;
                        txId = inputs.txId;
                    };

                    let donations = List.push(dti, student.donations);

                    let updated_student : Types.Student = {
                        id = student.id;
                        name = student.name;
                        bio = student.bio;
                        level = student.level;
                        gpa = student.gpa;
                        image = student.image;
                        amountDonated = new_donation_total;
                        donations;
                        schoolId = student.schoolId;
                    };
                    donation_put(donation.dti, donation);
                    student_put(student.id, updated_student);
                    return #ok "Successful";
                };
            };
        };
    };

    /// Returns the balance of the given Bitcoin address.
    public func get_balance(address : Types.BitcoinAddress) : async Types.Satoshi {
        await BitcoinApi.get_balance(NETWORK, address);
    };

    /// Returns the UTXOs of the given Bitcoin address.
    func get_utxos(address : Types.BitcoinAddress) : async Types.GetUtxosResponse {
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
    public shared (context) func send(request : Types.SendRequest) : async Text {
        if (not Principal.equal(context.caller, actorContext.caller)) {
            return "Only the owner can set the courier API key.";
        };
        Utils.bytesToText(await BitcoinWallet.send(NETWORK, DERIVATION_PATH, KEY_NAME, request.destination_address, request.amount_in_satoshi));
    };

};
