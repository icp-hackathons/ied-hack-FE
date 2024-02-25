import Result "mo:base/Result";
import Trie "mo:base/Trie";
import Int "mo:base/Int";
import Nat "mo:base/Nat";
import List "mo:base/List";
import Principal "mo:base/Principal";
import Text "mo:base/Text";
import Hash "mo:base/Hash";
import Array "mo:base/Array";
import Blob "mo:base/Blob";
import Nat64 "mo:base/Nat64";
import Order "mo:base/Order";
import Bool "mo:base/Bool";
import Time "mo:base/Time";
import Base32 "mo:encoding/Base32";
import Types "bitcoin/Types";

import util "util";

module {
    public type Result<T, E> = Result.Result<T, E>;
    public type School = {
        id : Nat;
        name : Text;
        location : Text;
        description : Text;
        images : List.List<Text>;
        amountDonated : Types.Satoshi;
        students : List.List<Nat>;
        donations : List.List<Text>;
    };

    public type Student = {
        id : Nat;
        name : Text;
        bio : Text;
        level : Text;
        gpa : Text;
        image : Text;
        amountDonated : Types.Satoshi;
        donations : List.List<Text>;
        schoolId : Nat;
    };

    public type SchoolOutput = {
        id : Nat;
        name : Text;
        location : Text;
        description : Text;
        images : [Text];
        amountDonated : Types.Satoshi;
        students : [Nat];
        donations : [Text];
    };
    public type StudentOutput = {
        id : Nat;
        name : Text;
        bio : Text;
        level : Text;
        gpa : Text;
        image : Text;
        amountDonated : Types.Satoshi;
        donations : [Text];
        schoolId : Nat;
    };

    type InitSchoolParams = {
        id : Nat;
        name : Text;
        location : Text;
        description : Text;
        images : [Text];
        students : [Nat];
    };

    type InitStudentParams = {
        id : Nat;
        name : Text;
        bio : Text;
        level : Text;
        gpa : Text;
        image : Text;
        schoolId : Nat;
    };

    public type Category = {
        categoryType : Nat;
        cdd : Nat; // Curriculum design and development
        ts : Nat; // Teacher support
        ss : Nat; // School supplies
        ls : Nat; // Lunch and snacks
    };

    public type Donation = {
        dti : Text;
        txId : Text;
        paymentMethod : Nat; // 0 means BTC, 1 means ckBTC
        amount : Types.Satoshi;
        category : Category;
        donater : Types.BitcoinAddress;
        recipientId : Nat;
        donationTo : Nat;
        confirmed : Bool;
    };

    public type InitParams = {
        schools : [InitSchoolParams];
        students : [InitStudentParams];
        network : Types.Network;
    };

    public type DonationParams = {
        donationTo : Nat; // 0 means school, 1 means student
        recipientId : Nat; // id of recipient
        amount : Types.Satoshi;
        donationCategory : Category;
        txId : Text;
        donater : Types.BitcoinAddress;
        paymentMethod : Nat; // 0 means BTC, 1 means CkBTC
    };

    public type DonationParamsNNS = {
        donationTo : Nat; // 0 means school, 1 means student
        recipientId : Nat; // id of recipient
        amount : Nat;
        donationCategory : Category;
        paymentMethod : Nat; // 0 means BTC, 1 means CkBTC
    };

    public type PendingDonation = {
        id : Nat;
        txId : Text;
        paymentMethod : Nat;
    };

    public func trie_key_nat(t : Nat) : Trie.Key<Nat> = {
        key = t;
        hash = Text.hash(Nat.toText(t));
    };

    public func get_dti(t : Text) : Text {
        var time = Time.now();
        var timeText = Int.toText(time);
        var dtiText = Text.concat(timeText, t);
        var dti = Base32.encode(util.textToArray(dtiText));
        // grab first 32 bytes
        let subArray = Array.subArray<Nat8>(dti, 0, 32);
        util.arrayToText(subArray);
    };

    public func trie_key_text(t : Text) : Trie.Key<Text> = {
        key = t;
        hash = Text.hash t;
    };

    public func schools_fromArray(arr : [InitSchoolParams]) : Trie.Trie<Nat, School> {
        var s = Trie.empty<Nat, School>();
        for (schoolParams in arr.vals()) {
            var school : School = {
                id = schoolParams.id;
                name = schoolParams.name;
                location = schoolParams.location;
                description = schoolParams.description;
                images = List.fromArray<Text>(schoolParams.images);
                amountDonated = 0;
                students = List.fromArray<Nat>(schoolParams.students);
                donations = List.nil();
            };
            s := Trie.put(s, trie_key_nat(school.id), Nat.equal, school).0;
        };
        s;
    };

    public func students_fromArray(arr : [InitStudentParams]) : Trie.Trie<Nat, Student> {
        var s = Trie.empty<Nat, Student>();
        for (studentParams in arr.vals()) {
            var student : Student = {
                id = studentParams.id;
                name = studentParams.name;
                bio = studentParams.bio;
                level = studentParams.level;
                gpa = studentParams.gpa;
                image = studentParams.image;
                amountDonated = 0;
                donations = List.nil();
                schoolId = studentParams.schoolId;
            };
            s := Trie.put(s, trie_key_nat(student.id), Nat.equal, student).0;
        };
        s;
    };

    public func emptyDonations() : Trie.Trie<Text, Donation> {
        Trie.empty<Text, Donation>();
    };

    public func emptyRecord() : Trie.Trie<Text, Text> {
        Trie.empty<Text, Text>();
    };

    // Bitcoin Implementation Types
    public type GetUtxosResponse = Types.GetUtxosResponse;
    public type MillisatoshiPerVByte = Types.MillisatoshiPerVByte;
    public type SendRequest = Types.SendRequest;
    public type Network = Types.Network;
    public type BitcoinAddress = Types.BitcoinAddress;
    public type Satoshi = Types.Satoshi;
    public type SendCkBTCRequest = {
        destination_address : Principal;
        amount_in_e8s : Nat;
    };
    public type TransferError = {
        #GenericError : { message : Text; error_code : Nat };
        #TemporarilyUnavailable;
        #BadBurn : { min_burn_amount : Nat };
        #Duplicate : { duplicate_of : Nat };
        #BadFee : { expected_fee : Nat };
        #CreatedInFuture : { ledger_time : Nat64 };
        #TooOld;
        #InsufficientFunds : { balance : Nat };
    };

    public type BlockIndex = Nat;

    public type TransferFromError = {
        #GenericError : { message : Text; error_code : Nat };
        #TemporarilyUnavailable;
        #InsufficientAllowance : { allowance : Nat };
        #BadBurn : { min_burn_amount : Nat };
        #Duplicate : { duplicate_of : Nat };
        #BadFee : { expected_fee : Nat };
        #CreatedInFuture : { ledger_time : Nat64 };
        #TooOld;
        #InsufficientFunds : { balance : Nat };
    };
};
