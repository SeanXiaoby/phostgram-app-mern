import React, { useEffect } from "react";
import default_avatar from "../img/default_avatar.jpg";
import { useState } from "react";

const Avatar = (props) => {
  let { user, handleClick } = props;
  const [userAvatar, setUserAvatar] = useState(null);
  useEffect(() => {}, []);

  return (
    <div className="avatar-container">
      <img
        className="avatar-img"
        src={userAvatar === null ? default_avatar : userAvatar}
        alt="avatar"
        onClick={() => handleClick()}
      />
    </div>
  );
};

export default Avatar;
