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
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default AdminDashboard;
