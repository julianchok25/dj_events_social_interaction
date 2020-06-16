import Home from "../page/Home";
import Error404 from "../page/Error404";
import User from "../page/User";

export default [
  {
    path: "/:id",
    exact: true,
    page: User,
  },
  {
    path: "/",
    exact: true,
    page: Home,
  },
  {
    path: "*",
    page: Error404,
  },
];
