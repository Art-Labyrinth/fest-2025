import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainPage from "./components/Main/MainPage";
import About from "./components/About";
import Contacts from "./components/Contacts";
import Participants from "./components/Participants/Participants";
import Contribute from "./components/Contribute/Contribute";
import { fetchCsrfToken } from "./utils";

import "./index.css";
import './config/i18n';

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainPage />,
        index: true,
    },
    {
        path: "/about",
        element: <About />,
    },
    {
        path: "/contacts",
        element: <Contacts />,
        loader: () => { fetchCsrfToken(); },
    },
    {
        path: "/participants",
        element: <Participants />,
    },
    {
        path: "/contribute",
        element: <Contribute />,
    },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
