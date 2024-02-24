import Trie "mo:base/Trie";
import Principal "mo:base/Principal";
import Option "mo:base/Option";
import Iter "mo:base/Iter";
import Nat "mo:base/Nat";
import Nat64 "mo:base/Nat64";
import Result "mo:base/Result";
import Array "mo:base/Array";
import Error "mo:base/Error";
import ICRaw "mo:base/ExperimentalInternetComputer";
import List "mo:base/List";
import Time "mo:base/Time";
import Text "mo:base/Text";
import Blob "mo:base/Blob";
import Bool "mo:base/Bool";
import Buffer "mo:base/Buffer";
import Debug "mo:base/Debug";
import None "mo:base/None";
import ckBTCLedger "ic:mxzaz-hqaaa-aaaar-qaada-cai";
import ckBTCIndex "ic:n5wcd-faaaa-aaaar-qaaea-cai";

import Int "mo:base/Int";

import Types "./Types";
import BitcoinWallet "bitcoin/BitcoinWallet";
import BitcoinApi "bitcoin/BitcoinApi";
import Utils "bitcoin/Utils";

shared (actorContext) actor class BitcoinDonations(init : Types.InitParams) = Self {

    stable var schools = Types.schools_fromArray(init.schools);
    stable var students = Types.students_fromArray(init.students);
    stable var donations = Types.emptyDonations();
    stable var pending_donations = Types.emptyDonations();
    var logData = Buffer.Buffer<Text>(0);

    // The Bitcoin network to connect to.
    //
    // When developing locally this should be `regtest`.
    // When deploying to the IC this should be `testnet`.
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
    func school_get(id : Nat) : ?Types.School = Trie.get(schools, Types.trie_key_nat(id), Nat.equal);

    func school_put(id : Nat, school : Types.School) {
        schools := Trie.put(schools, Types.trie_key_nat(id), Nat.equal, school).0;
    };

    // for students
    func student_get(id : Nat) : ?Types.Student = Trie.get(students, Types.trie_key_nat(id), Nat.equal);

    func student_put(id : Nat, student : Types.Student) {
        students := Trie.put(students, Types.trie_key_nat(id), Nat.equal, student).0;
    };

    // for donations
    func donation_get(dti : Text) : ?Types.Donation = Trie.get(donations, Types.trie_key_text(dti), Text.equal);

    func donation_put(dti : Text, donation : Types.Donation) {
        donations := Trie.put(donations, Types.trie_key_text(dti), Text.equal, donation).0;
    };

    // pending donation record
    // func pending_donations_get(dti : Text) : ?Types.Donation = Trie.get(pending_donations, Types.trie_key_text(dti), Text.equal);

    func pending_donations_put(dti : Text, donation : Types.Donation) {
        pending_donations := Trie.put(pending_donations, Types.trie_key_text(dti), Text.equal, donation).0;
    };

    func pending_donation_del(dti : Text) {
        pending_donations := Trie.remove(pending_donations, Types.trie_key_text(dti), Text.equal).0;
    };

    /// Return the school with the given ID, if one exists
    public query func get_school(school_id : Nat) : async Types.Result<Types.SchoolOutput, Text> {
        switch (school_get(school_id)) {
            case (?school) {
                #ok {
                    id = school.id;
                    name = school.name;
                    location = school.location;
                    description = school.description;
                    images = List.toArray<Text>(school.images);
                    amountDonated = school.amountDonated;
                    students = List.toArray<Nat>(school.students);
                    donations = List.toArray<Text>(school.donations);
                };
            };
            case null {
                #err "Not found";
            };
        };
    };

    /// Return the student with the given ID, if one exists
    public query func get_student(student_id : Nat) : async Types.Result<Types.StudentOutput, Text> {
        switch (student_get(student_id)) {
            case (?student) {
                #ok {
                    id = student.id;
                    name = student.name;
                    bio = student.bio;
                    level = student.level;
                    gpa = student.gpa;
                    image = student.image;
                    amountDonated = student.amountDonated;
                    donations = List.toArray<Text>(student.donations);
                    schoolId = student.schoolId;
                };
            };
            case null {
                #err "Not found";
            };
        };
    };

    /// Return donation by dti
    public query func get_donation(dti : Text) : async Types.Result<Types.Donation, Text> {
        switch (donation_get(dti)) {
            case (?donation) {
                #ok donation;
            };
            case null {
                #err "Not found";
            };
        };
    };

    /// Return the list of all donations
    public query func list_donations() : async [Types.Donation] {
        Iter.toArray(Iter.map(Trie.iter(donations), func(kv : (Text, Types.Donation)) : Types.Donation = kv.1));
    };

    /// Return the list of all pending donations
    func list_pending_donations() : async [Types.Donation] {
        Iter.toArray(Iter.map(Trie.iter(pending_donations), func(kv : (Text, Types.Donation)) : Types.Donation = kv.1));
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

    // check txId;
    func check_dti_not_used(dti : Text) : async Bool {
        switch (donation_get dti) {
            case null { return true };
            case (?donation) { return false };
        };
    };

    public func create_donation_record(inputs : Types.DonationParams) : async Types.Result<Text, Text> {
        // generate dti
        let dti = Types.get_dti(inputs.txId);

        let transactionDTINotUsed : Bool = await check_dti_not_used(dti);

        // check that dti is not already existing
        if (not transactionDTINotUsed) {
            return #err "Transaction ID already exists in record";
        };

        let paymentMethod = inputs.paymentMethod;
        let donationTo = inputs.donationTo;

        // check that the recipient parameters are valid
        if (donationTo == 0) {
            switch (school_get(inputs.recipientId)) {
                case null {
                    return #err("School record for id not found" #debug_show (inputs.recipientId));
                };
                case (?school) {
                    // do nothing
                };
            };
        } else {
            if (donationTo != 1) {
                return #err "invalid donation recipient Id";
            };
            switch (student_get(inputs.recipientId)) {
                case null {
                    return #err("Student record for id not found" #debug_show (inputs.recipientId));
                };
                case (?student) {
                    // do nothing
                };
            };
        };

        // create new donation record
        let donation : Types.Donation = {
            dti = dti;
            txId = inputs.txId;
            paymentMethod = inputs.paymentMethod;
            confirmed = false;
            amount = inputs.amount;
            category = inputs.donationCategory;
            donater = inputs.donater;
            recipientId = inputs.recipientId;
            donationTo;
        };

        // get donation count and use as key for pending donation
        let donationCount = await get_total_donations();

        // store donation
        donation_put(dti, donation);

        // store donation in pending record
        pending_donations_put(dti, donation);
        return #ok dti;
    };

    // Check for new transactions and update the donation records once the transaction has been confirmed.
    system func timer(setGlobalTimer : Nat64 -> ()) : async () {
        let next = Nat64.fromIntWrap(Time.now()) + 20_000_000_000; // 20 seconds
        setGlobalTimer(next);
        await checkDonations();
    };

    // Log a message. Log output is capped at 100 items.
    func log(text : Text) {
        Debug.print(text);
        logData.reserve(logData.size() + 1);
        logData.insert(0, text);
        // Cap the log at 100 items
        if (logData.size() == 100) {
            let x = logData.removeLast();
        };
        return;
    };

    func get_balance_of_transaction(utxoResponse : Types.GetUtxosResponse, txId : Text) : async Types.Satoshi {
        for (utxo in utxoResponse.utxos.vals()) {
            let transactionId = parse_transaction_id(utxo.outpoint.txid);
            if (transactionId == txId) {
                return utxo.value;
            };
        };
        return 0;
    };

    func confirmBTCDonation(donation : Types.Donation) : async (Bool, Text) {
        let address = await get_p2pkh_address();

        let utxoResponse = await get_utxos(address);

        let transactionBal = await get_balance_of_transaction(utxoResponse, donation.txId);

        if (transactionBal == 0) return (false, "transaction id not found yet");

        return (true, "confirmed");
    };

    func confirmCkBtcDonation(donation : Types.Donation) : async (Bool, Text) {
        var canister_id = await get_canister_id();
        var response = await ckBTCIndex.get_account_transactions({
            account = { owner = canister_id; subaccount = null };
            start = Nat.fromText(donation.txId);
            max_results = 1;
        });

        switch (response) {
            case (#Ok(txn)) {
                if (txn.transactions[0].transaction.kind == "transfer") {
                    let t = txn.transactions[0].transaction;
                    return switch (t.transfer) {
                        case (?transfer) {
                            let to = transfer.to.owner;
                            let from = transfer.from.owner;

                            if (from != Principal.fromText(donation.donater)) {
                                return (false, "unconfirmed");
                            };

                            (true, "confirmed");
                        };
                        case null {
                            // No action required if transfer is null
                            (false, "unconfirmed");
                        };
                    };
                } else {
                    return (false, "unconfirmed");
                };
            };
            case (#Err(msg)) {
                // No action required

                return (false, "unconfirmed");
            };
        };
    };

    // check donations
    func checkDonations() : async () {
        let pending_dlist = await list_pending_donations();
        if (Array.size(pending_dlist) > 0) {
            if (pending_dlist[0].paymentMethod == 0) {
                let (status, message) = await confirmBTCDonation(pending_dlist[0]);

                if (status) {
                    let result = await register_donation(pending_dlist[0]);
                    let response_message = switch (result) {
                        case (#err(msg)) {
                            msg;
                        };
                        case (#ok(msg)) {
                            msg;
                        };
                    };
                    // save response message in log;
                    log("status for" #debug_show (pending_dlist[0].txId, response_message));
                };

            } else {
                // ckbtc confirmation
                let (status, message) = await confirmCkBtcDonation(pending_dlist[0]);

                if (status) {
                    let result = await register_donation(pending_dlist[0]);
                    let response_message = switch (result) {
                        case (#err(msg)) {
                            msg;
                        };
                        case (#ok(msg)) {
                            msg;
                        };
                    };
                    // save response message in log;
                    log("status for" #debug_show (pending_dlist[0].txId, response_message));
                };

            };
        };
    };

    /// User Donation
    func register_donation(donation : Types.Donation) : async Types.Result<Text, Text> {
        // get transaction balance from transaction id and verify them.
        let donationTo : Nat = donation.donationTo;
        if (donationTo == 0) {
            switch (school_get(donation.recipientId)) {
                case null {
                    return #err("School record for id not found" #debug_show (donation.recipientId));
                };
                case (?school) {
                    // push donation dti to schools donation
                    let donations = List.push(donation.dti, school.donations);

                    // update records
                    let new_donation_total = school.amountDonated + donation.amount;
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

                    school_put(school.id, updated_school);
                };
            };
        } else {
            if (donationTo != 1) {
                return #err "invalid donation recipient";
            };
            switch (student_get(donation.recipientId)) {
                case null {
                    return #err("Studetnt record for id not found" #debug_show (donation.recipientId));
                };
                case (?student) {
                    // push donation dti to schools donation
                    let donations = List.push(donation.dti, student.donations);

                    // update records
                    let new_donation_total = student.amountDonated + donation.amount;
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
                    student_put(student.id, updated_student);
                };
            };
        };

        // update donation confirmation status
        let updated_donation : Types.Donation = {
            dti = donation.dti;
            txId = donation.txId;
            paymentMethod = donation.paymentMethod;
            confirmed = true;
            amount = donation.amount;
            category = donation.category;
            donater = donation.donater;
            recipientId = donation.recipientId;
            donationTo = donation.donationTo;
        };

        donation_put(donation.dti, updated_donation);

        // next delete donation from pending donations
        pending_donation_del(donation.dti);

        #ok "Succesful Donation";
    };

    public shared (context) func pay_with_nns(inputs : Types.DonationParamsNNS) : async Types.Result<Text, Types.TransferFromError> {

        let paymentMethod = inputs.paymentMethod;

        let donationTo = inputs.donationTo;

        // check that the recipient parameters are valid
        if (donationTo == 0) {
            switch (school_get(inputs.recipientId)) {
                case null {
                    return #err(#GenericError { message = "School record for id not found" #debug_show (inputs.recipientId); error_code = 20 });
                };
                case (?school) {
                    // do nothing
                };
            };
        } else {
            if (donationTo != 1) {
                return #err(#GenericError { message = "invalid donation recipient Id"; error_code = 20 });
            };
            switch (student_get(inputs.recipientId)) {
                case null {
                    return #err(#GenericError { message = "Student record for id not found" #debug_show (inputs.recipientId); error_code = 20 });
                };
                case (?student) {
                    // do nothing
                };
            };
        };

        // carry out the transfer from function
        // ensure that user approves the amount to be sent before calling this function

        var canister_id = await get_canister_id();

        var fee = await ckBTCLedger.icrc1_fee();

        let response = await ckBTCLedger.icrc2_transfer_from({
            from = { owner = context.caller; subaccount = null };
            to = { owner = canister_id; subaccount = null };
            fee = ?fee;
            memo = null;
            amount = Nat64.toNat(inputs.amount);
            spender_subaccount = null;
            from_subaccount = null;
            created_at_time = null;
        });

        return switch (response) {
            case (#Err(error)) {
                return #err error;
            };
            case (#Ok(blockIndex)) {

                let dti = Types.get_dti(Nat.toText(blockIndex));

                // create new donation record
                let donation : Types.Donation = {
                    dti;
                    txId = Nat.toText(blockIndex);
                    paymentMethod = inputs.paymentMethod;
                    confirmed = false;
                    amount = inputs.amount;
                    category = inputs.donationCategory;
                    donater = Principal.toText(context.caller);
                    recipientId = inputs.recipientId;
                    donationTo;
                };

                // get donation count and use as key for pending donation
                let donationCount = await get_total_donations();

                // store donation
                donation_put(dti, donation);

                // store donation in pending record
                pending_donations_put(dti, donation);

                return #ok dti;
            };
        };

    };

    /// Returns the balance of the given Bitcoin address.
    public func get_btc_balance(address : Types.BitcoinAddress) : async Types.Satoshi {
        await BitcoinApi.get_balance(NETWORK, address);
    };

    /// Returns the ckbtc of the given canister address.
    public func get_ckBtc_balance() : async Nat {
        var canister_id = await get_canister_id();
        await ckBTCLedger.icrc1_balance_of({
            owner = canister_id;
            subaccount = null;
        });
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

    // Get latest log items. Log output is capped at 100 items.
    public query func get_logs() : async [Text] {
        Buffer.toArray(logData);
    };

    // Returns the canister ID
    public func get_canister_id() : async Principal {
        return Principal.fromActor(Self);
    };

    /// Sends the given amount of bitcoin from this canister to the given address.
    /// Returns the transaction ID.
    public shared (context) func withdraw_btc(request : Types.SendRequest) : async Text {
        if (not Principal.equal(context.caller, actorContext.caller)) {
            return "Only the owner can withdraw btc from canister.";
        };
        Utils.bytesToText(await BitcoinWallet.send(NETWORK, DERIVATION_PATH, KEY_NAME, request.destination_address, request.amount_in_satoshi));
    };

    /// Sends the given amount of ckbtc from this canister to the given address.
    /// Returns the transaction ID.
    public shared (context) func withdraw_ckbtc(request : Types.SendCkBTCRequest) : async Types.Result<Types.BlockIndex, Types.TransferError> {
        if (not Principal.equal(context.caller, actorContext.caller)) {
            return #err(#GenericError { message = "Only the owner can withdraw ckbtc from canister."; error_code = 20 });
        };

        var canister_id = await get_canister_id();

        var fee = await ckBTCLedger.icrc1_fee();

        let response = await ckBTCLedger.icrc1_transfer({
            to = { owner = canister_id; subaccount = null };
            fee = ?fee;
            memo = null;
            amount = request.amount_in_e8s;
            from_subaccount = null;
            created_at_time = null;
        });

        return switch (response) {
            case (#Err(error)) {
                return #err error;
            };
            case (#Ok(blockIndex)) {
                return #ok blockIndex;
            };
        };
    };

    func parse_transaction_id(transactionId : Blob) : Text {
        Utils.bytesToText(Array.reverse(Blob.toArray(transactionId)));
    };
};
