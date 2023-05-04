import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import EditUserContent from "../components/EditUserContent";
import { sample_users } from "../data/data";
import { serverInfo } from "../data/serverInfo";
import { useParams } from "react-router";

const EditUser = () => {
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
        {loading && <div className="loading" />}

        {!loading && failed && (
          <div className="alert-danger">
            Failed to load user data! Please try again!
          </div>
        )}
        {fetched && <EditUserContent user={user} />}
      </div>
      <Footer />
    </>
  );
};

export default EditUser;
