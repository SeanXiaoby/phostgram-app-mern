import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import hero from "../img/hero.png";
import Avatar from "./Avatar";
import Signer from "./Signer";

const Navbar = () => {
  const { user, setUser } = useState(localStorage.getItem("user"));
  const location = useLocation();

  const navigate = useNavigate();
  const handleToSignIn = () => {
    window.location.href = "/landing/signin";
  };
  const handleToSignup = () => {
    window.location.href = "/landing/signup";
  };
  const handleHome = () => {
    window.location.href = "/";
  };

  return (
    <div className="navbar">
      <div className="navbar-img-container">
        <img
          src={hero}
          alt="logo"
          className="navbar-img"
          onClick={() => handleHome()}
        />
      </div>
      {user === undefined ? (
        location.pathname === "/landing/signin" ||
        location.pathname === "/landing/signup" ? (
          <></>
        ) : (
          <Signer
            handleToSignIn={handleToSignIn}
            handleToSignup={handleToSignup}
          />
        )
      ) : (
        <Avatar />
      )}
    </div>
  );
};

export default Navbar;
