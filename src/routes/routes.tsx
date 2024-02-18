import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { routeGenerator } from "../utils/routesGenerator";
import ProtectedRoute from "../Component/layout/ProtectedRoute";
import { managerPaths } from "./manager.routes";
import { userPaths } from "./user.routes";
import Login from "../Component/Pages/Registeion/Login";
import RegisterForm from "../Component/Pages/Registeion/RegisterForm";
import Error from "../Component/Shared/Error/Error";
import AddElectricGadgetForm from "../Component/Pages/Home/Management/AddElectricGadgetForm ";
import AddSingleElectricGadgetForm from "../Component/Pages/Dashboard/User/AddSingleElectricGadgetForm ";
import Protected from "../Hooks/Protected";
import { superAdminPaths } from "./superAdmin.routes";
//import ElectricGadgets from "../Component/Pages/Home/Sells/ElectricGadgets";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
  },
  {
    path: "login",
    element: <Login></Login>,
  },
  {
    path: "registration",
    element: <RegisterForm></RegisterForm>,
  },
  {
    path: "add",
    element: (
      <Protected>
        {" "}
        <AddElectricGadgetForm></AddElectricGadgetForm>{" "}
      </Protected>
    ),
  },

  {
    path: "addProduct",
    element: (
      <Protected>
        {" "}
        <AddSingleElectricGadgetForm></AddSingleElectricGadgetForm>{" "}
      </Protected>
    ),
  },

  {
    path: "/superAdmin",
    element: (
      <ProtectedRoute role="superAdmin">
        <App />
      </ProtectedRoute>
    ),
    children: routeGenerator(superAdminPaths),
  },
  {
    path: "/manager",
    element: (
      <ProtectedRoute role="manager">
        <App />
      </ProtectedRoute>
    ),
    children: routeGenerator(managerPaths),
  },
  {
    path: "/user",
    element: (
      <ProtectedRoute role="user">
        <App />
      </ProtectedRoute>
    ),
    children: routeGenerator(userPaths),
  },
]);

export default router;
