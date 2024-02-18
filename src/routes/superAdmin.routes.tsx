import ElectricGadgetsList from "../Component/Pages/Home/Management/ElectricGadgetsList";
import SalesHistory from "../Component/Pages/Dashboard/Manager/SalesHistory";
import ElectricGadgets from "../Component/Pages/Dashboard/Manager/ElectricGadgets";
import SuperAdminDashboard from "../Component/Pages/Dashboard/SuperAdmin/SuperAdminDashboard";
import UserList from "../Component/Pages/Dashboard/SuperAdmin/UserList";

export const superAdminPaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <SuperAdminDashboard></SuperAdminDashboard>,
  },

  {
    name: "User Management",
    children: [
      {
        name: "User list",

        path: "user",
        element: <UserList></UserList>,
      },
    ],
  },
  {
    name: "Product Management",
    children: [
      {
        name: "Product list",

        path: "products",
        element: <ElectricGadgetsList></ElectricGadgetsList>,
      },
    ],
  },

  {
    name: "Sell Management",
    children: [
      {
        name: "Sell Product",

        path: "allSell",
        element: <ElectricGadgets></ElectricGadgets>,
      },
      {
        name: "All Sell History",

        path: "history",
        element: <SalesHistory />,
      },
    ],
  },

  //
];
