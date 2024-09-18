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
} from "@mui/material";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import AddCardIcon from "@mui/icons-material/AddCard";
// notification
import { useSnackbar } from "notistack";

const InvestorDepositDetails = () => {
    // Initial form data state
    const initialFormData = {
      depositAmount: null,
      bankName: '',
      branchName: '',
      accountNumber: '',
      accountHolderName: '',
      region: ''
    };

  // notification
  const { enqueueSnackbar } = useSnackbar();

  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  // token
  const [token, setToken] = useState("");
  // create deposit from
  const [open, setOpen] = useState(false);
  const [depositType, setDepositType] = useState("CASH");
  const [formData, setFormData] = useState(initialFormData);

  // get the user id and
  useEffect(() => {
    // retrieve token and userId from localStorage
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    // set token to local state
    setToken(token);

    // if no token or userId found then I can send redirect or error message
    if (!token || !userId) {
      console.error("No token or userId found");
      return;
    }

    // call API to get user data
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          `https://samaraiz-node-backend.onrender.com/api/v1/investor/${userId}`,
          {
            method: "GET",
            headers: {
              Authorization: `${token}`,
              "Content-Type": "application/json",
            },
          }
        );

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

  // handle open/close dialog (of create deposit)
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => {
    // Clear form fields when the dialog closes
    setFormData(initialFormData); 
    setDepositType('CASH');
    setOpen(false)
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
      enqueueSnackbar("Deposit amount is required.", { variant: "error" });
      return false;
    }
    if (
      depositType === "BANK" &&
      (!formData.bankName || !formData.accountNumber)
    ) {
      enqueueSnackbar("Bank name and account number is required.", {
        variant: "error",
      });
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
            Authorization: token,
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) throw new Error("Deposit request failed!");

      enqueueSnackbar("Deposit request sent successfully.", {
        variant: "success",
      });
      handleClose(); // close the create deposit dialog
    } catch (err) {
      enqueueSnackbar("Error: " + err.message, { variant: "error" });
    }
  };

  // show loading message when the data is being fetched
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {/* Navbar */}
      <InvestorNavbar userData={userData} />

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
      <Box>
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
              <Grid2 item size={12} minWidth={300}>
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
          <DialogActions sx={{mr: 2, mb: 1}}>
            <Button size="small" onClick={handleClose} variant="outlined" color="error">Cancel</Button>
            <Button size="small" onClick={handleSubmit} sx={{backgroundColor: '#3A1078', color: 'white'}}>Send Request</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </>
  );
};

export default InvestorDepositDetails;
