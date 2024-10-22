import { useState } from "react";
import Logo from "../../assets/images/profit-loop.png";
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

const AdminNavbar = ({ userData }) => {
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
    navigate("/login");
  };

  return (
    <>
      {/* Desktop View */}
      <AppBar position="static" sx={{ backgroundColor: "#5F0F40" }}>
        <Toolbar sx={{ justifyContent: "space-between", py: "15px" }}>
          {/* logo */}
          <Box component="img" src={Logo} sx={{width: "100px"}} />

          {/* Desktop menu */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: { md: "center" },
            }}
          >
            <Button
              color="inherit"
              onClick={() => navigate("/admin/dashboard")}
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
                onClick={() => navigate("/admin/projects/all-projects")}
              >
                All Projects
              </MenuItem>
              {/* <MenuItem
                onClick={() => navigate("/admin/projects/contract-details")}
              >
                Contract Details
              </MenuItem>
              <MenuItem
                onClick={() => navigate("/admin/projects/project-expenses")}
              >
                Project Expenses
              </MenuItem>
              <MenuItem
                onClick={() => navigate("/admin/projects/archive-projects")}
              >
                Archive Projects
              </MenuItem> */}
            </Menu>

            {/* Investors */}
            {/* <Button
              color="inherit"
              onClick={(e) => handleMenuOpen(e, "investors")}
            >
              Investors
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={openMenu === "investors"}
              onClose={handleMenuClose}
              MenuListProps={{ onMouseLeave: handleMenuClose }}
            >
              <MenuItem
                onClick={() => navigate("/admin/investors/all-investors")}
              >
                All Investors
              </MenuItem>
              <MenuItem
                onClick={() => navigate("/admin/investors/invested-projects")}
              >
                Invested Projects
              </MenuItem>
              <MenuItem
                onClick={() =>
                  navigate("/admin/investors/investment-agreement")
                }
              >
                Investment Agreement
              </MenuItem>
              <MenuItem
                onClick={() => navigate("/admin/investors/deposit-agreement")}
              >
                Deposit Agreement
              </MenuItem>
            </Menu> */}

            {/* Financial Details */}
            {/* <Button
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
                  navigate("/admin/financial-details/profit-loss-details")
                }
              >
                Profit/Loss Details
              </MenuItem>
              <MenuItem
                onClick={() =>
                  navigate("/admin/financial-details/deposit-details")
                }
              >
                Deposit Details
              </MenuItem>
              <MenuItem
                onClick={() =>
                  navigate("/admin/financial-details/withdraw-details")
                }
              >
                Withdraw Details
              </MenuItem>
              <MenuItem
                onClick={() =>
                  navigate("/admin/financial-details/platform-profit")
                }
              >
                Platform Profit
              </MenuItem>
              <MenuItem
                onClick={() =>
                  navigate("/admin/financial-details/platform-withdraw-details")
                }
              >
                Platform Withdraw Details
              </MenuItem>
            </Menu> */}

            {/* Company */}
            <Button
              color="inherit"
              onClick={(e) => handleMenuOpen(e, "company")}
            >
              Company
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={openMenu === "company"}
              onClose={handleMenuClose}
              MenuListProps={{ onMouseLeave: handleMenuClose }}
            >
              <MenuItem onClick={() => navigate("/admin/company/departments")}>
                Departments
              </MenuItem>
              {/* <MenuItem onClick={() => navigate("/admin/company/faq")}>
                FAQ
              </MenuItem>
              <MenuItem onClick={() => navigate("/admin/company/camp")}>
                Camp
              </MenuItem>
              <MenuItem
                onClick={() => navigate("/admin/company/general-settings")}
              >
                General Settings
              </MenuItem>
              <MenuItem
                onClick={() => navigate("/admin/company/company-info-settings")}
              >
                Company Info Settings
              </MenuItem>
              <MenuItem
                onClick={() => navigate("/admin/company/currency-master")}
              >
                Currency Master
              </MenuItem>
              <MenuItem
                onClick={() => navigate("/admin/company/conversion-history")}
              >
                Conversion History
              </MenuItem> */}
            </Menu>

            {/* Reports */}
            {/* <Button
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
              <MenuItem onClick={() => navigate("/admin/reports/investors")}>
                Investors
              </MenuItem>
              <MenuItem
                onClick={() => navigate("/admin/reports/project-expenses")}
              >
                Project Expenses
              </MenuItem>
              <MenuItem
                onClick={() => navigate("/admin/reports/investor-earning")}
              >
                Investor Earning
              </MenuItem>
              <MenuItem
                onClick={() => navigate("/admin/reports/profit-loss-report")}
              >
                Profit/Loss Report
              </MenuItem>
              <MenuItem
                onClick={() => navigate("/admin/reports/deposit-by-investor")}
              >
                Deposit By Investor
              </MenuItem>
              <MenuItem
                onClick={() => navigate("/admin/reports/withdraw-by-investor")}
              >
                Withdraw By Investor
              </MenuItem>
              <MenuItem
                onClick={() => navigate("/admin/reports/investment-withdraw")}
              >
                Investment Withdraw
              </MenuItem>
              <MenuItem onClick={() => navigate("/admin/reports/statement")}>
                Statement
              </MenuItem>
            </Menu> */}

            {/* Requests */}
            <Button
              color="inherit"
              onClick={(e) => handleMenuOpen(e, "requests")}
            >
              Requests
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={openMenu === "requests"}
              onClose={handleMenuClose}
              MenuListProps={{ onMouseLeave: handleMenuClose }}
            >
              <MenuItem
                onClick={() => navigate("/admin/requests/deposit-requests")}
              >
                Deposit Requests
              </MenuItem>
              <MenuItem
                onClick={() => navigate("/admin/requests/withdraw-requests")}
              >
                Withdraw Requests
              </MenuItem>
              {/* <MenuItem
                onClick={() => navigate("/admin/requests/withdraw-transfer")}
              >
                Withdraw Transfer
              </MenuItem>
              <MenuItem
                onClick={() =>
                  navigate("/admin/requests/identity-verification")
                }
              >
                Identity Verification
              </MenuItem>
              <MenuItem onClick={() => navigate("/admin/requests/request-log")}>
                Request Log
              </MenuItem> */}
            </Menu>
          </Box>

          {/* Logout */}
          <Box
            sx={{ display: { md: "flex", xs: "none" }, alignItems: "center" }}
          >
            <Typography sx={{ marginRight: 2 }}>Hi, Admin</Typography>
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
          <ListItem button onClick={() => navigate("/admin/dashboard")}>
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
                onClick={() => navigate("/admin/projects/all-projects")}
              >
                <ListItemText primary="All Projects" />
              </ListItem>
              {/* <ListItem
                button
                onClick={() => navigate("/admin/projects/contract-details")}
              >
                <ListItemText primary="Contract Details" />
              </ListItem>
              <ListItem
                button
                onClick={() => navigate("/admin/projects/project-expenses")}
              >
                <ListItemText primary="Project Expenses" />
              </ListItem>
              <ListItem
                button
                onClick={() => navigate("/admin/projects/archive-projects")}
              >
                <ListItemText primary="Archive Projects" />
              </ListItem> */}
            </List>
          )}

          {/* <ListItem button onClick={(e) => handleMenuOpen(e, "investors")}>
            <ListItemText primary="Investors" />
            <ArrowForwardIosIcon sx={{ width: 15, marginLeft: 2 }} />
          </ListItem>
          {openMenu === "investors" && (
            <List>
              <ListItem
                button
                onClick={() => navigate("/admin/investors/all-investors")}
              >
                <ListItemText primary="All Investors" />
              </ListItem>
              <ListItem
                button
                onClick={() => navigate("/admin/investors/invested-projects")}
              >
                <ListItemText primary="Invested Projects" />
              </ListItem>
              <ListItem
                button
                onClick={() =>
                  navigate("/admin/investors/investment-agreement")
                }
              >
                <ListItemText primary="Investment Agreement" />
              </ListItem>
              <ListItem
                button
                onClick={() => navigate("/admin/investors/deposit-agreement")}
              >
                <ListItemText primary="Deposit Agreement" />
              </ListItem>
            </List>
          )} */}

          {/* <ListItem
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
                  navigate("/admin/financial-details/profit-loss-details")
                }
              >
                <ListItemText primary="Profit/Loss Details" />
              </ListItem>
              <ListItem
                button
                onClick={() =>
                  navigate("/admin/financial-details/deposit-details")
                }
              >
                <ListItemText primary="Deposit Details" />
              </ListItem>
              <ListItem
                button
                onClick={() =>
                  navigate("/admin/financial-details/withdraw-details")
                }
              >
                <ListItemText primary="Withdraw Details" />
              </ListItem>
              <ListItem
                button
                onClick={() =>
                  navigate("/admin/financial-details/platform-profit")
                }
              >
                <ListItemText primary="Platform Profit" />
              </ListItem>
              <ListItem
                button
                onClick={() =>
                  navigate("/admin/financial-details/platform-withdraw-details")
                }
              >
                <ListItemText primary="Platform Withdraw Details" />
              </ListItem>
            </List>
          )} */}

          <ListItem
            button
            onClick={(e) => handleMenuOpen(e, "company")}
          >
            <ListItemText primary="Company" />
            <ArrowForwardIosIcon sx={{ width: 15, marginLeft: 2 }} />
          </ListItem>
          {openMenu === "company" && (
            <List>
              <ListItem
                button
                onClick={() =>
                  navigate("/admin/company/departments")
                }
              >
                <ListItemText primary="Departments" />
              </ListItem>
              {/* <ListItem
                button
                onClick={() =>
                  navigate("/admin/company/faq")
                }
              >
                <ListItemText primary="FAQ" />
              </ListItem>
              <ListItem
                button
                onClick={() =>
                  navigate("/admin/company/camp")
                }
              >
                <ListItemText primary="Camp" />
              </ListItem>
              <ListItem
                button
                onClick={() =>
                  navigate("/admin/company/general-settings")
                }
              >
                <ListItemText primary="General Settings" />
              </ListItem>
              <ListItem
                button
                onClick={() =>
                  navigate("/admin/company/company-info-settings")
                }
              >
                <ListItemText primary="Company Info Settings" />
              </ListItem>
              <ListItem
                button
                onClick={() =>
                  navigate("/admin/company/currency-master")
                }
              >
                <ListItemText primary="Currency Master" />
              </ListItem>
              <ListItem
                button
                onClick={() =>
                  navigate("/admin/company/conversion-history")
                }
              >
                <ListItemText primary="Conversion History" />
              </ListItem> */}
            </List>
          )}

          {/* <ListItem button onClick={(e) => handleMenuOpen(e, "reports")}>
            <ListItemText primary="Reports" />
            <ArrowForwardIosIcon sx={{ width: 15, marginLeft: 2 }} />
          </ListItem>
          {openMenu === "reports" && (
            <List>
              <ListItem
                button
                onClick={() => navigate("/admin/reports/investors")}
              >
                <ListItemText primary="Investors" />
              </ListItem>
              <ListItem
                button
                onClick={() => navigate("/admin/reports/project-expenses")}
              >
                <ListItemText primary="Project Expenses" />
              </ListItem>
              <ListItem
                button
                onClick={() => navigate("/admin/reports/investor-earning")}
              >
                <ListItemText primary="Investor Earning" />
              </ListItem>
              <ListItem
                button
                onClick={() => navigate("/admin/reports/profit-loss-report")}
              >
                <ListItemText primary="Profit/Loss Report" />
              </ListItem>
              <ListItem
                button
                onClick={() => navigate("/admin/reports/deposit-by-investor")}
              >
                <ListItemText primary="Deposit By Investor" />
              </ListItem>
              <ListItem
                button
                onClick={() => navigate("/admin/reports/withdraw-by-investor")}
              >
                <ListItemText primary="Withdraw By Investor" />
              </ListItem>
              <ListItem
                button
                onClick={() => navigate("/admin/reports/investment-withdraw")}
              >
                <ListItemText primary="Investment Withdraw" />
              </ListItem>
              <ListItem
                button
                onClick={() => navigate("/admin/reports/statement")}
              >
                <ListItemText primary="Statement" />
              </ListItem>
            </List>
          )} */}

          <ListItem button onClick={(e) => handleMenuOpen(e, "requests")}>
            <ListItemText primary="Requests" />
            <ArrowForwardIosIcon sx={{ width: 15, marginLeft: 2 }} />
          </ListItem>
          {openMenu === "requests" && (
            <List>
              <ListItem
                button
                onClick={() =>
                  navigate("/admin/requests/deposit-requests")
                }
              >
                <ListItemText primary="Deposit Requests" />
              </ListItem>
              <ListItem
                button
                onClick={() =>
                  navigate("/admin/requests/withdraw-requests")
                }
              >
                <ListItemText primary="Withdraw Requests" />
              </ListItem>
              {/* <ListItem
                button
                onClick={() =>
                  navigate("/admin/requests/withdraw-transfer")
                }
              >
                <ListItemText primary="Withdraw Transfer" />
              </ListItem>
              <ListItem
                button
                onClick={() =>
                  navigate("/admin/requests/identity-verification")
                }
              >
                <ListItemText primary="Identity Verification" />
              </ListItem>
              <ListItem
                button
                onClick={() =>
                  navigate("/admin/requests/request-log")
                }
              >
                <ListItemText primary="Request Log" />
              </ListItem> */}
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

export default AdminNavbar;
