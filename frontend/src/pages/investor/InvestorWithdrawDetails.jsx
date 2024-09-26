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
import CreditScoreIcon from "@mui/icons-material/CreditScore";
// from otp ui library
import { MuiOtpInput } from "mui-one-time-password-input";

const InvestorWithdrawDetails = () => {
  // retrieve token and userId from localStorage
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  // user data
  const [userData, setUserData] = useState(null);
  // loading
  const [loading, setLoading] = useState(true);

  // create deposit from
  const [open, setOpen] = useState(false);
  const [withdrawType, setWithdrawType] = useState("CASH");
  const [withdrawAmount, setWithdrawAmount] = useState("");

  // withdraw data
  const [withdrawData, setWithdrawData] = useState([]);
  // pagination
  const [page, setPage] = useState(0); // current page number (0 indexed)
  const [rowsPerPage, setRowsPerPage] = useState(5); // number of rows per page
  const [totalRows, setTotalRows] = useState(0); // total number of rows from API

  // state to implement otp
  const [otpDialog, setOtpDialog] = useState(false);
  const [otp, setOtp] = useState("");
  const [counter, setCounter] = useState(60);
  const [resendDisabled, setResendDisabled] = useState(true);

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

  // get the active bank
  const activeBankObj = userData?.investor_bank_info.filter(
    (item) => item?.status === "approved"
  )[0];
  const activeBankName = activeBankObj?.bankName;

  // get user email
  const userEmail = userData?.user?.email;

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

  // handle open/close dialog (of create deposit)
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => {
    // Clear form fields when the dialog closes
    setWithdrawAmount("");
    setWithdrawType("CASH");
    setOpen(false);
  };

  // change withdraw type
  const handleWithdrawTypeChange = (e) => setWithdrawType(e.target.value);

  // handle rows per page change
  const handleRowsPerPageChange = (e) => {
    setRowsPerPage(parseInt(e.target.value, 10)); // 10 for decimal number system, if binary it will be 2
    setPage(0); // reset to the first page when rows per page changes
  };

  // create a withdraw request which will hit the backend to get the otp
  const handleSubmit = async () => {
    try {
      const response = await fetch(`${baseUrl}/request_for_otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
        credentials: "include",
        body: JSON.stringify({
          email: userEmail,
          usingFor: "withdraw_amount_request",
        }),
      });

      if (response.ok) {
        setOpen(false);
        setOtpDialog(true);
        setResendDisabled(true);
        setCounter(60);
        startCountdown();
      }
    } catch (err) {
      console.error("Error when sending withdraw request", err);
    }
  };

  // handle confirm otp and submit withdraw request
  const handleConfirmOtp = async () => {
    try {
      const response = await fetch(`${baseUrl}/withdraw_amount`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
        credentials: "include",
        body: JSON.stringify({
          email: userEmail,
          otp: Number(otp),
          usingFor: "withdraw_amount_request",
          withdrawalAmount: Number(withdrawAmount),
          investorId: userData?.userId,
          withdrawType: withdrawType,
          bankInfoId: withdrawType === "BANK" ? activeBankObj?.id : null,
        }),
      });

      if (response.ok) {
        setOtpDialog(false); // close otp dialog
      }
      await response.json();
      fetchWithdrawData();
    } catch (err) {
      console.error("Error occur when confirming otp", err);
    }
  };

  // handle resend otp
  const handleResendOtp = async () => {
    try {
      const response = await fetch(`${baseUrl}/request_for_otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
        credentials: "include",
        body: JSON.stringify({
          email: userEmail,
          usingFor: "withdraw_amount_request",
        }),
      });

      if (response.ok) {
        setResendDisabled(true);
        setCounter(60);
        startCountdown();
      }
    } catch (err) {
      console.error("Error occur when resending otp", err);
    }
  };

  // countdown for resend otp button
  const startCountdown = () => {
    const interval = setInterval(() => {
      setCounter((prevCounter) => {
        if (prevCounter === 1) {
          clearInterval(interval);
          setResendDisabled(false);
        }
        return prevCounter - 1;
      });
    }, 1000);
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

      {/* Withdraw Request Button */}
      <Box textAlign="right" m={2}>
        <Button
          variant="outlined"
          size="small"
          sx={{ borderColor: "#3A1078", color: "#3A1078" }}
          onClick={handleClickOpen}
        >
          New Withdraw
        </Button>
      </Box>

      {/* Create Deposit Request Dialog form */}
      <Dialog open={open} onClose={handleClose}>
        {/* Dialog Title */}
        <DialogTitle>Withdraw Request</DialogTitle>
        {/* Dialog Content */}
        <DialogContent>
          <Grid2 container spacing={2}>
            {/* Withdraw Amount */}
            <Grid2 item size={12} minWidth={300}>
              <TextField
                size="small"
                fullWidth
                label="Withdraw Amount (AED)"
                name="withdrawAmount"
                type="number"
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(e.target.value)}
                required
              />
            </Grid2>

            {/* Withdraw Type */}
            <Grid2 item size={12} minWidth={300}>
              <FormControl fullWidth>
                <InputLabel>Withdraw Type</InputLabel>
                <Select
                  size="small"
                  value={withdrawType}
                  onChange={handleWithdrawTypeChange}
                  name="withdrawType"
                >
                  <MenuItem value="CASH">Cash</MenuItem>
                  <MenuItem value="BANK">Bank</MenuItem>
                </Select>
              </FormControl>
            </Grid2>

            {/* Show bank details if withdraw type is Bank */}
            {withdrawType === "BANK" && (
              <Grid2 item size={12} minWidth={300}>
                <TextField
                  disabled
                  size="small"
                  fullWidth
                  label="Bank Name"
                  defaultValue={activeBankName}
                />
              </Grid2>
            )}
          </Grid2>
        </DialogContent>
        <DialogActions sx={{ mr: 2, mb: 1 }}>
          <Button
            size="small"
            onClick={handleClose}
            variant="outlined"
            color="error"
          >
            Cancel
          </Button>
          <Button
            variant="outlined"
            size="small"
            onClick={handleSubmit}
            sx={{ borderColor: "#3A1078", color: "#3A1078" }}
          >
            Send Request
          </Button>
        </DialogActions>
      </Dialog>

      {/* otp dialog */}
      <Dialog open={otpDialog} >
        <DialogTitle>Enter OTP</DialogTitle>
        <Typography variant="body2" sx={{ml: 3, fontWeight: 'bold'}}>Please check your email: {userEmail}</Typography>
        <DialogContent>
          <Grid2 container spacing={2}>
            <Grid2 item size={12} minWidth={300}>
              <MuiOtpInput value={otp} onChange={setOtp} />
            </Grid2>
          </Grid2>
        </DialogContent>
        <DialogActions>
          <Button size="small" variant="outlined" sx={{borderColor: '#CD5C08', color: '#CD5C08', mb: 2}} onClick={handleResendOtp} disabled={resendDisabled}>
            {`Resend OTP (${counter}s)`}
          </Button>
          <Button size="small" variant="outlined" sx={{borderColor: '#3A1078', color: '#3A1078', mr: 2, mb: 2}} onClick={handleConfirmOtp}>Confirm</Button>
        </DialogActions>
      </Dialog>

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
