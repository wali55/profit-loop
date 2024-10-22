import { useNavigate } from "react-router-dom";
import Logo from "../../assets/images/profit-loop.png";
import {
  AppBar,
  Toolbar,
  Button,
  Box,
  Typography,
  TextField,
  Checkbox,
  FormControlLabel,
  Link,
} from "@mui/material";
import { useState } from "react";
import { baseUrl } from "../../Base";

const Login = () => {

  // state to store username and password
  const [formData, setFormData] = useState({
    userName: "",
    password: "",
  });

  // event handler to capture input data
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate("/");
  };

  const handleLogin = async () => {
    const { userName, password } = formData;
    try {
      const response = await fetch(`${baseUrl}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ userName, password }),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json();

      // Save token, userId and role to local storage
      localStorage.setItem('token', data?.accessToken);
      localStorage.setItem('userId', data.user.id);
      localStorage.setItem('role', data.user.role);
      localStorage.setItem('lastName', data?.user?.lastName);
      localStorage.setItem('userEmail', data?.user?.email);

      // redirect to admin dashboard
      if (data?.user?.role === "ADMIN") {
        navigate("/admin/dashboard");
      } else if (data?.user?.role === "INVESTOR") {
        navigate("/investor/dashboard");
      }
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <div>
      {/* Header Section */}
      <AppBar
        position="static"
        sx={{ backgroundColor: "#5F0F40", padding: "8px 16px" }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between", py: '12px' }}>
          <Box
            component="img"
            src={Logo}
            alt="SamaraBiz Logo"
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

      {/* Form Section */}

      <Box
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1,
          maxWidth: "500px",
          margin: "0 auto",
          p: 3,
          borderRadius: 2,
          boxShadow: 3,
          backgroundColor: "white",
          mt: 10,
          textAlign: "center",
        }}
      >
        <Typography variant="h5" gutterBottom>
          Login to SamaraBiz
        </Typography>
        <TextField
          label="Email/UserName"
          variant="outlined"
          fullWidth
          margin="normal"
          name="userName"
          size="small"
          value={formData.userName}
          onChange={handleChange}
          required
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          name="password"
          size="small"
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
          sx={{ marginTop: 2, backgroundColor: "#5F0F40" }}
          onClick={handleLogin}
        >
          Login
        </Button>
        <Link href="#" variant="body2">
          Forgot Password?
        </Link>
        <Link href="/register" variant="body2" sx={{ marginTop: 1 }}>
          Don't have an account? Register
        </Link>
      </Box>
    </div>
  );
};

export default Login;
