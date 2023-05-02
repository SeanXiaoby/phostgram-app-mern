import React from "react";
import { BiPlusMedical } from "react-icons/bi";
import { AiOutlineVideoCameraAdd } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const CreateBtn = () => {
  const navigate = useNavigate();

  return (
    <div className="home-create-btn-container">
      <button
        className="btn home-create-btn"
        style={{ textTransform: "none" }}
        onClick={() => {
          navigate("/create");
        }}
      >
        <AiOutlineVideoCameraAdd className="home-create-btn-icon" size={25} />
      </button>
    </div>
  );
};

export default CreateBtn;
