import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import Error from "./Component/Shared/Error/Error";
import Home from "./Component/Pages/Home/Home";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { store, persistor } from "./Redux/store.ts";
import LoginForm from "./Component/Pages/login/LoginForm.tsx";
import SalesHistory from "./Component/Pages/Home/Sells/SalesHistory.tsx";
import AddElectricGadgetForm from "./Component/Pages/Home/Management/AddElectricGadgetForm .tsx";
import RegisterForm from "./Component/Pages/Registeion/RegisterForm.tsx";
import ElectricGadgetsList from "./Component/Pages/Home/Management/ElectricGadgetsList.tsx";
import ElectricGadgets from "./Component/Pages/Home/Sells/ElectricGadgets.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "login",
        element: <LoginForm />,
      },
      {
        path: "registration",
        element: <RegisterForm></RegisterForm>,
      },
      {
        path: "product",
        element: <ElectricGadgetsList></ElectricGadgetsList>,
      },

      {
        path: "add",
        element: <AddElectricGadgetForm></AddElectricGadgetForm>,
      },

      {
        path: "sell",
        element: <ElectricGadgets></ElectricGadgets>,
      },
      {
        path: "history",
        element: <SalesHistory />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
