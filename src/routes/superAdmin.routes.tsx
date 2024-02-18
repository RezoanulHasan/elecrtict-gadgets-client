import SalesHistory from "../Component/Pages/Dashboard/Manager/SalesHistory";

import SuperAdminDashboard from "../Component/Pages/Dashboard/SuperAdmin/SuperAdminDashboard";
import UserList from "../Component/Pages/Dashboard/SuperAdmin/UserList";
import ElectricGadgetsSellAdmin from "../Component/Pages/Dashboard/SuperAdmin/ElectricGadgetsSellAdmin";
import ElectricGadgetsAdminList from "../Component/Pages/Dashboard/SuperAdmin/ElectricGadgetsAdminList";

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
        element: <ElectricGadgetsAdminList></ElectricGadgetsAdminList>,
      },
    ],
  },

  {
    name: "Sell Management",
    children: [
      {
        name: "Sell Product",

        path: "allSellAdmin",
        element: <ElectricGadgetsSellAdmin></ElectricGadgetsSellAdmin>,
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
