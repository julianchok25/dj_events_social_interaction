import Home from "../page/Home";
import Follows from "../page/Follows";
import Error404 from "../page/Error404";
import User from "../page/User";

export default [
  {
    path: "/follows",
    exact: true,
    page: Follows,
  },
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
