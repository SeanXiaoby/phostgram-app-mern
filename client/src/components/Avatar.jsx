import React from "react";
import default_avatar from "../img/default_avatar.jpg";

const Avatar = (props) => {
  let { user_avatar } = props;
  user_avatar = user_avatar === undefined ? null : user_avatar;

  return (
    <div class="avatar-container">
      <img
        class="avatar-img"
        src={user_avatar === null ? default_avatar : user_avatar}
        alt="avatar"
      />
    </div>
  );
};

export default Avatar;
