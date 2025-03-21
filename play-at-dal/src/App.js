import React from "react";
import Header from "./components/Header";
import "./css/styles.css"; 

const LandingPage = () => {
  return (
    <div className="landing-container">
      <div className="landing-background"></div>
      <Header />
      <div className="main-content">
        <h2>Welcome to Play@Dal</h2>
        <p>Where friendships begin</p>
      </div>
    </div>
  );
};

export default LandingPage;
