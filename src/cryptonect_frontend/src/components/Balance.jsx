import React, { useState } from "react";
import { Principal } from "@dfinity/principal";
import { cryptonect_backend } from "../../../declarations/cryptonect_backend";

function Balance() {
  // creating constants that have state
  const [inputValue, setInput] = useState("");
  const [balanceResult, setBalance] = useState("");
  const [cryptoSymbol, setSymbol] = useState("");
  const [isHidden, setHidden] = useState(true);

  // function responsible for sending the input text as Principal
  async function handleClick() {
    // console.log(inputValue);
    const principal = Principal.fromText(inputValue);
    const balance = await cryptonect_backend.balanceOf(principal);
    setBalance(balance.toLocaleString());
    setSymbol(await cryptonect_backend.getSymbol());
    setHidden(false);
    // setBalance(balance);
  }

  return (
    <div className="window white">
      <label>Check account token balance:</label>
      <p>
        <input
          id="balance-principal-id"
          type="text"
          placeholder="Enter a Principal ID"
          value={inputValue}
          onChange={(e) => setInput(e.target.value)}
        />
      </p>
      <p className="trade-buttons">
        <button id="btn-request-balance" onClick={handleClick}>
          Check Balance
        </button>
      </p>
      <p hidden={isHidden}>
        This account has a balance of {balanceResult} {cryptoSymbol}.
      </p>
    </div>
  );
}

export default Balance;
