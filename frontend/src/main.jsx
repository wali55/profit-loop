import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
// common
import Home from "./pages/common/Home.jsx";
import Login from "./pages/common/Login.jsx";
// admin
import AdminDashboard from "./pages/admin/AdminDashboard.jsx";
import AdminDepositRequests from "./pages/admin/AdminDepositRequests.jsx";
import AdminWithdrawRequests from "./pages/admin/AdminWithdrawRequests.jsx";
import AdminDepartments from "./pages/admin/AdminDepartments.jsx";
import AdminAllProjects from "./pages/admin/AdminAllProjects.jsx";
// investors
import Register from "./pages/investor/Register.jsx";
import InvestorDashboard from "./pages/investor/InvestorDashboard.jsx";
import InvestorDepositDetails from "./pages/investor/InvestorDepositDetails.jsx";
import InvestorsBanks from "./pages/investor/InvestorsBanks.jsx";
import InvestorWithdrawDetails from "./pages/investor/InvestorWithdrawDetails.jsx";
// redux
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { SocketProvider } from "./Provider.jsx";
import InvestorAllProjects from "./pages/investor/InvestorAllProjects.jsx";
import InvestorMyProjects from "./pages/investor/InvestorMyProjects.jsx";
import AdminProjectExpenses from "./pages/admin/AdminProjectExpenses.jsx";

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
  {
    path: "/admin/requests/withdraw-requests",
    element: <AdminWithdrawRequests />,
  },
  {
    path: "/admin/company/departments",
    element: <AdminDepartments />,
  },
  {
    path: "/admin/projects/all-projects",
    element: <AdminAllProjects />,
  },
  {
    path: "/admin/projects/project-expenses",
    element: <AdminProjectExpenses />,
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
    element: <InvestorsBanks />,
  },
  {
    path: "/investor/projects/all-projects",
    element: <InvestorAllProjects />,
  },
  {
    path: "/investor/projects/my-projects",
    element: <InvestorMyProjects />,
  },
]);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <SocketProvider>
      <RouterProvider router={router}>
        <App />
      </RouterProvider>
    </SocketProvider>
  </Provider>
);

// socket provider

// green button color #7ABA78
// red button color #C7253E
// primary violet color #3A1078
// orange #CD5C08
// icon color purple
