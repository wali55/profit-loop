import { useEffect, useState } from "react";
import InvestorNavbar from "../../components/investor/InvestorNavbar";
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
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import AddCardIcon from "@mui/icons-material/AddCard";
// footer
import Footer from "../../components/common/Footer";
// base url
import { baseUrl } from "../../Base";

const InvestorDepositDetails = () => {
  // retrieve token and userId from localStorage
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  // Initial form data state
  const initialFormData = {
    depositAmount: null,
    bankName: "",
    branchName: "",
    accountNumber: "",
    accountHolderName: "",
    region: "",
  };

  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  // create deposit from
  const [open, setOpen] = useState(false);
  const [depositType, setDepositType] = useState("CASH");
  const [formData, setFormData] = useState(initialFormData);
  // deposit data
  const [depositData, setDepositData] = useState([]);
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

  // fetch deposit data function
  const fetchDepositData = async () => {
    try {
      const response = await fetch(
        `${baseUrl}/deposit?investorId=${userId}&pagination=true&pageNumber=${
          page + 1
        }&rowPerPage=${rowsPerPage}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: token,
          },
          credentials: "include",
        }
      );

      if (!response.ok) throw new Error("Failed to get the deposit data");

      const data = await response.json();
      setDepositData(data?.data?.results || []);
      setTotalRows(data?.data?.count || 0);
    } catch (error) {
      console.error("Error when fetching deposit data", error);
    }
  };

  // get all deposit data of the user
  useEffect(() => {
    if (!token || !userId) return;
    fetchDepositData();
  }, [page, rowsPerPage]);

  // handle open/close dialog (of create deposit)
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => {
    // Clear form fields when the dialog closes
    setFormData(initialFormData);
    setDepositType("CASH");
    setOpen(false);
  };

  // handle form changes (of create deposit)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDepositTypeChange = (e) => setDepositType(e.target.value);

  // validate create deposit form data before submitting
  const validateForm = () => {
    if (!formData.depositAmount) {
      console.error("deposit value is required");
      return false;
    }
    if (
      depositType === "BANK" &&
      (!formData.bankName || !formData.accountNumber)
    ) {
      console.error("bank name and account number is required");
      return false;
    }
    return true;
  };

  // handle submit (create deposit form)
  const handleSubmit = async () => {
    if (!validateForm()) return;

    // when we submit create deposit form we will make a post req with this payload in req body
    const payload = {
      investor: userData?.userId,
      depositType,
      depositAmount: Number(formData.depositAmount),
      ...(depositType === "BANK" && {
        bankName: formData.bankName,
        accountNumber: formData.accountNumber,
        branchName: formData.branchName,
        accountHolderName: formData.accountHolderName,
        region: formData.region,
      }),
    };

    // send backend post req when submitting create deposit req
    try {
      const response = await fetch(
        "https://samaraiz-node-backend.onrender.com/api/v1/deposit",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: token,
          },
          credentials: "include",
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) throw new Error("Deposit request failed!");

      console.log("deposit request is sent successfully");
      await fetchDepositData();
      handleClose(); // close the create deposit dialog
    } catch (err) {
      console.error("error", err);
    }
  };

  // handle page change
  const handlePageChange = (e, newPage) => {
    setPage(newPage);
  };

  // handle rows per page change
  const handleRowsPerPageChange = (e) => {
    setRowsPerPage(parseInt(e.target.value, 10)); // 10 for decimal number system, if binary it will be 2
    setPage(0); // reset to the first page when rows per page changes
  };

  // show loading message when the data is being fetched
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
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
              <AddCardIcon sx={{ fontSize: 40, color: "purple" }} />
              <Typography variant="body2" color="textSecondary">
                Total Deposit
              </Typography>
              <Typography variant="h4" fontWeight="bold">
                {userData?.totalDeposit} AED
              </Typography>
            </CardContent>
          </Card>
        </Grid2>
      </Grid2>

      {/* Create Deposit Request */}
      <Box sx={{ mt: 5 }}>
        {/* Deposit Summary Header */}
        <Box textAlign="center">
          <Typography variant="h5">Deposit Details Summary</Typography>
        </Box>

        {/* Create Deposit Request Button */}
        <Box textAlign="right" m={2}>
          <Button
            variant="outlined"
            size="small"
            sx={{ borderColor: "#3A1078", color: "#3A1078" }}
            onClick={handleClickOpen}
          >
            New Deposit
          </Button>
        </Box>

        {/* Create Deposit Request Dialog form */}
        <Dialog open={open} onClose={handleClose}>
          {/* Dialog Title */}
          <DialogTitle>Deposit Request</DialogTitle>
          {/* Dialog Content */}
          <DialogContent>
            <Grid2 container spacing={2}>
              {/* Deposit Amount */}
              <Grid2 item size={12} minWidth={300} mt={1}>
                <TextField
                  size="small"
                  fullWidth
                  label="Deposit Amount (AED)"
                  name="depositAmount"
                  type="number"
                  value={formData.depositAmount}
                  onChange={handleChange}
                  required
                />
              </Grid2>

              {/* Deposit Type */}
              <Grid2 item size={12} minWidth={300}>
                <FormControl fullWidth>
                  <InputLabel>Deposit Type</InputLabel>
                  <Select
                    size="small"
                    value={depositType}
                    onChange={handleDepositTypeChange}
                    name="depositType"
                    label="Deposit Type"
                  >
                    <MenuItem value="CASH">Cash</MenuItem>
                    <MenuItem value="BANK">Bank</MenuItem>
                  </Select>
                </FormControl>
              </Grid2>

              {/* Show bank details if deposit type is Bank */}
              {depositType === "BANK" && (
                <>
                  <Grid2 item size={12} minWidth={300}>
                    <TextField
                      size="small"
                      fullWidth
                      label="Bank Name"
                      name="bankName"
                      value={formData.bankName}
                      onChange={handleChange}
                      required
                    />
                  </Grid2>
                  <Grid2 item size={12} minWidth={300}>
                    <TextField
                      size="small"
                      fullWidth
                      label="Branch Name"
                      name="branchName"
                      value={formData.branchName}
                      onChange={handleChange}
                    />
                  </Grid2>
                  <Grid2 item size={12} minWidth={300}>
                    <TextField
                      size="small"
                      fullWidth
                      label="Account Number"
                      name="accountNumber"
                      value={formData.accountNumber}
                      onChange={handleChange}
                      required
                    />
                  </Grid2>
                  <Grid2 item size={12} minWidth={300}>
                    <TextField
                      size="small"
                      fullWidth
                      label="Account Holder Name"
                      name="accountHolderName"
                      value={formData.accountHolderName}
                      onChange={handleChange}
                    />
                  </Grid2>
                  <Grid2 item size={12} minWidth={300}>
                    <TextField
                      size="small"
                      fullWidth
                      label="Region"
                      name="region"
                      value={formData.region}
                      onChange={handleChange}
                    />
                  </Grid2>
                </>
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
      </Box>

      {/* Deposit Summary Table */}
      <TableContainer component={Paper} sx={{ maxWidth: "97%", mx: "auto" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Ref. No.</TableCell>
              <TableCell>Deposit Date</TableCell>
              <TableCell>Deposit Type</TableCell>
              <TableCell>Deposit Amount</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {depositData.map((item) => (
              <TableRow key={item?.deposit_transaction_id}>
                <TableCell>{item?.deposit_transaction_id}</TableCell>
                <TableCell>{item?.depositDate.slice(0, 10)}</TableCell>
                <TableCell>
                  {item?.depositType.charAt(0) +
                    item?.depositType.slice(1).toLowerCase()}
                </TableCell>
                <TableCell>{item?.depositAmount}</TableCell>
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
    </>
  );
};

export default InvestorDepositDetails;
