import React from "react";
import { formatDate } from "../utils/util_date";
import { useNavigate } from "react-router-dom";

const CommentRow = ({ comment }) => {
  const { id, author, text, created_at } = comment;
  const navigate = useNavigate();

  const handleClickAuthor = (user_id) => {
    navigate(`/user/${user_id}`);
  };

  return (
    <div className="comment-row">
      <img src={author.avatar} alt="avatar" className="comment-row-img" />
      <p
        className="comment-row-username"
        onClick={() => {
          handleClickAuthor(author.id);
        }}
      >
        {" "}
        {author.username}{" "}
      </p>
      <p className="comment-row-text">{text}</p>

      <p className="commentrow-info-time">
        {" @ " + formatDate(new Date(created_at))}
      </p>
    </div>
  );
};

export default CommentRow;
