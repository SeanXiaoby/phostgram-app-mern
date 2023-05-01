import React from "react";

const SigninForm = ({ changeType }) => {
  return (
    <div className="form landing-form">
      <div className="title">
        <h2>Sign in</h2>
        <div className="title-underline"></div>
      </div>
      <div className="landing-form-content">
        <div className="form-row">
          <label htmlFor="signin-username" className="form-label">
            username / email
          </label>
          <input
            type="text"
            id="signin-username"
            className="form-input"
          ></input>
        </div>

        <div className="form-row">
          <label htmlFor="signin-password" className="form-label">
            password
          </label>
          <input
            type="password"
            id="signin-password"
            className="form-input"
          ></input>
        </div>
      </div>
      <button type="button" className="btn btn-block">
        Sign in
      </button>
      <p onClick={() => (window.location.href = "/landing/signup")}>Sign up</p>
    </div>
  );
};

export default SigninForm;
