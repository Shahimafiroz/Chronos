import React, { useState } from "react";
import { cryptonect_backend } from "../../../declarations/cryptonect_backend/index";

function Faucet() {
  // declaring state constants
  const [isDisabled, setDisabled] = useState(false); // disabling the button untill execution is complete to stop messing up the backend
  const [buttonText, setText] = useState("Gimme gimme"); //Giving the message to the user to not be greedy

  async function handleClick(event) {
    setDisabled(true); // once the payOUt is started
    const result = await cryptonect_backend.payOut();
    // setDisabled(false); // once the payout is complete // but we wont allow this (uncomment this) as it would give the user access to endless tokens
    setText(result);
  }

  return (
    <div className="blue window">
      <h2>
        <span role="img" aria-label="tap emoji">
          🚰
        </span>
        Faucet
      </h2>
      <label>
        Get your free Crypton tokens here! Claim 10,000 CHRONOS coins to your
        account.
      </label>
      <p className="trade-buttons">
        <button id="btn-payout" onClick={handleClick} disabled={isDisabled}>
          {buttonText}
        </button>
      </p>
    </div>
  );
}

export default Faucet;
