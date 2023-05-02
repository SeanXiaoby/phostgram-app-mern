import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { sample_phosts } from "../data/data.js";

import PhostPageContent from "../components/PhostPageContent";

const Phostpage = () => {
  const [phost, setPhost] = React.useState(sample_phosts[0]);

  return (
    <>
      <Navbar />
      <div className="page-content">
        <PhostPageContent phost={phost} />
      </div>
      <Footer />
    </>
  );
};

export default Phostpage;
