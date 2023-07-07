import * as React from "react";
import CreateDOM from "react-dom/client";
import { createHashRouter, RouterProvider } from "react-router-dom";
import "./index.scss";

import MainLayout from "./layouts/index";
import MainPage from "./pages/main/index";

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Failed to find the root element");
const router = createHashRouter([
  {
    element: <MainLayout />,
    id: "root",
    children: [
      {
        path: "/",
        element: <MainPage />,
      },
    ],
  },
]);

CreateDOM.createRoot(rootElement).render(<RouterProvider router={router} />);
