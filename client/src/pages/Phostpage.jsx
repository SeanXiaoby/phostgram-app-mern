import React, { useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { sample_phosts } from "../data/data.js";
import { formatDate } from "../utils/util_date";
import { VscComment } from "react-icons/vsc";
import CommentRow from "../components/CommentRow";
import { useLocation } from "react-router";

const Phostpage = () => {
  const [phost, setPhost] = React.useState(sample_phosts[1]);

  const location = useLocation();
  const myAnchor = useRef(null);

  if (location.hash === "#phostpage-comments") {
    useEffect(() => {
      myAnchor.current.scrollIntoView({ behavior: "smooth" });
    }, []);
  }

  return (
    <>
      <Navbar />
      <div className="page-content">
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
              <VscComment className="phostpage-info-comments-logo" />
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
      </div>
      <Footer />
    </>
  );
};

export default Phostpage;
