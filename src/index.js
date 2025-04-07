import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ReactDOM from "react-dom/client";
import MainPage from "./components/Main/MainPage";
// import Soon from "./components/Coming/Soon";

import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        {/* <Route path="/" element={<Soon />} /> */}
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);
