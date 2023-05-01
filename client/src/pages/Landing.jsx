import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SigninForm from "../components/SigninForm";
import SignupForm from "../components/SignupForm";
import { useLocation, useParams } from "react-router-dom";

const Landing = () => {
  const location = useLocation();
  const { type } = useParams();

  const [landingType, setLandingType] = useState(
    type === "signin" ? "signin" : "signup"
  );

  const changeLandingType = (type) => {
    if (type === "signin" || type === "signup") {
      setLandingType(type);
    }
  };

  return (
    <>
      <Navbar />
      <div className="page-content">
        {landingType === "signin" ? (
          <SigninForm changeType={changeLandingType} />
        ) : (
          <SignupForm changeType={changeLandingType} />
        )}
      </div>
      <Footer />
    </>
  );
};

export default Landing;
