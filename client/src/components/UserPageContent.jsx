import React, { useEffect, useState } from "react";
import default_avatar from "../img/default_avatar.jpg";
import { sample_phosts, sample_users } from "../data/data";
import { useNavigate } from "react-router-dom";
import { serverInfo } from "../data/serverInfo";

const UserPageContent = ({ user }) => {
  const [userData, setUserData] = useState(user);
  const [userPhosts, setUserPhosts] = useState([]);
  const [fetched, setFetched] = useState(false);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);

  const navigate = useNavigate();

  const handleClickImg = (phost_id) => {
    navigate(`/phost/${phost_id}`);
  };

  const fetchUserPhosts = async (user_id) => {
    if (user_id === undefined || user_id === null) {
      return null;
    }

    try {
      const response = await fetch(
        serverInfo.url + `/api/user/${user_id}/phosts`
      );

      if (response.status === 200) {
        const data = await response.json();
        setUserPhosts(data.phosts);
        setFetched(true);
        setLoading(false);
      } else {
        setFailed(true);
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
      setFailed(true);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserPhosts(userData.id);
  }, []);

  return (
    <div className="user-page-content">
      <div className="user-page-info">
        <img
          src={
            userData === null
              ? default_avatar
              : userData.avatar === null
              ? default_avatar
              : userData.avatar
          }
          alt="avatar"
        />
        <h4>{userData === null ? "unknown" : userData.username}</h4>
      </div>

      {loading && <div className="loading" />}

      {!loading && failed && (
        <div className="alert-danger">
          Failed to load user data! Please try again!
        </div>
      )}

      {fetched &&
        (userPhosts.length ? (
          <div className="user-page-gallery">
            {userPhosts.map((phost) => {
              return (
                <img
                  src={phost.img}
                  alt="phost-img"
                  key={phost.id}
                  onClick={() => handleClickImg(phost.id)}
                />
              );
            })}
          </div>
        ) : (
          <h4 className="user-page-no-post">No phost yet...</h4>
        ))}
    </div>
  );
};

export default UserPageContent;
