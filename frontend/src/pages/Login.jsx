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

const Login = () => {
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate("/");
  };

  const handleLogin = () => {};

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
            required
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
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
