import Principal "mo:base/Principal";
import HashMap "mo:base/HashMap";
import Nat "mo:base/Nat";
import Text "mo:base/Text";
import Debug "mo:base/Debug";



actor Cryptonect_backend {
//VARIABLES
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
 // canister code for symbol
  public query func getSymbol() : async Text{
    return symbol;
  };
// Canister code for faucet functionality
   public shared(msg) func payOut() : async Text {

      if (balances.get(msg.caller) == null){ // if this condition is true it means the user dosent exist in our ledger
        
        // Debug.print(debug_show(msg.caller));
      
        let amount = 10000;    
        let result = await transfer(msg.caller , amount);
        return result;
      }else{//else he exist 
        return "Dont be greedy! you have already claimed your share of CHRONOS!"
      }
    }; 
// canister code for transfer fuctionality 
// objective :- 1. fromAccount - transferAmount || 2. toAccount + transferAmount
// There is not "from" as fromAccount in the below function because "from" is ----> message caler "msg.caller"

    public shared(msg) func transfer( to : Principal , transferAmount : Nat) : async Text{
     
       let fromBalance =  await balanceOf(msg.caller);
       if(fromBalance > transferAmount){
        //Subtract from me 
           let newFromBalance : Nat = fromBalance - transferAmount; // 1. fromAccount - transferAmoun
           balances.put(msg.caller , newFromBalance); //updating the newBalance in the hashmap
       // add to recipient's balance
           let toBalance =  await balanceOf(to);
           let newToBalance = toBalance + transferAmount;   
           balances.put( to , newToBalance);
           return("Transaction Sucessfull!!"); 
       }else{
        return("Im Sorry!! You dont have tokens to transfer BRO !!!! ");
       }// else ends 
    }// transfer ends


   




}