import React from "react";
import default_avatar from "../img/default_avatar.jpg";
import { getTimeDiff } from "../utils/util_date";
import { GoComment } from "react-icons/go";
import { useNavigate } from "react-router";

const PhostListItem = ({ phost }) => {
  console.log(phost);
  const { author, img, text, created_at, comments } = phost;

  const navigate = useNavigate();

  const handleClickPhost = () => {
    navigate(`/phost/${phost.id}`);
  };

  const handleClickComments = () => {
    navigate(`/phost/${phost.id}#phostpage-comments`);
  };

  const handleClickAuthor = (user_id) => {
    navigate(`/user/${user_id}`);
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
          onClick={() => handleClickAuthor(author.id)}
        />
        <p onClick={() => handleClickAuthor(author.id)}>
          {author === undefined ? "unknown" : author.username}
        </p>
        <h5>· {getTimeDiff(new Date(created_at))}</h5>
      </div>
      <img
        className="phost-list-item-img"
        src={img}
        alt="phost-item-img"
        onClick={() => handleClickPhost()}
      />
      <div className="phost-list-item-text">
        <h5 onClick={() => handleClickAuthor(author.id)}>
          {author === undefined ? "unknown" : author.username}
        </h5>
        <p onClick={handleClickPhost}>
          {text.length > 200 ? text.substring(0, 200) + "..." : text}
        </p>
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
