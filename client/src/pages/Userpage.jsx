import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import UserpageContent from "../components/UserPageContent";

const Userpage = () => {
  return (
    <>
      <Navbar />
      <div className="page-content">
        <UserpageContent />
      </div>
      <Footer />
    </>
  );
};

export default Userpage;
