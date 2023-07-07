import { RouteConfig } from "react-router-config";
import MainLayout from "./layouts/index";
import MainPage from "./pages/main/index";

const routes: RouteConfig[] = [
  {
    route: "*",
    component: MainLayout,
    routes: [
      {
        path: "/",
        exact: true,
        component: MainPage,
      },
      //   {
      //     path: '/about',
      //     exact: true,
      //     component: AboutPage,
      //   },
      //   {
      //     path: '/works',
      //     exact: true,
      //     component: WorksPage,
      //   },
    ],
  },
];

export default routes;
