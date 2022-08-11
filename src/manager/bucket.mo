import Nat "mo:base/Nat";

actor class Bucket(user: Text) = this {

    var version: Nat = 2; // <-- Bump v2

    public query func say() : async Text {
      return "Hello World - " # user # " - v" # Nat.toText(version);
    };

}
