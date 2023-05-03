import React, { useState } from "react";
import { VscEyeClosed, VscEye } from "react-icons/vsc";
import default_avatar from "../img/default_avatar.jpg";
import { useNavigate } from "react-router-dom";
import { serverInfo } from "../data/serverInfo";

const EditUserContent = ({ user }) => {
  const [hidePwd, setHidePwd] = useState(true);
  const [clickedLogout, setClickedLogout] = useState(false);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ success: false, message: "unknow" });

  const navigate = useNavigate();

  const hiddenPsw = "*".repeat(user.password.length);

  const changeHidePwd = () => {
    setHidePwd(!hidePwd);
  };

  const handleLogout = async () => {
    setLoading(true);
    setClickedLogout(true);

    const session_id = localStorage.getItem("session_id");
    const user_id = localStorage.getItem("user_id");

    console.log(session_id, user_id);

    if (session_id === null) {
      localStorage.removeItem("user_id");
      localStorage.removeItem("session_id");
      setLoading(false);
      navigate("/");
      return;
    }

    let response = null;

    try {
      response = await fetch(`${serverInfo.url}/api/auth/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ session_id }),
      });
    } catch (error) {
      setStatus({
        success: false,
        message: "Something went wrong! Please try again!",
      });
      setLoading(false);
      return;
    }
    setLoading(false);

    if (response.status === 200) {
      localStorage.removeItem("user_id");
      localStorage.removeItem("session_id");
      setStatus({ success: true, message: "Logout successfully!" });
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } else {
      setStatus({
        success: false,
        message: "Something went wrong! Please try again!",
      });
    }
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
      <button
        className="btn btn-block edit-user-log-out-btn"
        onClick={handleLogout}
      >
        Log out
        {loading && <div className="loading loading-inline"></div>}
      </button>
      {clickedLogout && !loading && (
        <div
          className={
            status.success
              ? "alert alert-success edit-user-alert"
              : "alert alert-danger edit-user-alert"
          }
        >
          {status.message}
        </div>
      )}
    </div>
  );
};

export default EditUserContent;
