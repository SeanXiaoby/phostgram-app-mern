import React from "react";
import default_avatar from "../img/default_avatar.jpg";
import { getTimeDiff } from "../utils/util_date";
import { GoComment } from "react-icons/go";

const PhostListItem = ({ phost }) => {
  const { author, img, text, created_at, comments } = phost;

  console.log(new Date(created_at).getFullYear());

  console.log(phost);
  return (
    <div className="phost-list-item">
      <div className="phost-list-item-author">
        <img
          src={
            author === undefined
              ? default_avatar
              : author.avatar === undefined
              ? default_avatar
              : author.avatar
          }
          alt="avatar"
        />
        <p>{author === undefined ? "unknown" : author.username}</p>
        <h5>· {getTimeDiff(new Date(created_at))}</h5>
      </div>
      <img className="phost-list-item-img" src={img} alt="phost-item-img" />
      <div className="phost-list-item-text">
        <h5>{author === undefined ? "unknown" : author.username}</h5>
        <p>{text.length > 200 ? text.substring(0, 200) + "..." : text}</p>
      </div>
      <div className="phost-list-item-comments">
        <GoComment className="phost-list-item-comments-logo" size={20} />
        <p>{comments.length} comments</p>
      </div>
    </div>
  );
};

export default PhostListItem;
