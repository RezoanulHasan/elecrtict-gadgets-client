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

import SalesHistory from "./Component/Pages/Home/Sells/SalesHistory.tsx";
import AddElectricGadgetForm from "./Component/Pages/Home/Management/AddElectricGadgetForm .tsx";
import RegisterForm from "./Component/Pages/Registeion/RegisterForm.tsx";
import ElectricGadgetsList from "./Component/Pages/Home/Management/ElectricGadgetsList.tsx";
import ElectricGadgets from "./Component/Pages/Home/Sells/ElectricGadgets.tsx";
import Login from "./Component/Pages/Registeion/Login.tsx";
import ProtectedRoute from "./Hooks/ProtectedRoute.tsx";

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
        path: "registration",
        element: <RegisterForm></RegisterForm>,
      },
      {
        path: "login",
        element: <Login></Login>,
      },
      {
        path: "product",
        element: (
          <ProtectedRoute>
            <ElectricGadgetsList></ElectricGadgetsList>
          </ProtectedRoute>
        ),
      },

      {
        path: "add/:gadgetId",
        element: (
          <ProtectedRoute>
            {" "}
            <AddElectricGadgetForm></AddElectricGadgetForm>
          </ProtectedRoute>
        ),
      },

      {
        path: "sell",
        element: (
          <ProtectedRoute>
            {" "}
            <ElectricGadgets></ElectricGadgets>
          </ProtectedRoute>
        ),
      },
      {
        path: "history",
        element: (
          <ProtectedRoute>
            {" "}
            <SalesHistory />
          </ProtectedRoute>
        ),
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
