import AllProduct from "../Component/Pages/Dashboard/User/AllProduct";
import CartPage from "../Component/Pages/Dashboard/User/CartPage";
import SingleElectigadeList from "../Component/Pages/Dashboard/User/SingleElectigadeList";
import SingleSalesHistory from "../Component/Pages/Dashboard/User/SingleSalesHistory";
import UserDashboard from "../Component/Pages/Dashboard/User/UserDashboard";
//import ElectricGadgets from "../Component/Pages/Home/Sells/ElectricGadgets";

export const userPaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <UserDashboard></UserDashboard>,
  },

  {
    name: "Product-Management",
    children: [
      {
        name: "MY Product list",

        path: "product",
        element: <SingleElectigadeList></SingleElectigadeList>,
      },

      {
        name: "All Product",

        path: "all",
        element: <AllProduct></AllProduct>,
      },
    ],
  },

  {
    name: "Buy Product",
    children: [
      {
        name: "My Cart Product",

        path: "cart",
        element: <CartPage></CartPage>,
      },

      {
        name: "Sell History",

        path: "singlehistory",
        element: <SingleSalesHistory></SingleSalesHistory>,
      },
    ],
  },
];
