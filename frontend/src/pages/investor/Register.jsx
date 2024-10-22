import {
  Link,
  AppBar,
  Toolbar,
  Box,
  Button,
  TextField,
  FormControlLabel,
  Typography,
  Container,
  Checkbox,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/images/profit-loop.png";
import { useState } from "react";
import axios from "axios";

const Register = () => {
  // state to store firstName, lastName etc.
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleHomeClick = () => {
    navigate("/");
  };

  const handleRegister = async () => {
    const { firstName, lastName, userName, email, password, confirmPassword } = formData;
    try {
      const res = await axios.post("https://samaraiz-node-backend.onrender.com/api/v1/register", {
        firstName,
        lastName,
        userName,
        email,
        password,
        confirmPassword
      });
      navigate("/login");
    } catch (error) {
      console.error("registration failed", error.response.data);
    }
  };

  return (
    <div>
      {/* Header Section */}
      <AppBar
        position="static"
        sx={{ backgroundColor: "#5F0F40", padding: "8px 16px" }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between", py: "12px" }}>
          <Box
            component="img"
            src={Logo}
            alt="SamaraBiz logo"
            sx={{ width: '100px' }}
          />
          <Button
            variant="outlined"
            size="small"
            sx={{ borderColor: "white", color: "white" }}
            onClick={handleHomeClick}
          >
            Back to Home
          </Button>
        </Toolbar>
      </AppBar>

      {/* Registration Form Section */}
      <Container sx={{ mt: 10, mb: 10 }}>
        <Box
          component="form"
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            maxWidth: "500px",
            margin: "0 auto",
            p: 3,
            borderRadius: 2,
            boxShadow: 3,
            backgroundColor: "white",
          }}
        >
          <Typography
            variant="h4"
            component="h1"
            textAlign="center"
            gutterBottom
          >
            Register
          </Typography>
          <TextField
            label="First Name"
            variant="outlined"
            name="firstName"
            onChange={handleChange}
            value={formData.firstName}
            size="small"
            required
          />
          <TextField
            label="Last Name"
            variant="outlined"
            name="lastName"
            size="small"
            onChange={handleChange}
            value={formData.lastName}
            required
          />
          <TextField
            label="Username"
            variant="outlined"
            name="userName"
            size="small"
            onChange={handleChange}
            value={formData.userName}
            required
          />
          <TextField
            label="Email"
            variant="outlined"
            name="email"
            size="small"
            onChange={handleChange}
            value={formData.email}
            type="email"
            required
          />
          <TextField
            label="Password"
            variant="outlined"
            name="password"
            size="small"
            onChange={handleChange}
            value={formData.password}
            type="password"
            required
          />
          <TextField
            label="Confirm Password"
            variant="outlined"
            name="confirmPassword"
            size="small"
            onChange={handleChange}
            value={formData.confirmPassword}
            type="password"
            required
          />

          <FormControlLabel
            size="small"
            control={<Checkbox />}
            label="I have read the terms & conditions"
          />
          <FormControlLabel size="small" control={<Checkbox />} label="I agree & continue" />
          <FormControlLabel size="small" control={<Checkbox />} label="Remember me" />

          <Button
            variant="contained"
            sx={{ backgroundColor: "#5F0F40" }}
            onClick={handleRegister}
          >
            Register
          </Button>

          <Link
            href="/login"
            variant="body2"
            sx={{ marginTop: 1, textAlign: "center" }}
          >
            Already have an account? Login
          </Link>
        </Box>
      </Container>
    </div>
  );
};

export default Register;
