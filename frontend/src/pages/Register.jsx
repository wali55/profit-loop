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
import Logo from "../assets/images/samarabiz-logo.svg";
import { useState } from "react";
import axios from "axios";

const Register = () => {
  // state to store firstName, lastName etc.
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
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
    const { firstName, lastName, username, email, password } = formData;
    try {
      const res = await axios.post("http://localhost:3000/investor/register", {
        firstName,
        lastName,
        username,
        email,
        password,
      });
      navigate("/investor/login");
    } catch (error) {
      console.error("registration failed", error.response.data);
    }
  };

  return (
    <div>
      {/* Header Section */}
      <AppBar
        position="static"
        sx={{ backgroundColor: "#3A1078", padding: "8px 16px" }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box
            component="img"
            src={Logo}
            alt="SamaraBiz logo"
            sx={{ height: 60 }}
          />
          <Button
            variant="contained"
            size="small"
            sx={{ backgroundColor: "white", color: "black" }}
            onClick={handleHomeClick}
          >
            Back to Home
          </Button>
        </Toolbar>
      </AppBar>

      {/* Registration Form Section */}
      <Container sx={{ mt: 15 }}>
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
            required
          />
          <TextField
            label="Last Name"
            variant="outlined"
            name="lastName"
            onChange={handleChange}
            value={formData.lastName}
            required
          />
          <TextField
            label="Username"
            variant="outlined"
            name="username"
            onChange={handleChange}
            value={formData.username}
            required
          />
          <TextField
            label="Email"
            variant="outlined"
            name="email"
            onChange={handleChange}
            value={formData.email}
            type="email"
            required
          />
          <TextField
            label="Password"
            variant="outlined"
            name="password"
            onChange={handleChange}
            value={formData.password}
            type="password"
            required
          />
          <TextField
            label="Confirm Password"
            variant="outlined"
            name="password"
            onChange={handleChange}
            value={formData.password}
            type="password"
            required
          />

          <FormControlLabel
            control={<Checkbox />}
            label="I have read the terms & conditions"
          />
          <FormControlLabel control={<Checkbox />} label="I agree & continue" />
          <FormControlLabel control={<Checkbox />} label="Remember me" />

          <Button
            variant="contained"
            sx={{ backgroundColor: "#3A1078" }}
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
