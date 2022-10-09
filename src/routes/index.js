import { routesUser } from "./UserRoutes";
import { useRoutes } from "react-router-dom";

export default function Routes() {
  const NewUserRoutes = routesUser;
  return useRoutes(NewUserRoutes);
}
