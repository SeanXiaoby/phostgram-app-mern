import React from "react";
import default_avatar from "../img/default_avatar.jpg";
import { getTimeDiff } from "../utils/util_date";
import { GoComment } from "react-icons/go";
import { useNavigate } from "react-router";

const PhostListItem = ({ phost }) => {
  const { author, img, text, created_at, comments } = phost;

  const navigate = useNavigate();

  const handleClickImage = () => {
    navigate(`/phost/${phost.id}`);
  };

  const handleClickComments = () => {
    navigate(`/phost/${phost.id}#phostpage-comments`);
  };

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
      <img
        className="phost-list-item-img"
        src={img}
        alt="phost-item-img"
        onClick={() => handleClickImage()}
      />
      <div className="phost-list-item-text">
        <h5>{author === undefined ? "unknown" : author.username}</h5>
        <p>{text.length > 200 ? text.substring(0, 200) + "..." : text}</p>
      </div>
      <div className="phost-list-item-comments">
        <GoComment
          className="phost-list-item-comments-logo"
          size={20}
          onClick={() => handleClickComments()}
        />
        <p onClick={() => handleClickComments()}>{comments.length} comments</p>
      </div>
    </div>
  );
};

export default PhostListItem;
