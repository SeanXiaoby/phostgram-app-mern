import React, { useState } from "react";
import hero from "../img/hero.png";
import Avatar from "./Avatar";
import Signer from "./Signer";

const Navbar = () => {
  const { user, setUser } = useState(localStorage.getItem("user"));

  return (
    <div className="navbar">
      <div className="navbar-img-container">
        <img src={hero} alt="logo" className="navbar-img" />
      </div>
      {user === undefined ? <Signer /> : <Avatar />}
    </div>
  );
};

export default Navbar;
