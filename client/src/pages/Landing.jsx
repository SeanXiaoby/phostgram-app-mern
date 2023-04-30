import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SigninForm from "../components/SigninForm";
import SignupForm from "../components/SignupForm";

const Landing = () => {
  const { landingType, setLandingType } = useState("signin");

  const changeLandingType = (type) => {
    if (type === "signin" || type === "signup") {
      setLandingType(type);
    }
  };

  console.log(landingType);

  return (
    <>
      <Navbar />
      <div className="page-content">
        {landingType === "signin" ? <SigninForm /> : <SignupForm />}
      </div>
      <Footer />
    </>
  );
};

export default Landing;
