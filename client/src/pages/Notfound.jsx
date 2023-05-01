import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import notfoundPic from "../img/404.png";

const Notfound = () => {
  return (
    <>
      <Navbar />
      <div className="page-content notfound-page-content">
        <img src={notfoundPic} alt="404" className="notfound-img" />
      </div>
      <Footer />
    </>
  );
};

export default Notfound;
