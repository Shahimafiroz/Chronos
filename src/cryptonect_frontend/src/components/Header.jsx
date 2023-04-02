import React from "react";
import logo from "../../assets/logo2.png";

function Header() {
  return (
    <header>
      <div className="blue window" id="logo">
        {/* <h1>
          <span role="img" aria-label="tap emoji">
            💎
          </span>
          Crypton
        </h1> */}
        <img src={logo} alt="logo" />
      </div>
    </header>
  );
}

export default Header;
