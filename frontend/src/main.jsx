import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import AdminDashboard from "./pages/AdminDashboard.jsx";
import InvestorLogin from "./pages/InvestorLogin.jsx";
import InvestorDashboard from "./pages/InvestorDashboard.jsx";



const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/register",
    element: <Register />
  },
  {
    path: "/admin/dashboard",
    element: <AdminDashboard />
  },
  {
    path: "/investor/login",
    element: <InvestorLogin />
  },
  {
    path: "/investor/dashboard",
    element: <InvestorDashboard />
  }
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
