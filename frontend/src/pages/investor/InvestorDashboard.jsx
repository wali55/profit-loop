import { useEffect, useMemo, useState } from "react";
import InvestorNavbar from "../../components/investor/InvestorNavbar";
import { baseUrl } from "../../Base";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/common/Footer";
import {
  AccountBalance,
  AttachMoney,
  MoneyOff,
} from "@mui/icons-material";
import { Card, CardContent, Grid2, Typography } from "@mui/material";
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

const InvestorDashboard = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  // retrieve userId from localStorage
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    // if no token or userId found then I can send redirect or error message
    if (!userId) {
      console.error("No userId found");
      return;
    }

    // call API to get user data
    const fetchUserData = async () => {
      const headers = {
        authorization: `${localStorage.getItem("token")}`,
      };
      try {
        const response = await fetch(`${baseUrl}/investor/${userId}`, {
          method: "GET",
          headers: headers,
          credentials: "include",
        });
        if (response.status === 401) {
          // alert("You are not authorized to view this page");
          // // redirect to login page
          // navigate("/login");
        }
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const data = await response.json();
        setUserData(data); // set the user data into the local state
        setLoading(false); // stop loading after the data is fetched
      } catch (err) {
        console.error("Error when fetching user data", err);
        setLoading(false); // stop loading incase of error
      }
    };

    fetchUserData();
  }, [userId]);

  // show loading message when the data is being fetched
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <InvestorNavbar />

      {/* Cards */}
      {/* Card Section */}
      <Grid2 container spacing={3} padding={3}>
        {/* Card 1 No. Of Projects */}
        <Grid2 item size={{ xs: 12, md: 6 }}>
          <Card sx={{ textAlign: "center" }}>
            <CardContent>
              <AccountBalanceWalletIcon sx={{ fontSize: 40, color: "#5F0F40" }} />
              <Typography variant="body2" color="textSecondary">
                Balance (AED)
              </Typography>
              <Typography variant="h4" fontWeight="bold">
                {userData?.availableBalance}
              </Typography>
            </CardContent>
          </Card>
        </Grid2>

        {/* Card 2 Total Withdrawn */}
        <Grid2 item size={{ xs: 12, md: 6 }}>
          <Card sx={{ textAlign: "center" }}>
            <CardContent>
              <AccountBalance sx={{ fontSize: 40, color: "#5F0F40" }} />

              <Typography variant="body2" color="textSecondary">
                Total Deposit (AED)
              </Typography>
              <Typography variant="h4" fontWeight="bold">
                {userData?.totalDeposit}
              </Typography>
            </CardContent>
          </Card>
        </Grid2>

        {/* Card 2 Total Investment */}
        <Grid2 item size={{ xs: 12, md: 6 }}>
          <Card sx={{ textAlign: "center" }}>
            <CardContent>
              <MoneyOff sx={{ fontSize: 40, color: "#5F0F40" }} />
              <Typography variant="body2" color="textSecondary">
                Total Withdraw (AED)
              </Typography>
              <Typography variant="h4" fontWeight="bold">
                {userData?.totalWithdraw}
              </Typography>
            </CardContent>
          </Card>
        </Grid2>

        {/* Card 2 Total Earning */}
        <Grid2 item size={{ xs: 12, md: 6 }}>
          <Card sx={{ textAlign: "center" }}>
            <CardContent>
              <AttachMoney sx={{ fontSize: 40, color: "#5F0F40" }} />
              <Typography variant="body2" color="textSecondary">
                Total Profit (AED)
              </Typography>
              <Typography variant="h4" fontWeight="bold">
                0
              </Typography>
            </CardContent>
          </Card>
        </Grid2>
      </Grid2>

      <Footer />
    </div>
  );
};

export default InvestorDashboard;
