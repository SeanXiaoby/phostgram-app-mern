import React, { useState } from "react";
import default_avatar from "../img/default_avatar.jpg";
import { sample_phosts, sample_users } from "../data/data";
import { useNavigate } from "react-router-dom";

const UserPageContent = ({ user }) => {
  const [userData, setUserData] = useState(user);
  const [userPhosts, setUserPhosts] = useState(sample_phosts);
  const navigate = useNavigate();

  const handleClickImg = (phost_id) => {
    navigate(`/phost/${phost_id}`);
  };

  return (
    <div className="user-page-content">
      <div className="user-page-info">
        <img
          src={userData.avatar === undefined ? default_avatar : userData.avatar}
          alt="avatar"
        />
        <h4>
          {userData.username === undefined ? "unknown" : userData.username}
        </h4>
      </div>

      <div className="user-page-gallery">
        {userPhosts.length ? (
          userPhosts.map((phost) => {
            return (
              <img
                src={phost.img}
                alt="phost-img"
                key={phost.id}
                onClick={() => handleClickImg(phost.id)}
              />
            );
          })
        ) : (
          <h4>No phost yet...</h4>
        )}
      </div>
    </div>
  );
};

export default UserPageContent;
