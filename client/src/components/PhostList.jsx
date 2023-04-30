import React from "react";
import { useState } from "react";
import { sample_phosts } from "../data/data";
import PhostListItem from "./PhostListItem";

const Phostlist = () => {
  const [phosts, setPhosts] = useState(sample_phosts);
  return (
    <div className="phost-list">
      {phosts.map((phost) => {
        return <PhostListItem key={phost.id} phost={phost} />;
      })}
    </div>
  );
};

export default Phostlist;
