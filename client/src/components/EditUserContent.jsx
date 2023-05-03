import React, { useState } from "react";
import { VscEyeClosed, VscEye } from "react-icons/vsc";
import default_avatar from "../img/default_avatar.jpg";

const EditUserContent = ({ user }) => {
  const [hidePwd, setHidePwd] = useState(true);

  const hiddenPsw = "*".repeat(user.password.length);

  const changeHidePwd = () => {
    setHidePwd(!hidePwd);
  };

  return (
    <div className="edit-user">
      <img
        className="edit-user-avatar"
        src={
          user.avatar === undefined || user.avatar === null
            ? default_avatar
            : user.avatar
        }
        alt={user.username}
      />
      <p style={{ fontWeight: "600" }}>Avatar</p>

      <div className="edit-user-form">
        <div className="edit-user-form-row">
          <p className="edit-user-p-left">Username</p>
          <p className="edit-user-p-right">{user.username}</p>
        </div>
        <div className="edit-user-form-row">
          <p className="edit-user-p-left">Email</p>
          <p className="edit-user-p-right">{user.email}</p>
        </div>
        <div className="edit-user-form-row">
          <p className="edit-user-p-left">Password</p>
          <p className="edit-user-p-right">
            {hidePwd ? hiddenPsw : user.password}
            {hidePwd ? (
              <VscEyeClosed
                className="edit-user-hide-icon"
                size={20}
                onClick={changeHidePwd}
              />
            ) : (
              <VscEye
                className="edit-user-hide-icon"
                size={20}
                onClick={changeHidePwd}
              />
            )}
          </p>
        </div>
      </div>

      <button className="btn btn-block">Create Phost</button>
      <button className="btn btn-block edit-user-log-out-btn">Log out</button>
    </div>
  );
};

export default EditUserContent;
