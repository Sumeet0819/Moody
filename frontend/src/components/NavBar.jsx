import React from 'react';
import "./NavBar.css"; // Import CSS file

const NavBar = () => {
  return (
    <div className="navbar">
      <div className="navbar-left">
        <div className="logo"></div>
        <h2 className="navbar-title">Moody Player</h2>
      </div>
    </div>
  );
};

export default NavBar;
