import React, { useState } from "react";
import {
  isValidEmail,
  isValidUsername,
  isValidPassword,
} from "../utils/util_format";
import { serverInfo } from "../data/serverInfo";

const SignupForm = ({ changeType }) => {
  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState({ success: false, message: "" });
  const [received, setReceived] = useState(false);

  const fetchData = async (url, path, input_data) => {
    const response = await fetch(url + path, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(input_data),
    });
    const statusCode = response.status;
    const data = await response.json();
    return { statusCode, data };
  };

  const handleSignUp = async () => {
    setSubmitted(true);

    console.log(serverInfo);

    const email = document.getElementById("signup-email").value;
    const username = document.getElementById("signup-username").value;
    const password = document.getElementById("signup-password").value;
    const confirm = document.getElementById("signup-comfirm").value;

    if (!isValidEmail(email)) {
      setStatus({ success: false, message: "Invalid email format" });
      setReceived(true);
      return;
    }

    if (!isValidUsername(username)) {
      setStatus({ success: false, message: "Invalid username format" });
      setReceived(true);
      return;
    }

    if (!isValidPassword(password)) {
      setStatus({ success: false, message: "Invalid password" });
      setReceived(true);
      return;
    }

    if (password !== confirm) {
      setStatus({ success: false, message: "Passwords do not match!" });
      setReceived(true);
      return;
    }

    const user_data = {
      email: email,
      username: username,
      password: password,
    };

    let statusCode = 500,
      data = {};

    try {
      const res = await fetchData(
        serverInfo.url,
        "/api/auth/register",
        user_data
      );

      statusCode = res.statusCode;
      data = res.data;

      setReceived(true);
    } catch (error) {
      setStatus({
        success: false,
        message: "Something went wrong! Please try again later!",
      });
    }

    if (statusCode === 200) {
      setStatus({
        success: true,
        message: "Sign up successful! Directing to Sign-in page in 3 seconds!",
      });
      setTimeout(() => {
        document.getElementById("to-signin").click();
      }, 3000);
    } else {
      if (statusCode === 400) {
        setStatus({
          success: false,
          message: "Input information is incorrect!",
        });
      } else if (statusCode === 409) {
        setStatus({
          success: false,
          message: "Username or email already exists!",
        });
      } else {
        setStatus({
          success: false,
          message: "Something went wrong! Please try again later!",
        });
      }
    }
  };

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

      {submitted &&
        received &&
        (status.success ? (
          <div className="alert alert-success">{status.message}</div>
        ) : (
          <div className="alert alert-danger">{status.message}</div>
        ))}

      <button type="button" className="btn btn-block" onClick={handleSignUp}>
        Sign up{" "}
        {submitted && !received && <div className="loading signer-loading" />}
      </button>
      <p id="to-signin" onClick={() => changeType("signin")}>
        Sign in
      </p>
    </div>
  );
};

export default SignupForm;
