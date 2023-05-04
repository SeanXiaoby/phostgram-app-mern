import React, { useEffect } from "react";
import { useState } from "react";
import { sample_phosts } from "../data/data";
import PhostListItem from "./PhostListItem";
import { serverInfo } from "../data/serverInfo";

const Phostlist = () => {
  const [phosts, setPhosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetched, setFetched] = useState(false);
  const [error, setError] = useState(false);

  const fetchPhosts = async () => {
    try {
      const response = await fetch(serverInfo.url + `/api/phost`);
      if (response.status === 200) {
        setLoading(false);
        const { phosts } = await response.json();

        setFetched(true);
        setPhosts(phosts);
      } else {
        setLoading(false);
        setError(true);
      }
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  };

  useEffect(() => {
    fetchPhosts();
  }, []);

  return (
    <>
      {loading && <div className="loading" />}

      {error && (
        <div className="alert-danger">
          Something went wrong! Please refresh the page!
        </div>
      )}
      <div className="phost-list">
        {fetched &&
          phosts.map((phost) => {
            return <PhostListItem key={phost.id} phost={phost} />;
          })}
      </div>
    </>
  );
};

export default Phostlist;
