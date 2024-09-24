import InvestorNavbar from "../../components/investor/InvestorNavbar";
import { useState, useEffect } from "react";
import {
  Grid2,
  Card,
  CardContent,
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Box,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  TablePagination,
  Paper,
} from "@mui/material";
// footer
import Footer from "../../components/common/Footer";
// base url
import { baseUrl } from "../../Base";
// icons
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import CreditScoreIcon from '@mui/icons-material/CreditScore';

const InvestorWithdrawDetails = () => {
  // retrieve token and userId from localStorage
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  // user data
  const [userData, setUserData] = useState(null);
  // loading
  const [loading, setLoading] = useState(true);

  // deposit data
  const [withdrawData, setWithdrawData] = useState([]);
  // pagination
  const [page, setPage] = useState(0); // current page number (0 indexed)
  const [rowsPerPage, setRowsPerPage] = useState(5); // number of rows per page
  const [totalRows, setTotalRows] = useState(0); // total number of rows from API

  // get the user data
  useEffect(() => {
    // if no token or userId found then I can send redirect or error message
    if (!token || !userId) {
      console.error("No token or userId found");
      return;
    }

    // call API to get user data
    const fetchUserData = async () => {
      try {
        const response = await fetch(`${baseUrl}/investor/${userId}`, {
          method: "GET",
          headers: {
            authorization: token,
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

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
  }, []);

  // fetch withdraw data function
  const fetchWithdrawData = async () => {
    try {
      const response = await fetch(
        `${baseUrl}/withdraw_amount?pagination=true&pageNumber=${
          page + 1
        }&rowPerPage=${rowsPerPage}&investorId=${userId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: token,
          },
          credentials: "include",
        }
      );

      if (!response.ok) throw new Error("Failed to get the withdraw data");

      const data = await response.json();

      setWithdrawData(data?.data?.results || []);
      setTotalRows(data?.data?.count || 0);
    } catch (err) {
      console.error("Error", err);
    }
  };

  // get all deposit data of the user
  useEffect(() => {
    if (!token || !userId) return;
    fetchWithdrawData();
  }, [page, rowsPerPage]);

  // handle page change
  const handlePageChange = (e, newPage) => {
    setPage(newPage);
  };

  // handle rows per page change
  const handleRowsPerPageChange = (e) => {
    setRowsPerPage(parseInt(e.target.value, 10)); // 10 for decimal number system, if binary it will be 2
    setPage(0); // reset to the first page when rows per page changes
  };

  return (
    <div>
      {/* Navbar */}
      <InvestorNavbar />

      {/* Card Section */}
      <Grid2 container spacing={3} padding={3}>
        {/* Card 1 No. Of Projects */}
        <Grid2 item size={{ xs: 12, md: 6 }}>
          <Card sx={{ textAlign: "center" }}>
            <CardContent>
              <AccountBalanceWalletIcon
                sx={{ fontSize: 40, color: "purple" }}
              />
              <Typography variant="body2" color="textSecondary">
                Balance
              </Typography>
              <Typography variant="h4" fontWeight="bold">
                {userData?.availableBalance} AED
              </Typography>
            </CardContent>
          </Card>
        </Grid2>

        {/* Card 2 Total Withdrawn */}
        <Grid2 item size={{ xs: 12, md: 6 }}>
          <Card sx={{ textAlign: "center" }}>
            <CardContent>
              <CreditScoreIcon sx={{ fontSize: 40, color: "purple" }} />
              <Typography variant="body2" color="textSecondary">
                Total Withdraw
              </Typography>
              <Typography variant="h4" fontWeight="bold">
                {userData?.totalWithdraw} AED
              </Typography>
            </CardContent>
          </Card>
        </Grid2>
      </Grid2>

      <Typography variant="h5" textAlign="center" sx={{ my: 4 }}>
        Withdraw Details Summary
      </Typography>

      {/* Withdraw Summary Table */}
      <TableContainer component={Paper} sx={{ maxWidth: "97%", mx: "auto" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Ref. No.</TableCell>
              <TableCell>Withdraw Date</TableCell>
              <TableCell>Withdraw Type</TableCell>
              <TableCell>Withdraw Amount</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {withdrawData.map((item) => (
              <TableRow key={item?.withdraw_transaction_id}>
                <TableCell>{item?.withdraw_transaction_id}</TableCell>
                <TableCell>{item?.withdrawDate.slice(0, 10)}</TableCell>
                <TableCell>
                  {item?.withdrawType.charAt(0) +
                    item?.withdrawType.slice(1).toLowerCase()}
                </TableCell>
                <TableCell>{item?.withdrawalAmount}</TableCell>
                <TableCell>
                  {item?.status.charAt(0).toUpperCase() + item?.status.slice(1)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Pagination */}
        <TablePagination
          component="div"
          count={totalRows}
          page={page}
          onPageChange={handlePageChange}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleRowsPerPageChange}
          rowsPerPageOptions={[5, 10, 20]}
        />
      </TableContainer>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default InvestorWithdrawDetails;
