import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ReactDOM from "react-dom/client";
import MainPage from "./components/Main/MainPage";
// import Soon from "./components/Coming/Soon";
import About from "./components/About";
import { Header } from "./components/Header/Header";

import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <main className="min-h-screen h-full min-w-screen w-full">
              <Header />
              <Routes>
                    <Route path="/" element={<MainPage />} />
                    <Route path="/about" element={<About />} />
                    {/* <Route path="/" element={<Soon />} /> */}
                </Routes>
            </main>
        </BrowserRouter>
    </React.StrictMode>
);
