import React from "react";
import { useNavigate } from "react-router-dom";

const Signer = ({ handleToSignIn, handleToSignup }) => {
  return (
    <div className="signer-container">
      <div className="sign-up-container">
        <p id="btn-sign-up" onClick={() => handleToSignup()}>
          sign up
        </p>
      </div>
      <button
        type="button"
        className="btn"
        id="btn-sign-in"
        onClick={() => handleToSignIn()}
      >
        Sign In
      </button>
    </div>
  );
};

export default Signer;
