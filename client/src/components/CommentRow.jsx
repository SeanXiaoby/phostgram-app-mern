import React from "react";
import { formatDate } from "../utils/util_date";

const CommentRow = ({ comment }) => {
  const { id, author, text, created_at } = comment;
  return (
    <div className="comment-row">
      <img src={author.avatar} alt="avatar" className="comment-row-img" />
      <p className="comment-row-username"> {author.username} </p>
      <p className="comment-row-text">{text}</p>

      <p className="commentrow-info-time">
        {" @ " + formatDate(new Date(created_at))}
      </p>
    </div>
  );
};

export default CommentRow;
