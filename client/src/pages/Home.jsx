import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Phostlist from "../components/PhostList";

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="page-content">
        <Phostlist />
      </div>
      <Footer />
    </>
  );
};

export default Home;
