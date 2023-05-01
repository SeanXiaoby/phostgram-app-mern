import React from "react";

const SignupForm = ({ changeType }) => {
  return (
    <div className="form landing-form">
      <div className="title">
        <h2>Sign up</h2>
        <div className="title-underline"></div>
      </div>
      <div className="landing-form-content">
        <div className="form-row">
          <label htmlFor="signup-email" className="form-label">
            email
          </label>
          <input
            type="text"
            id="signup-email"
            className="form-input"
            placeholder="sample.john.doe@usc.edu"
          ></input>
        </div>

        <div className="form-row">
          <label htmlFor="signup-username" className="form-label">
            username
          </label>
          <input
            type="text"
            id="signup-username"
            className="form-input"
            placeholder="Give yourself a cool name like: JohnDoe..."
          ></input>
        </div>

        <div className="form-row">
          <label htmlFor="signup-password" className="form-label">
            password
          </label>
          <input
            type="password"
            id="signup-password"
            className="form-input"
            placeholder="Just a simple password..."
          ></input>
        </div>

        <div className="form-row">
          <label htmlFor="signup-comfirm" className="form-label">
            confirm password
          </label>
          <input
            type="password"
            id="signup-comfirm"
            className="form-input"
            placeholder="Just type the same thing again..."
          ></input>
        </div>
      </div>
      <button type="button" className="btn btn-block">
        Sign up
      </button>
      <p onClick={() => (window.location.href = "/landing/signin")}>Sign in</p>
    </div>
  );
};

export default SignupForm;
