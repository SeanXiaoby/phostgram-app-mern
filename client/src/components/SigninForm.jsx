import React, { useState } from "react";
import {
  isValidEmail,
  isValidUsername,
  isValidPassword,
} from "../utils/util_format";
import { serverInfo } from "../data/serverInfo";
import { useNavigate } from "react-router";

const SigninForm = ({ changeType }) => {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState({ success: false, message: "" });
  const [loading, setLoading] = useState(false);

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

  const handleSignin = async () => {
    setLoading(true);
    setSubmitted(true);

    console.log(serverInfo);

    const username = document.getElementById("signin-username").value;
    const password = document.getElementById("signin-password").value;

    if (!isValidUsername(username)) {
      setStatus({ success: false, message: "Invalid username format" });
      setLoading(false);
      return;
    }

    if (!isValidPassword(password)) {
      setStatus({ success: false, message: "Invalid password" });
      ssetLoading(false);
      return;
    }

    const user_data = {
      username: username,
      password: password,
    };

    let statusCode = 500,
      data = {};

    try {
      const res = await fetchData(serverInfo.url, "/api/auth/login", user_data);

      statusCode = res.statusCode;
      data = res.data;
    } catch (error) {
      setStatus({
        success: false,
        message: "Something went wrong! Please try again later!",
      });
    }

    setLoading(false);

    if (statusCode === 200) {
      setStatus({
        success: true,
        message: "Sign in successful!",
      });

      sessionStorage.setItem("session_id", data.session_id);

      setTimeout(() => {
        navigate("/");
      }, 1000);
    } else {
      if (statusCode === 400) {
        setStatus({
          success: false,
          message: "Input information is incorrect!",
        });
      } else if (statusCode === 409) {
        setStatus({
          success: false,
          message:
            "User already logged in in other places! Please log out first...",
        });
      } else if (statusCode === 404) {
        setStatus({
          success: false,
          message: "Wrong username or password! Please check your information!",
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
        <h2>Sign in</h2>
        <div className="title-underline"></div>
      </div>
      <div className="landing-form-content">
        <div className="form-row">
          <label htmlFor="signin-username" className="form-label">
            username
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
      {submitted &&
        !loading &&
        (status.success ? (
          <div className="alert alert-success">{status.message}</div>
        ) : (
          <div className="alert alert-danger">{status.message}</div>
        ))}

      <button type="button" className="btn btn-block" onClick={handleSignin}>
        Sign in {loading && <div className="loading signer-loading" />}
      </button>
      <p
        onClick={() => {
          changeType("signup");
        }}
      >
        Sign up
      </p>
    </div>
  );
};

export default SigninForm;
