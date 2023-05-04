import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import UserpageContent from "../components/UserPageContent";
import { sample_users } from "../data/data";
import { serverInfo } from "../data/serverInfo";
import { useParams } from "react-router";

const Userpage = () => {
  const [user, setUser] = useState(null);
  const [fetched, setFetched] = useState(false);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);

  const user_id = useParams().id;

  const fetchUserData = async (user_id) => {
    if (user_id === undefined || user_id === null) {
      return null;
    }

    try {
      const response = await fetch(serverInfo.url + `/api/user/${user_id}`);

      if (response.status === 200) {
        const data = await response.json();
        setUser(data.user === undefined ? null : data.user);
        setFetched(true);
        setLoading(false);
      } else {
        setUser(null);
        setFailed(true);
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
      setFailed(true);
    }
  };

  useEffect(() => {
    fetchUserData(user_id);
  }, []);

  return (
    <>
      <Navbar />
      <div className="page-content">
        {fetched && <UserpageContent user={user} />}
      </div>
      <Footer />
    </>
  );
};

export default Userpage;
