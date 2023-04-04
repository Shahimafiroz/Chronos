import Principal "mo:base/Principal";
import HashMap "mo:base/HashMap";
import Nat "mo:base/Nat";


actor Token {

// Using hashmaps to store token balances

  var owner : Principal = Principal.fromText("54llv-6zbxb-h4jls-dmnli-4b4wp-ngz6d-7u3wm-yj3ey-wl465-yrj5s-nqe");
  var totalSupply : Nat = 3000000000 ; //3 billion
  var symbol : Text = "CHRONOS";
  var  balances = HashMap.HashMap<Principal, Nat>( 1 , Principal.equal ,Principal.hash);

  balances.put(owner , totalSupply);
//function for balance
  public query func balanceOf (who:Principal): async Nat{
       
       let blnce : Nat = switch (balances.get(who)){
          case null 0;
          case (?result) result;
        };
        return blnce;


    };
 //





}