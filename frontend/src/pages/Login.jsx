import { useNavigate } from "react-router-dom";
import Logo from "../assets/images/samarabiz-logo.svg";
import {
  AppBar,
  Toolbar,
  Button,
  Box,
  Grid2,
  Typography,
  TextField,
  Checkbox,
  FormControlLabel,
  Link,
} from "@mui/material";
import axios from "axios";
import { useState } from "react";

const Login = () => {
  // state to store username and password
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  })

  // event handler to capture input data
  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }))
  }

  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate("/");
  };

  const handleLogin = async () => {
    const {username, password} = formData;
    try {
      const res = await axios.post("http://localhost:3000/admin/login", {
        username,
        password,
      });
      localStorage.setItem("token", res.data.token);

      // redirect to admin dashboard
      navigate('/admin/dashboard');
    } catch (error) {
      console.error("login failed", error.response.data);
    }
    y;
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
            alt="SamaraBiz Logo"
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

      {/* Form Section */}
      <Grid2
        container
        justifyContent="center"
        alignItems="center"
        sx={{ height: "80vh" }}
      >
        <Box component="form" sx={{ width: 300, textAlign: "center" }}>
          <Typography variant="h5" gutterBottom>
            Login to SamaraBiz
          </Typography>
          <TextField
            label="Email/Username"
            variant="outlined"
            fullWidth
            margin="normal"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            name="password"
            fullWidth
            margin="normal"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <FormControlLabel
            control={<Checkbox />}
            label="Remember Me"
            sx={{ textAlign: "left", marginRight: 20 }}
          />
          <Button
            variant="contained"
            fullWidth
            sx={{ marginTop: 2, backgroundColor: "#3A1078" }}
            onClick={handleLogin}
          >
            Login
          </Button>
          <Grid2 container justifyContent="center" sx={{ marginTop: 2 }}>
            <Link href="#" variant="body2">
              Forgot Password?
            </Link>
            <Link href="/register" variant="body2" sx={{ marginTop: 1 }}>
              Don't have an account? Register
            </Link>
          </Grid2>
        </Box>
      </Grid2>
    </div>
  );
};

export default Login;
