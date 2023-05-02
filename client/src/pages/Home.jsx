import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Phostlist from "../components/PhostList";
import CreateBtn from "../components/CreateBtn";

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="page-content">
        <Phostlist />
      </div>
      <CreateBtn />
      <Footer />
    </>
  );
};

export default Home;
