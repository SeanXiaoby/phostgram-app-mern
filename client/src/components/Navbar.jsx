import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import hero from "../img/hero.png";
import Avatar from "./Avatar";
import Signer from "./Signer";

const Navbar = () => {
  const { user, setUser } = useState(localStorage.getItem("session_id"));

  const location = useLocation();

  const navigate = useNavigate();
  const handleToSignIn = () => {
    navigate("/landing/signin");
  };
  const handleToSignup = () => {
    navigate("/landing/signup");
  };
  const handleHome = () => {
    navigate("/");
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
      {user === null ? (
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
