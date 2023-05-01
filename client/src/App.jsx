import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Landing from "./pages/Landing";
import Notfound from "./pages/Notfound";
import Phostpage from "./pages/Phostpage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/landing/:type" element={<Landing />} />
      <Route path="/phost/:id" element={<Phostpage />} />
      <Route path="*" exact={true} element={<Notfound />} />
    </Routes>
  );
};

export default App;
