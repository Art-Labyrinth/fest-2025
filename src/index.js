import React from "react";
import ReactDOM from "react-dom/client";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import MainPage from "./components/Main/MainPage";
import About from "./components/About";
import Contacts from "./components/Contacts";
import Participants from "./components/Participants/Participants";
import Contribute from "./components/Contribute/Contribute";
import Success from "./components/Contribute/Success";
import Fail from "./components/Contribute/Fail";
import Gallery from "./components/Gallery/Gallery";
import Programma from "./components/Programma/Programma";
import ProgrammaWithSchedule from "./components/ProgrammaWithSchedule/ProgrammaWithSchedule";
import GettingThere from "./components/GettingThere/GettingThere";
import NotFound from "./components/NotFound";
import {fetchCsrfToken} from "./utils";

import "./index.css";
import "./i18n";

const fbclid = (new URLSearchParams(window.location.search)).get("fbclid");
if (fbclid) {
  localStorage.setItem("fbclid", fbclid);
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage/>,
    index: true,
  },
  {
    path: "/about",
    element: <About/>,
  },
  {
    path: "/contacts",
    element: <Contacts/>,
    loader: () => {
      fetchCsrfToken();
    },
  },
  {
    path: "/participants",
    element: <Participants/>,
  },
  {
    path: "/contribute",
    element: <Contribute/>,
  },
  {
    path: "/gallery",
    element: <Gallery/>,
  },
  {
    path: "/program",
    element: <ProgrammaWithSchedule/>,
  },
  {
    path: "/schedule",
    element: <ProgrammaWithSchedule />,
  },
  {
    path: "/old_program",
    element: <Programma/>,
  },
  {
    path: "/success",
    element: <Success/>,
  },
  {
    path: "/gettingthere",
    element: <GettingThere/>,
  },
  {
    path: "/fail",
    element: <Fail/>,
  },
  {
    path: "*",
    element: <NotFound/>,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
);
