import Test from "../pages/pagetest";

const routesUser = [
  {
    path: "/user",
    element: <Test />,
  },
  {
    path: "/team",
    element: <Test />,
  },
  {
    path: "/support",
    element: <Test />,
  },
  {
    path: "/setting",
    element: <Test />,
  },
  {
    path: "/team-detail/:id",
    element: <Test />,
  },
];

export { routesUser };
