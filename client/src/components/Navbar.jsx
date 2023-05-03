import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { sample_users } from "../data/data";
import hero from "../img/hero.png";
import Avatar from "./Avatar";
import Signer from "./Signer";

const Navbar = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (sessionStorage.getItem("session_id") !== null) {
      setUser(sample_users[0]);
    } else {
      setUser(null);
    }
  }, []);

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
