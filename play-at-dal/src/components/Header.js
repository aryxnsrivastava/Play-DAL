import React from "react";
import "../css/styles.css"; 
import dalLogo from "../assets/dal-logo.png";

const Header = () => {
  return (
    <header className="header">
      <img src={dalLogo} alt="Dalhousie Logo" className="logo" />
      <h1 className="site-title">PLAY@DAL</h1>
      <button className="login-button">LOGIN</button>
    </header>
  );
};

export default Header;
