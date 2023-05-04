import React, { useEffect, useState } from "react";
import default_avatar from "../img/default_avatar.jpg";
import { getTimeDiff } from "../utils/util_date";
import { GoComment } from "react-icons/go";
import { useNavigate } from "react-router";
import { serverInfo } from "../data/serverInfo";

const PhostListItem = ({ phost }) => {
  const [author, setAuthor] = useState(null);

  const { author_id, img, text, created_at, comments } = phost;

  const navigate = useNavigate();

  const fetchAuthorData = async (author_id) => {
    if (author_id === null || author_id === undefined) {
      return null;
    }

    try {
      const response = await fetch(serverInfo.url + `/api/user/${author_id}`);

      if (response.status === 200) {
        const data = await response.json();
        setAuthor(data.user === undefined ? null : data.user);
      } else {
        setAuthor(null);
      }
    } catch (error) {
      setAuthor(null);
    }
  };

  const handleClickPhost = () => {
    navigate(`/phost/${phost.id}`);
  };

  const handleClickComments = () => {
    navigate(`/phost/${phost.id}#phostpage-comments`);
  };

  const handleClickAuthor = (user_id) => {
    navigate(`/user/${user_id}`);
  };

  useEffect(() => {
    fetchAuthorData(author_id);
  }, []);

  return (
    <div className="phost-list-item">
      <div className="phost-list-item-author">
        <img
          src={
            author === null
              ? default_avatar
              : author.avatar === null
              ? default_avatar
              : author.avatar
          }
          alt="avatar"
          onClick={() => handleClickAuthor(author.id)}
        />
        <p onClick={() => handleClickAuthor(author.id)}>
          {author === null ? "" : author.username}
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
          {author === null ? "unknown" : author.username}
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
