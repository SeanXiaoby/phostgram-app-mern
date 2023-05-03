import React, { useEffect, useRef, useState } from "react";
import { formatDate } from "../utils/util_date";
import { VscComment } from "react-icons/vsc";
import { FaCat } from "react-icons/fa";
import CommentRow from "../components/CommentRow";

import { useLocation } from "react-router";

const PhostPageContent = ({ phost }) => {
  const location = useLocation();
  const myAnchor = useRef(null);

  if (location.hash === "#phostpage-comments") {
    useEffect(() => {
      myAnchor.current.scrollIntoView({ behavior: "smooth" });
    }, []);
  }

  return (
    <>
      <img className="phostpage-img" src={phost.img} alt="placeholder" />
      <div className="phostpage-content">
        <div className="phostpage-info">
          <div className="phostpage-info-author">
            <img
              src={
                phost.author === undefined
                  ? default_avatar
                  : phost.author.avatar === undefined
                  ? default_avatar
                  : phost.author.avatar
              }
              alt="avatar"
            />
            <p>
              {phost.author === undefined ? "unknown" : phost.author.username}
            </p>
          </div>
          <div className="phostpage-info-divider"></div>
          <div className="phostpage-info-text">
            <p>{phost.text}</p>
          </div>
          <div className="phostpage-info-time">
            <p className="phostpage-info-time-p1">Created @ </p>
            <p className="phostpage-info-time-p2">
              {formatDate(new Date(phost.created_at))}
            </p>
          </div>
          <div className="phostpage-info-divider" />
          <div
            className="phostpage-info-comments-title"
            id="phostpage-comments"
            ref={myAnchor}
          >
            <p>Comments</p>
            <FaCat className="phostpage-info-comments-logo" />
          </div>

          <div className="phostpage-comments">
            {phost.comments.length === 0 ? (
              <p>Oops... There is no comment here</p>
            ) : (
              phost.comments.map((comment) => (
                <CommentRow comment={comment} key={comment.id} />
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default PhostPageContent;
