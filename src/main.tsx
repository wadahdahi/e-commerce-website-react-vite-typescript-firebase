import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { store } from "./redux/store";
import "./index.css";
import { AuthProvider } from "@/context/AuthContext";
import { AdminRoute } from "@/components/auth/AdminRoute";

// Layout
import MainLayout from "@/layouts/MainLayout/MainLayout";

// Pages
import HomePage from "@/pages/HomePage/HomePage";
import ProductsPage from "@/pages/ProductsPage/ProductsPage";
import ProductDetailsPage from "@/pages/ProductDetailsPage/ProductDetailsPage";
import ContactPage from "@/pages/ContactPage/ContactPage";
import CartPage from "@/pages/CartPage/CartPage";
import CheckoutPage from "./pages/CheckoutPage/CheckoutPage";
import DashboardOverview from "./pages/Dashboard/DashboardOverview";
import NotFound from "./pages/NotFound/NotFound";
import Singup from "./pages/Singup/Singup";
import Login from "./pages/Login/Login";
import SetupAdmin from "./pages/SetupAdmin/SetupAdmin";

import TestFirestore from "./pages/TestFirestore/TestFirestore";
import UsersPage from "./pages/Dashboard/Users/UsersPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "test-db",
        element: (
          <AdminRoute>
            <TestFirestore />
          </AdminRoute>
        ),
      },
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "overview",
        element: (
          <AdminRoute>
            <DashboardOverview />
          </AdminRoute>
        ),
      },
      {
        path: "products",
        element: <ProductsPage />,
      },
      {
        path: "products/:id",
        element: <ProductDetailsPage />,
      },
      {
        path: "contact",
        element: <ContactPage />,
      },
      {
        path: "cart",
        element: <CartPage />,
      },
      {
        path: "checkout",
        element: <CheckoutPage />,
      },
      {
        path: "users",
        element: (
          <AdminRoute>
            <UsersPage />
          </AdminRoute>
        ),
      },
      {
        path: "setup-admin",
        element: <SetupAdmin />,
      },
      {
        path: "singup",
        element: <Singup />,
      },
      {
        path: "login",
        element: <Login />,
      },
    ],
    errorElement: <NotFound />,
  },
]);

import { SmoothScroll } from "@/components/common/Scroll/SmoothScroll";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <AuthProvider>
        <SmoothScroll>
          <RouterProvider router={router} />
        </SmoothScroll>
      </AuthProvider>
    </Provider>
  </React.StrictMode>,
);
