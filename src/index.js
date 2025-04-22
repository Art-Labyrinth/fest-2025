import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ReactDOM from "react-dom/client";
import MainPage from "./components/Main/MainPage";
import About from "./components/About";

import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/about" element={<About />} />
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
);
