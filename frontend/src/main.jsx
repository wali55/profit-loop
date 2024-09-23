import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import Home from "./pages/common/Home.jsx";
import Login from "./pages/common/Login.jsx";
import Register from "./pages/investor/Register.jsx";
import AdminDashboard from "./pages/admin/AdminDashboard.jsx";
import InvestorDashboard from "./pages/investor/InvestorDashboard.jsx";
import InvestorDepositDetails from "./pages/investor/InvestorDepositDetails.jsx";
import AdminDepositRequests from "./pages/admin/AdminDepositRequests.jsx";
import InvestorsBanks from "./pages/investor/InvestorsBanks.jsx";
import InvestorWithdrawDetails from "./pages/investor/InvestorWithdrawDetails.jsx";
// redux
import { Provider } from "react-redux";
import {store} from "./redux/store";

const router = createBrowserRouter([
  // common
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  // admin
  {
    path: "/admin/dashboard",
    element: <AdminDashboard />,
  },
  {
    path: "/admin/requests/deposit-requests",
    element: <AdminDepositRequests />,
  },
  // investor
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/investor/dashboard",
    element: <InvestorDashboard />,
  },
  {
    path: "/investor/financial-details/deposit-details",
    element: <InvestorDepositDetails />,
  },
  {
    path: "/investor/financial-details/withdraw-details",
    element: <InvestorWithdrawDetails />,
  },
  {
    path: "/investor/profile/banks",
    element: <InvestorsBanks />
  }
]);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </Provider>
);

// green button color #7ABA78
// red button color #C7253E
// primary violet color #3A1078
// orange #CD5C08