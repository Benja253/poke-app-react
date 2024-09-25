import React from "react";
import "./styles/Header.css";
import { useNavigate } from "react-router-dom";

const Header = () => {

  const navigate = useNavigate()

  const handleClick = () => {
    navigate('/')
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  return (
    <header className="header">
      <div onClick={handleClick} className="header__logo">
        <img className="header__logo__img" src="img/logo-pokeapp.png" alt="logo PokeApp" />
      </div>
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
