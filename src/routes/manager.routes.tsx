import ManagerDashboard from "../Component/Pages/Dashboard/Manager/ManagerDashboard";

import ElectricGadgetsList from "../Component/Pages/Home/Management/ElectricGadgetsList";
import SalesHistory from "../Component/Pages/Dashboard/Manager/SalesHistory";
import ElectricGadgets from "../Component/Pages/Dashboard/Manager/ElectricGadgets";

export const managerPaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <ManagerDashboard />,
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
