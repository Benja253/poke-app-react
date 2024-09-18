import React from "react";
import "./styles/Header.css";

const Header = () => {
  return (
    <header className="header">
      <div className="header__white">
        <div className="header__red">
          <div className="header__circle">
            <div className="header__circle__int"></div>
          </div>
        </div>
        <div className="header__black"></div>
      </div>
    </header>
  );
};

export default Header;
