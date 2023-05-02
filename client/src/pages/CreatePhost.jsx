import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CreateBox from "../components/CreateBox";

const CreatePhost = () => {
  return (
    <>
      <Navbar />

      <div className="page-content">
        <CreateBox />
      </div>

      <Footer />
    </>
  );
};

export default CreatePhost;
