import {useState} from "react";
import {AppBar, Toolbar, Button, Menu, MenuItem, Box, Typography} from "@mui/material";
import Logo from "../assets/images/samarabiz-logo.svg";
import {useNavigate} from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();

  // state for the open menus
  const [anchorEl, setAnchorEl] = useState(null);
  const [openMenu, setOpenMenu] = useState(null);

  // open the submenus
  const handleMenuOpen = (event, menuName) => {
    setAnchorEl(event.currentTarget);
    setOpenMenu(menuName);
  }

  const handleMenuClose = () => {
    setAnchorEl(null);
    setOpenMenu(null);
  }

  //logout function
  const handleLogout = () => {
    // logout logic
    navigate('/admin/login');
  }

  return (
    <AppBar position="static" sx={{backgroundColor: '#3A1078'}}>
      <Toolbar sx={{justifyContent: 'space-between'}}>
        {/* logo on the left */}
        <Box component="img" src={Logo} alt="samarabiz-logo" sx={{height: 50, cursor: 'pointer'}} />

        {/* Menu items in the middle */}
        <Box sx={{display: 'flex', alignItems: 'center'}}>
          {/* Dashboard menu item */}
          <Button color="inherit" onClick={() => navigate('/admin/dashboard')}>
            Dashboard
          </Button>

          {/* Projects menu */}
          <Button
            color="inherit"
            onClick={openMenu ? () => handleMenuClose : (e) => handleMenuOpen(e, 'projects')}
          >
            Projects
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={openMenu === 'projects'}
            onClose={handleMenuClose}
            MenuListProps={{onClick: handleMenuClose}}
          >
            <MenuItem onClick={() => navigate('/admin/projects/all')}>All Projects</MenuItem>
            <MenuItem onClick={() => navigate('/admin/projects/contracts')}>Contract Details</MenuItem>
            <MenuItem onClick={() => navigate('/admin/projects/expenses')}>Project Expenses</MenuItem>
            <MenuItem onClick={() => navigate('/admin/projects/archive')}>Archive Projects</MenuItem>
          </Menu>

          {/* Investors Menu */}
          <Button
            color="inherit"
            onClick={openMenu ? () => handleMenuClose : (e) => handleMenuOpen(e, 'investors')}
          >
            Investors
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={openMenu === 'investors'}
            onClose={handleMenuClose}
            MenuListProps={{onClick: handleMenuClose}}
          >
            <MenuItem onClick={() => navigate('/admin/investors/all')}>All Investors</MenuItem>
            <MenuItem onClick={() => navigate('/admin/investors/invested-projects')}>Invested Projects</MenuItem>
            <MenuItem onClick={() => navigate('/admin/investors/investment-agreement')}>Investment Agreement</MenuItem>
            <MenuItem onClick={() => navigate('/admin/investors/deposit-agreement')}>Deposit Agreement</MenuItem>
          </Menu>

          {/* Financial details menu */}
          <Button
            color="inherit"
            onClick={openMenu ? () => handleMenuClose() : (e) => handleMenuOpen(e, 'financial')}
          >
            Financial Details
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={openMenu === 'financial'}
            onClose={handleMenuClose}
            MenuListProps={{onClick: handleMenuClose}}
          >
            <MenuItem onClick={() => navigate('/admin/financial/profit-details')}>Profit Details</MenuItem>
            <MenuItem onClick={() => navigate('/admin/financial/withdraw-details')}>Withdraw Details</MenuItem>
            <MenuItem onClick={() => navigate('/admin/financial/deposit-details')}>Deposit Details</MenuItem>
            <MenuItem onClick={() => navigate('/admin/financial/platform-profit')}>Platform Profit</MenuItem>
            <MenuItem onClick={() => navigate('/admin/financial/platform-withdraw')}>Platform Withdraw Details</MenuItem>
          </Menu>

          {/* Company */}
          <Button
            color="inherit"
            onClick={openMenu ? () => handleMenuClose() : (e) => handleMenuOpen(e, 'company')}
          >
            Company
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={openMenu === 'company'}
            onClose={handleMenuClose}
            MenuListProps={{onClick: handleMenuClose}}
          >
            <MenuItem onClick={() => navigate('/admin/company/departments')}>Departments</MenuItem>
            <MenuItem onClick={() => navigate('/admin/company/faq')}>FAQ</MenuItem>
            <MenuItem onClick={() => navigate('/admin/company/camp')}>Camp</MenuItem>
            <MenuItem onClick={() => navigate('/admin/company/general')}>General Settings</MenuItem>
            <MenuItem onClick={() => navigate('/admin/company/company-info')}>Company Info Settings</MenuItem>
            <MenuItem onClick={() => navigate('/admin/company/currency-master')}>Currency Master</MenuItem>
            <MenuItem onClick={() => navigate('/admin/company/conversion-history')}>Conversion History</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default AdminDashboard;
