import React, { useState } from "react";
import logo from "../img/logo.png";
import Avatar from "./Avatar";
import Signer from "./Signer";

const Navbar = () => {
  const { user, setUser } = useState(localStorage.getItem("user"));

  return (
    <div class="navbar">
      <div class="navbar-img-container">
        <img src={logo} alt="logo" class="navbar-img" />
      </div>
      {user === undefined ? <Signer /> : <Avatar />}
    </div>
  );
};

export default Navbar;
