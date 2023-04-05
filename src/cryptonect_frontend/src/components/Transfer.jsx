import React, { useState } from "react";
import { cryptonect_backend } from "../../../declarations/cryptonect_backend/index";
import { Principal } from "@dfinity/principal";

function Transfer() {
  //declaring constants that have state using hook state
  const [repId, setId] = useState("");
  const [transAmount, setAmount] = useState("");
  const [isDisabled, setDisabled] = useState(false);
  const [feedBack, setfeedBack] = useState(true);
  const [feedIsHidden, setFeedHidden] = useState(true);

  async function handleClick() {
    setFeedHidden(true);
    setDisabled(true); // as soon as the btn gets clicked we will set it to true
    const rep = Principal.fromText(repId); // converting in principal data type before passing over to the backend
    const transferAmount = Number(transAmount); //converting in Number """"
    const result = await cryptonect_backend.transfer(rep, transferAmount); // finally passing over
    setfeedBack(result);
    setFeedHidden(false);
    setDisabled(false);
  }

  return (
    <div className="window white">
      <div className="transfer">
        <fieldset>
          <legend>To Account:</legend>
          <ul>
            <li>
              {/* getting the id for the transfer amount from input */}
              <input
                type="text"
                id="transfer-to-id"
                value={repId}
                onChange={(e) => setId(e.target.value)}
              />
            </li>
          </ul>
        </fieldset>
        <fieldset>
          <legend>Amount:</legend>
          <ul>
            <li>
              {/* getting the transfer amount from inputbox */}
              <input
                type="number"
                id="amount"
                value={transAmount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </li>
          </ul>
        </fieldset>
        {/* submitting both the values  */}
        <div className="trade-buttons">
          <button id="btn-transfer" onClick={handleClick} disabled={isDisabled}>
            Transfer
          </button>
          <p hidden={feedIsHidden}>{feedBack}</p>
        </div>
      </div>
    </div>
  );
}

export default Transfer;
