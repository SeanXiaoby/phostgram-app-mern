import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { sample_phosts } from "../data/data.js";

import PhostPageContent from "../components/PhostPageContent";
import { useNavigate, useParams } from "react-router";
import { serverInfo } from "../data/serverInfo";

const Phostpage = () => {
  const navigate = useNavigate();
  const [phost, setPhost] = React.useState(null);
  const [phostId, setPhostId] = React.useState(useParams().id);
  const [fetched, setFetched] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [failed, setFailed] = React.useState(false);
  const [author, setAuthor] = React.useState(null);

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

  const fetchPhost = async (phost_id) => {
    if (phost_id === undefined) {
      navigate("/error");
    }
    try {
      const response = await fetch(serverInfo.url + `/api/phost/${phost_id}`);

      if (response.status === 200) {
        const { phost } = await response.json();
        setFetched(true);
        setLoading(false);
        setPhost(phost);
      } else {
        setLoading(false);
        setFailed(true);
        setPhost(null);
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
      setFailed(true);
      navigate("/error");
    }
  };

  useEffect(() => {
    fetchPhost(phostId);
  }, []);

  useEffect(() => {
    fetchAuthorData(phost === null ? null : phost.author_id);
  }, [phost]);

  return (
    <>
      <Navbar />
      <div className="page-content">
        {loading && <div className="loading" />}

        {failed && (
          <div className="alert-danger">
            Loading failed! Please try again later...
          </div>
        )}

        {fetched && <PhostPageContent phost={phost} author={author} />}
      </div>
      <Footer />
    </>
  );
};

export default Phostpage;
