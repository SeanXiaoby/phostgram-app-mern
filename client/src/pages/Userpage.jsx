import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import UserpageContent from "../components/UserPageContent";
import { sample_users } from "../data/data";

const Userpage = () => {
  const [user, setUser] = useState(sample_users[1]);

  return (
    <>
      <Navbar />
      <div className="page-content">
        <UserpageContent user={user} />
      </div>
      <Footer />
    </>
  );
};

export default Userpage;
