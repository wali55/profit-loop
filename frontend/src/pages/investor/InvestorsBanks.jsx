import InvestorNavbar from "../../components/investor/InvestorNavbar";
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Grid2,
  TextField,
  DialogActions,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { baseUrl } from "../../Base";
import Footer from "../../components/common/Footer";

const InvestorsBanks = () => {
  // retrieve token and userId from localStorage
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  // initial form data
  const initialFormData = {
    bankName: "",
    branchName: "",
    accountNumber: "",
    accountHolderName: "",
    region: "",
    nomineeName: "",
  };

  // create deposit from
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  // bank data
  const [bankData, setBankData] = useState([]);

  // open create bank dialog form
  const handleClickOpen = () => setOpen(true);

  // close create bank dialog form
  const handleClose = () => {
    setFormData(initialFormData);
    setOpen(false);
  };

  // handle form changes (add bank)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // get all the banks of this investor
  const fetchBankData = async () => {
    try {
      const response = await fetch(
        `${baseUrl}/investorBankInfo?investorId=${userId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: token,
          },
          credentials: "include",
        }
      );

      if (!response.ok)
        throw new Error("Error occur when try to get banks of the investor.");

      const data = await response.json();
      setBankData(data || []); // bank data got from api store it into local storage
    } catch (err) {
      console.error("Error", err);
    }
  };

  // when load this page call bank data
  useEffect(() => {
    fetchBankData();
  }, []);

  // submit user data to add a bank
  const handleSubmit = async () => {
    const payload = {
      bankName: formData.bankName,
      branchName: formData.branchName,
      accountNumber: formData.accountNumber,
      accountHolderName: formData.accountHolderName,
      region: formData.region,
      nomineeName: formData.nomineeName,
      status: "approved",
    };

    // send post req to backend server to create a bank
    try {
      const response = await fetch(
        `${baseUrl}//investorBankInfo?investorId=${userId}`,
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

      if (!response.ok) throw new Error("Error occur during creating bank");

      await fetchBankData(); // get bank data again any time user create a new bank
      handleClose(); // close the dialog form
    } catch (err) {
      console.error("Error:", err);
    }
  };

  // Update a bank make it active
  const handleActiveClick = async (bankId) => {
    const payload = {
      status: "approved",
    };

    try {
      const response = await fetch(
        `${baseUrl}/investorBankInfo/${bankId}?investorId=${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            authorization: token,
          },
          credentials: "include",
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok)
        throw new Error("Error occur when updating the bank status");

      await response.json();
      
      fetchBankData(); // call to fetch updated bank data and rerender the component again
    } catch (err) {
      console.error("Error: ", err);
    }
  };

  return (
    <div>
      <InvestorNavbar userId={userId} />

      {/* Banks */}
      <Typography variant="h5" sx={{ textAlign: "center", m: 3 }}>
        My Banks
      </Typography>

      {/* Create Bank Button */}
      <Box textAlign="right" m={2}>
        <Button
          variant="outlined"
          size="small"
          sx={{ borderColor: "#5F0F40", color: "#5F0F40" }}
          onClick={handleClickOpen}
        >
          Add Bank
        </Button>
      </Box>

      {/* Bank List */}
      <Grid2
        container
        sx={{ maxWidth: "97%", mx: "auto", justifyContent: "center" }}
      >
        {bankData.map((item) => (
          <Grid2 item key={item.id} size={{ xs: 12, md: 5 }} sx={{ m: 1 }}>
            <Card sx={{ height: "170px" }}>
              <CardContent>
                <Typography variant="h6" component="div" mb={2}>
                  {item.bankName} - {item.branchName}
                </Typography>
                <Typography color="textSecondary" mb={1}>
                  {item.accountHolderName}
                </Typography>
                <Typography variant="body2" color="textSecondary" mb={1}>
                  Account Number: {item.accountNumber}
                </Typography>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography
                    sx={{ fontWeight: "bold" }}
                    color={item?.status === "approved" ? "#7ABA78" : "#CD5C08"}
                  >
                    Status:{" "}
                    {item?.status === 'approved' ? "Active" : "Inactive"}
                  </Typography>
                  {item?.status === "pending" && (
                    <Button
                      onClick={() => handleActiveClick(item?.id)}
                      size="small"
                      variant="outlined"
                      sx={{ borderColor: "#5F0F40", color: "#5F0F40" }}
                    >
                      Make Active
                    </Button>
                  )}
                </Box>
              </CardContent>
            </Card>
          </Grid2>
        ))}
      </Grid2>

      {/* Create Bank Dialog form */}
      <Dialog open={open} onClose={handleClose}>
        {/* Dialog Title */}
        <DialogTitle>Deposit Request</DialogTitle>
        {/* Dialog Content */}
        <DialogContent>
          <Grid2 container spacing={2}>
            {/* Bank Name */}
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

            {/* Branch Name */}
            <Grid2 item size={12} minWidth={300}>
              <TextField
                size="small"
                fullWidth
                label="Branch Name"
                name="branchName"
                value={formData.branchName}
                onChange={handleChange}
                required
              />
            </Grid2>

            {/* Account Number */}
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

            {/* Account Holder Name */}
            <Grid2 item size={12} minWidth={300}>
              <TextField
                size="small"
                fullWidth
                label="Account Holder Name"
                name="accountHolderName"
                value={formData.accountHolderName}
                onChange={handleChange}
                required
              />
            </Grid2>

            {/* Region */}
            <Grid2 item size={12} minWidth={300}>
              <TextField
                size="small"
                fullWidth
                label="Region"
                name="region"
                value={formData.region}
                onChange={handleChange}
                required
              />
            </Grid2>

            {/* Nominee Name */}
            <Grid2 item size={12} minWidth={300}>
              <TextField
                size="small"
                fullWidth
                label="Nominee Name"
                name="nomineeName"
                value={formData.nomineeName}
                onChange={handleChange}
              />
            </Grid2>
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
            sx={{ borderColor: "#5F0F40", color: "#5F0F40" }}
          >
            Add Bank
          </Button>
        </DialogActions>
      </Dialog>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default InvestorsBanks;
