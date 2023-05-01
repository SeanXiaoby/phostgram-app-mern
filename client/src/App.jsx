import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Landing from "./pages/Landing";
import Notfound from "./pages/Notfound";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/landing/:type" element={<Landing />} />
      <Route path="*" exact={true} element={<Notfound />} />
    </Routes>
  );
};

export default App;
