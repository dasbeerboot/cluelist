import * as React from "react";
import { RouteObject } from "react-router-dom";
import MainLayout from "./layouts/index";
import MainPage from "./pages/main/index";

const routes: RouteObject[] = [
  {
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <MainPage />,
      },
    ],
  },
];

export default routes;
