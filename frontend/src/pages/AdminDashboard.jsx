import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Button,
  Menu,
  MenuItem,
  Box,
  Typography,
  Card,
  CardContent,
  Grid2
} from "@mui/material";
import Logo from "../assets/images/samarabiz-logo.svg";
import { useNavigate } from "react-router-dom";
import {Work, AccountBalance, AttachMoney, MoneyOff} from "@mui/icons-material";

const AdminDashboard = () => {
  const navigate = useNavigate();

  // state for the open menus
  const [anchorEl, setAnchorEl] = useState(null);
  const [openMenu, setOpenMenu] = useState(null);

  // open the submenus
  const handleMenuOpen = (event, menuName) => {
    setAnchorEl(event.currentTarget);
    setOpenMenu(menuName);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setOpenMenu(null);
  };

  //logout function
  const handleLogout = () => {
    // logout logic
    navigate("/admin/login");
  };

  return (
    <div>
      {/* Nav section */}
      <AppBar position="static" sx={{ backgroundColor: "#3A1078" }}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          {/* logo on the left */}
          <Box
            component="img"
            src={Logo}
            alt="samarabiz-logo"
            sx={{ height: 50, cursor: "pointer" }}
          />

          {/* Menu items in the middle */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {/* Dashboard menu item */}
            <Button
              color="inherit"
              onClick={() => navigate("/admin/dashboard")}
            >
              Dashboard
            </Button>

            {/* Projects menu */}
            <Button
              color="inherit"
              onClick={
                openMenu
                  ? () => handleMenuClose
                  : (e) => handleMenuOpen(e, "projects")
              }
            >
              Projects
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={openMenu === "projects"}
              onClose={handleMenuClose}
              MenuListProps={{ onClick: handleMenuClose }}
            >
              <MenuItem onClick={() => navigate("/admin/projects/all")}>
                All Projects
              </MenuItem>
              <MenuItem onClick={() => navigate("/admin/projects/contracts")}>
                Contract Details
              </MenuItem>
              <MenuItem onClick={() => navigate("/admin/projects/expenses")}>
                Project Expenses
              </MenuItem>
              <MenuItem onClick={() => navigate("/admin/projects/archive")}>
                Archive Projects
              </MenuItem>
            </Menu>

            {/* Investors Menu */}
            <Button
              color="inherit"
              onClick={
                openMenu
                  ? () => handleMenuClose
                  : (e) => handleMenuOpen(e, "investors")
              }
            >
              Investors
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={openMenu === "investors"}
              onClose={handleMenuClose}
              MenuListProps={{ onClick: handleMenuClose }}
            >
              <MenuItem onClick={() => navigate("/admin/investors/all")}>
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
            </Menu>

            {/* Financial details menu */}
            <Button
              color="inherit"
              onClick={
                openMenu
                  ? () => handleMenuClose()
                  : (e) => handleMenuOpen(e, "financial")
              }
            >
              Financial Details
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={openMenu === "financial"}
              onClose={handleMenuClose}
              MenuListProps={{ onClick: handleMenuClose }}
            >
              <MenuItem
                onClick={() => navigate("/admin/financial/profit-details")}
              >
                Profit Details
              </MenuItem>
              <MenuItem
                onClick={() => navigate("/admin/financial/withdraw-details")}
              >
                Withdraw Details
              </MenuItem>
              <MenuItem
                onClick={() => navigate("/admin/financial/deposit-details")}
              >
                Deposit Details
              </MenuItem>
              <MenuItem
                onClick={() => navigate("/admin/financial/platform-profit")}
              >
                Platform Profit
              </MenuItem>
              <MenuItem
                onClick={() => navigate("/admin/financial/platform-withdraw")}
              >
                Platform Withdraw Details
              </MenuItem>
            </Menu>

            {/* Company */}
            <Button
              color="inherit"
              onClick={
                openMenu
                  ? () => handleMenuClose()
                  : (e) => handleMenuOpen(e, "company")
              }
            >
              Company
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={openMenu === "company"}
              onClose={handleMenuClose}
              MenuListProps={{ onClick: handleMenuClose }}
            >
              <MenuItem onClick={() => navigate("/admin/company/departments")}>
                Departments
              </MenuItem>
              <MenuItem onClick={() => navigate("/admin/company/faq")}>
                FAQ
              </MenuItem>
              <MenuItem onClick={() => navigate("/admin/company/camp")}>
                Camp
              </MenuItem>
              <MenuItem onClick={() => navigate("/admin/company/general")}>
                General Settings
              </MenuItem>
              <MenuItem onClick={() => navigate("/admin/company/company-info")}>
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
              </MenuItem>
            </Menu>

            {/* Reports */}
            <Button
              color="inherit"
              onClick={
                openMenu
                  ? () => handleMenuClose()
                  : (e) => handleMenuOpen(e, "reports")
              }
            >
              Reports
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={openMenu === "reports"}
              onClose={handleMenuClose}
              MenuListProps={{ onClick: handleMenuClose }}
            >
              <MenuItem onClick={() => navigate("/admin/reports/investors")}>
                Investors
              </MenuItem>
              <MenuItem
                onClick={() => navigate("/admin/reports/project-expense")}
              >
                Expense By Projects
              </MenuItem>
              <MenuItem
                onClick={() => navigate("/admin/reports/investor-earning")}
              >
                Earnings By Investors
              </MenuItem>
              <MenuItem onClick={() => navigate("/admin/reports/profit-loss")}>
                Profit/Loss Report
              </MenuItem>
              <MenuItem
                onClick={() => navigate("/admin/reports/withdraw-investor")}
              >
                Withdraw By Investor
              </MenuItem>
              <MenuItem
                onClick={() => navigate("/admin/reports/deposit-investor")}
              >
                Deposit By Investor
              </MenuItem>
              <MenuItem
                onClick={() => navigate("/admin/reports/investment-withdraw")}
              >
                Investment Withdraw
              </MenuItem>
              <MenuItem onClick={() => navigate("/admin/reports/statement")}>
                Statement
              </MenuItem>
            </Menu>

            {/* Requests */}
            <Button
              color="inherit"
              onClick={
                openMenu
                  ? () => handleMenuClose
                  : (e) => handleMenuOpen(e, "requests")
              }
            >
              Requests
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={openMenu === "requests"}
              onClose={() => handleMenuClose()}
              MenuListProps={{ onClick: handleMenuClose }}
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
              <MenuItem
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
              </MenuItem>
            </Menu>
          </Box>

          {/* Logout button on the right */}
          <Button color="inherit" variant="outlined" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      {/* Card Section */}
      <Grid2 container spacing={3} padding={3}>
        {/* Card 1 No. Of Projects */}
        <Grid2 item size={{xs: 12, md: 6}}>
          <Card sx={{textAlign: 'center'}}>
            <CardContent>
              <Work sx={{fontSize: 40, color: 'purple'}} />
              <Typography variant="body2" color="textSecondary">
                No. Of Projects
              </Typography>
              <Typography variant="h4" fontWeight="bold">
                25
              </Typography>
            </CardContent>
          </Card>
        </Grid2>

        {/* Card 2 Total Withdrawn */}
        <Grid2 item size={{xs: 12, md: 6}}>
          <Card sx={{textAlign: 'center'}}>
            <CardContent>
              <MoneyOff sx={{fontSize: 40, color: 'purple'}} />
              <Typography variant="body2" color="textSecondary">
                Total Withdrawn
              </Typography>
              <Typography variant="h4" fontWeight="bold">
                20,000 AED
              </Typography>
            </CardContent>
          </Card>
        </Grid2>

        {/* Card 2 Total Investment */}
        <Grid2 item size={{xs: 12, md: 6}}>
          <Card sx={{textAlign: 'center'}}>
            <CardContent>
              <AccountBalance sx={{fontSize: 40, color: 'purple'}} />
              <Typography variant="body2" color="textSecondary">
                Total Investment
              </Typography>
              <Typography variant="h4" fontWeight="bold">
                130,000 AED
              </Typography>
            </CardContent>
          </Card>
        </Grid2>

        {/* Card 2 Total Earning */}
        <Grid2 item size={{xs: 12, md: 6}}>
          <Card sx={{textAlign: 'center'}}>
            <CardContent>
              <AttachMoney sx={{fontSize: 40, color: 'purple'}} />
              <Typography variant="body2" color="textSecondary">
                Total Earning
              </Typography>
              <Typography variant="h4" fontWeight="bold">
                4,000 AED
              </Typography>
            </CardContent>
          </Card>
        </Grid2>
      </Grid2>
    </div>
  );
};

export default AdminDashboard;
