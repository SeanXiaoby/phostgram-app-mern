import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Phostlist from "../components/PhostList";
import CreateBtn from "../components/CreateBtn";

const Home = () => {
  const [loggedIn, setLoggedIn] = useState(
    localStorage.getItem("session_id") !== null
  );

  return (
    <>
      <Navbar />
      <div className="page-content">
        <Phostlist />
      </div>
      {loggedIn && <CreateBtn />}
      <Footer />
    </>
  );
};

export default Home;
