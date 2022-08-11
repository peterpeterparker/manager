import Cycles "mo:base/ExperimentalCycles";
import Principal "mo:base/Principal";
import Error "mo:base/Error";

import IC "./ic.types";

import Bucket "./bucket";

actor Main {
  private stable var canisterId: ?Principal = null;

  private let ic : IC.Self = actor "aaaaa-aa";

  public shared({ caller }) func init(): async (Principal) {
    Cycles.add(1_000_000_000_000);
    let b = await Bucket.Bucket("User1");

    canisterId := ?(Principal.fromActor(b));

    switch (canisterId) {
      case null {
        throw Error.reject("Bucket init error");
      };
      case (?canisterId) {
        let self: Principal = Principal.fromActor(Main);

        let controllers: ?[Principal] = ?[canisterId, caller, self];

        await ic.update_settings(({canister_id = canisterId; settings = {
            controllers = controllers;
            freezing_threshold = null;
            memory_allocation = null;
            compute_allocation = null;
        }}));

        return canisterId;
      };
    };
  };

  public query func getCanisterId() : async ?Principal {
    canisterId
  };

  public func installCode(canisterId: Principal, arg: Blob, wasmModule: Blob): async() {
      await ic.install_code({
          arg = arg;
          wasm_module = wasmModule;
          mode = #upgrade;
          canister_id = canisterId;
      });
  };
};
