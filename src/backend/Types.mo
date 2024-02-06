import Result "mo:base/Result";
import Trie "mo:base/Trie";
import Int "mo:base/Int";
import Nat "mo:base/Nat";
import List "mo:base/List";
import Principal "mo:base/Principal";
import Text "mo:base/Text";
import Hash "mo:base/Hash";
import Blob "mo:base/Blob";

import Types "bitcoin/Types";

module {
    public type School = {
        id : Nat;
        name : Text;
        address : Text;
        description : Text;
        image : Text;
        amountDonated : Nat;
        students : List.List<Nat>;
        donations : List.List<Text>;
    };

    public type Student = {
        id : Nat;
        name : Text;
        bio : Text;
        level : Text;
        gpa : Int;
        amountDonated : Nat;
        donations : List.List<Text>;
        schoolId : Nat;
    };

    public type Category = {
        cdd : Nat; // Curriculum design and development
        ts : Nat; // Teacher support
        ss : Nat; // School supplies
        ls : Nat; // Lunch and snacks
    };

    public type Donation = {
        id : Text;
        amount : Nat;
        category : Category;
        donater : Text;
        txID : Text;
    };

    public type InitParams = {
        schools : [School];
        students : [Student];
        network : Types.Network;
    };

    public func trie_key(t : Nat) : Trie.Key<Nat> = {
        key = t;
        hash = Text.hash(Nat.toText(t));
    };

    public func donation_key(t : Text) : Trie.Key<Text> = {
        key = t;
        hash = Text.hash t;
    };

    public func schools_fromArray(arr : [School]) : Trie.Trie<Nat, School> {
        var s = Trie.empty<Nat, School>();
        for (school in arr.vals()) {
            s := Trie.put(s, trie_key(school.id), Nat.equal, school).0;
        };
        s;
    };

    public func students_fromArray(arr : [Student]) : Trie.Trie<Nat, Student> {
        var s = Trie.empty<Nat, Student>();
        for (student in arr.vals()) {
            s := Trie.put(s, trie_key(student.id), Nat.equal, student).0;
        };
        s;
    };

    public func emptyDonations() : Trie.Trie<Text, Donation> {
        Trie.empty<Text, Donation>();
    };

    // Bitcoin Implementation Types
    public type GetUtxosResponse = Types.GetUtxosResponse;
    public type MillisatoshiPerVByte = Types.MillisatoshiPerVByte;
    public type SendRequest = Types.SendRequest;
    public type Network = Types.Network;
    public type BitcoinAddress = Types.BitcoinAddress;
    public type Satoshi = Types.Satoshi;
};
