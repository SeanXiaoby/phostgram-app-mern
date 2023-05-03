import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import EditUserContent from "../components/EditUserContent";
import { sample_users } from "../data/data";

const EditUser = () => {
  const [user, setUser] = useState(sample_users[0]);

  return (
    <>
      <Navbar />
      <div className="page-content">
        <EditUserContent user={user} />
      </div>
      <Footer />
    </>
  );
};

export default EditUser;
