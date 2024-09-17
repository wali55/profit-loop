import { useState } from "react";
import Logo from "../../assets/images/samarabiz-logo.svg";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
// redux
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/slices/authSlice";

const InvestorNavbar = () => {
  // redux
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = useState(null);
  const [openMenu, setOpenMenu] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  // open/close for dropdowns
  const handleMenuOpen = (event, menu) => {
    setAnchorEl(event.currentTarget);
    setOpenMenu(menu);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setOpenMenu(null);
  };

  // mobile drawer toggle
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    // remove token token, user ID, role from local storage
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("role");

    // redirect to login page
    navigate('/login');
  }

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: "#3A1078" }}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          {/* logo */}
          <Box component="img" src={Logo} />

          {/* Desktop menu */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: { md: "center" },
            }}
          >
            <Button
              color="inherit"
              onClick={() => navigate("/investor/dashboard")}
            >
              Dashboard
            </Button>

            {/* Projects */}
            <Button
              color="inherit"
              onClick={(e) => handleMenuOpen(e, "projects")}
            >
              Projects
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={openMenu === "projects"}
              onClose={handleMenuClose}
              MenuListProps={{ onMouseLeave: handleMenuClose }}
            >
              <MenuItem
                onClick={() => navigate("/investor/projects/all-projects")}
              >
                All Projects
              </MenuItem>
              <MenuItem
                onClick={() => navigate("/investor/projects/my-projects")}
              >
                My Projects
              </MenuItem>
            </Menu>

            {/* Financial Details */}
            <Button
              color="inherit"
              onClick={(e) => handleMenuOpen(e, "financial-details")}
            >
              Financial Details
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={openMenu === "financial-details"}
              onClose={handleMenuClose}
              MenuListProps={{ onMouseLeave: handleMenuClose }}
            >
              <MenuItem
                onClick={() =>
                  navigate("/investor/financial-details/deposit-details")
                }
              >
                Deposit Details
              </MenuItem>
              <MenuItem
                onClick={() =>
                  navigate("/investor/financial-details/withdraw-details")
                }
              >
                Withdraw Details
              </MenuItem>
              <MenuItem
                onClick={() =>
                  navigate("/investor/financial-details/transaction-details")
                }
              >
                Transaction Details
              </MenuItem>
              <MenuItem
                onClick={() =>
                  navigate("/investor/financial-details/investment-withdraw")
                }
              >
                Investment Withdraw
              </MenuItem>
            </Menu>

            {/* Reports */}
            <Button
              color="inherit"
              onClick={(e) => handleMenuOpen(e, "reports")}
            >
              Reports
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={openMenu === "reports"}
              onClose={handleMenuClose}
              MenuListProps={{ onMouseLeave: handleMenuClose }}
            >
              <MenuItem
                onClick={() => navigate("/investor/reports/investment-report")}
              >
                Investment Report
              </MenuItem>
              <MenuItem
                onClick={() => navigate("/investor/reports/profit-loss-report")}
              >
                Profit/Loss Report
              </MenuItem>
              <MenuItem
                onClick={() => navigate("/investor/reports/deposit-report")}
              >
                Deposit Report
              </MenuItem>
              <MenuItem
                onClick={() => navigate("/investor/reports/withdraw-report")}
              >
                Withdraw Report
              </MenuItem>
              <MenuItem onClick={() => navigate("/investor/reports/statement")}>
                Statement
              </MenuItem>
            </Menu>

            {/* Log and history */}
            <Button
              color="inherit"
              onClick={(e) => handleMenuOpen(e, "log-history")}
            >
              Log & History
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={openMenu === "log-history"}
              onClose={handleMenuClose}
              MenuListProps={{ onMouseLeave: handleMenuClose }}
            >
              <MenuItem
                onClick={() =>
                  navigate("/investor/log-history/deposit-agreement")
                }
              >
                Deposit Agreement
              </MenuItem>
              <MenuItem
                onClick={() =>
                  navigate("/investor/log-history/investment-agreement")
                }
              >
                Investment Agreement
              </MenuItem>
              <MenuItem
                onClick={() => navigate("/investor/log-history/request-log")}
              >
                Request Log
              </MenuItem>
            </Menu>

            {/* Help */}
            <Button color="inherit" onClick={(e) => handleMenuOpen(e, "help")}>
              Help
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={openMenu === "help"}
              onClose={handleMenuClose}
              MenuListProps={{ onMouseLeave: handleMenuClose }}
            >
              <MenuItem onClick={() => navigate("/investor/help/faq")}>
                FAQ
              </MenuItem>
              <MenuItem
                onClick={() => navigate("/investor/help/terms-condition")}
              >
                Terms & Conditions
              </MenuItem>
            </Menu>
          </Box>

          {/* Logout */}
          <Box
            sx={{ display: { md: "flex", xs: "none" }, alignItems: "center" }}
          >
            <Typography sx={{ marginRight: 2 }}>
              Hi, {user?.lastName}
            </Typography>
            <Button
              size="small"
              variant="outlined"
              color="inherit"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </Box>

          {/* Mobile Icon */}
          <IconButton
            color="inherit"
            edge="end"
            aria-label="menu"
            onClick={handleDrawerToggle}
            sx={{ display: { xs: "block", md: "none" } }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer anchor="right" open={mobileOpen} onClose={handleDrawerToggle}>
        <List>
          <ListItem button onClick={() => navigate("/investor/dashboard")}>
            <ListItemText primary="Dashboard" />
          </ListItem>

          <ListItem button onClick={(e) => handleMenuOpen(e, "projects")}>
            <ListItemText primary="Projects" />
            <ArrowForwardIosIcon sx={{ width: 15, marginLeft: 2 }} />
          </ListItem>
          {openMenu === "projects" && (
            <List>
              <ListItem
                button
                onClick={() => navigate("/investor/projects/all-projects")}
              >
                <ListItemText primary="All Projects" />
              </ListItem>
              <ListItem
                button
                onClick={() => navigate("/investor/projects/my-projects")}
              >
                <ListItemText primary="My Projects" />
              </ListItem>
            </List>
          )}

          <ListItem
            button
            onClick={(e) => handleMenuOpen(e, "financial-details")}
          >
            <ListItemText primary="Financial Details" />
            <ArrowForwardIosIcon sx={{ width: 15, marginLeft: 2 }} />
          </ListItem>
          {openMenu === "financial-details" && (
            <List>
              <ListItem
                button
                onClick={() =>
                  navigate("/investor/financial-details/deposit-details")
                }
              >
                <ListItemText primary="Deposit Details" />
              </ListItem>
              <ListItem
                button
                onClick={() =>
                  navigate("/investor/financial-details/withdraw-details")
                }
              >
                <ListItemText primary="Withdraw Details" />
              </ListItem>
              <ListItem
                button
                onClick={() =>
                  navigate("/investor/financial-details/transaction-details")
                }
              >
                <ListItemText primary="Transaction Details" />
              </ListItem>
              <ListItem
                button
                onClick={() =>
                  navigate("/investor/financial-details/investment-withdraw")
                }
              >
                <ListItemText primary="Investment Withdraw" />
              </ListItem>
            </List>
          )}

          <ListItem button onClick={(e) => handleMenuOpen(e, "reports")}>
            <ListItemText primary="Reports" />
            <ArrowForwardIosIcon sx={{ width: 15, marginLeft: 2 }} />
          </ListItem>
          {openMenu === "reports" && (
            <List>
              <ListItem
                button
                onClick={() => navigate("/investor/reports/investment-report")}
              >
                <ListItemText primary="Investment Report" />
              </ListItem>
              <ListItem
                button
                onClick={() => navigate("/investor/reports/profit-loss-report")}
              >
                <ListItemText primary="Profit/Loss Report" />
              </ListItem>
              <ListItem
                button
                onClick={() => navigate("/investor/reports/deposit-report")}
              >
                <ListItemText primary="Deposit Report" />
              </ListItem>
              <ListItem
                button
                onClick={() => navigate("/investor/reports/withdraw-report")}
              >
                <ListItemText primary="Withdraw Report" />
              </ListItem>
              <ListItem
                button
                onClick={() => navigate("/investor/reports/statement")}
              >
                <ListItemText primary="Statement" />
              </ListItem>
            </List>
          )}

          <ListItem button onClick={(e) => handleMenuOpen(e, "log-history")}>
            <ListItemText primary="Log & History" />
            <ArrowForwardIosIcon sx={{ width: 15, marginLeft: 2 }} />
          </ListItem>
          {openMenu === "log-history" && (
            <List>
              <ListItem
                button
                onClick={() =>
                  navigate("/investor/log-history/deposit-agreement")
                }
              >
                <ListItemText primary="Deposit Agreement" />
              </ListItem>
              <ListItem
                button
                onClick={() =>
                  navigate("/investor/log-history/investment-agreement")
                }
              >
                <ListItemText primary="Investment Agreement" />
              </ListItem>
              <ListItem
                button
                onClick={() => navigate("/investor/log-history/log-request")}
              >
                <ListItemText primary="Log Request" />
              </ListItem>
            </List>
          )}

          <ListItem button onClick={(e) => handleMenuOpen(e, "help")}>
            <ListItemText primary="Help" />
            <ArrowForwardIosIcon sx={{ width: 15, marginLeft: 2 }} />
          </ListItem>
          {openMenu === "help" && (
            <List>
              <ListItem button onClick={() => navigate("/investor/help/faq")}>
                <ListItemText primary="FAQ" />
              </ListItem>
              <ListItem
                button
                onClick={() => navigate("/investor/help/terms-conditions")}
              >
                <ListItemText primary="Terms & Conditions" />
              </ListItem>
            </List>
          )}

          <ListItem button onClick={handleLogout}>
            Logout
          </ListItem>
        </List>
      </Drawer>
    </>
  );
};

export default InvestorNavbar;
