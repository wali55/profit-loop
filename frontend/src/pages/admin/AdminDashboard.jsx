import { useState, useEffect } from "react";
import {
  MenuItem,
  Box,
  Typography,
  Card,
  CardContent,
  Grid2,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  FormControl,
  InputLabel,
  TablePagination,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  Work,
  AccountBalance,
  AttachMoney,
  MoneyOff,
} from "@mui/icons-material";
import AdminNavbar from "../../components/admin/AdminNavbar";

const AdminDashboard = () => {
  const navigate = useNavigate();

  // state for the open menus
  const [anchorEl, setAnchorEl] = useState(null);
  const [openMenu, setOpenMenu] = useState(null);
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    // Fetch data from backend and set it in the state (simulate fetch)
    // Assuming getProjects() fetches the project data
    fetchProjectData();
  }, [status]);

  function getProjects() {}

  const fetchProjectData = async () => {
    // Here you'd fetch the projects based on the status filter
    const data = await getProjects(status); // Replace with actual API call
    setProjects(data);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

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
    // remove token token, user ID, role from local storage
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("role");

    // redirect to login page
    navigate('/login');
  };

  return (
    <div>
      {/* Nav section */}
      <AdminNavbar />

      {/* Card Section */}
      <Grid2 container spacing={3} padding={3}>
        {/* Card 1 No. Of Projects */}
        <Grid2 item size={{ xs: 12, md: 6 }}>
          <Card sx={{ textAlign: "center" }}>
            <CardContent>
              <Work sx={{ fontSize: 40, color: "purple" }} />
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
        <Grid2 item size={{ xs: 12, md: 6 }}>
          <Card sx={{ textAlign: "center" }}>
            <CardContent>
              <MoneyOff sx={{ fontSize: 40, color: "purple" }} />
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
        <Grid2 item size={{ xs: 12, md: 6 }}>
          <Card sx={{ textAlign: "center" }}>
            <CardContent>
              <AccountBalance sx={{ fontSize: 40, color: "purple" }} />
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
        <Grid2 item size={{ xs: 12, md: 6 }}>
          <Card sx={{ textAlign: "center" }}>
            <CardContent>
              <AttachMoney sx={{ fontSize: 40, color: "purple" }} />
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

      {/* Project List */}
      <Box sx={{ padding: 3 }}>
        {/* Project List Heading */}
        <Typography variant="h4" align="center" gutterBottom>
          Project List
        </Typography>

        {/* Status Filter */}
        <Box sx={{ marginBottom: 2 }}>
          <FormControl
            fullWidth
            variant="outlined"
            sx={{ width: 200 }}
            size="small"
          >
            <InputLabel id="status-label">Status</InputLabel>
            <Select
              labelId="status-label"
              value={status}
              onChange={handleStatusChange}
              label="Status"
            >
              <MenuItem value="draft">Draft</MenuItem>
              <MenuItem value="available">Available</MenuItem>
              <MenuItem value="sold-out">Sold Out</MenuItem>
              <MenuItem value="booked">Booked</MenuItem>
              <MenuItem value="matured">Matured</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* Table */}
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Project Name</TableCell>
                <TableCell>Project Value</TableCell>
                <TableCell>Project Recalc. Value</TableCell>
                <TableCell>Invested Amount</TableCell>
                <TableCell>Investor's Earning</TableCell>
                <TableCell>Launch Date</TableCell>
                <TableCell>Mature Date</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              <TableRow>
                <TableCell>Billing Service September 2024</TableCell>
                <TableCell>250000 AED</TableCell>
                <TableCell>200000 AED</TableCell>
                <TableCell>125000 AED</TableCell>
                <TableCell>1000 AED</TableCell>
                <TableCell>09-13-2024</TableCell>
                <TableCell>09-14-2024</TableCell>
                <TableCell>Matured</TableCell>
              </TableRow>
            </TableBody>
          </Table>

          {/* Pagination */}
          <TablePagination 
            component="div"
            count={projects?.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[10, 25, 50]}
          />
        </TableContainer>
      </Box>
    </div>
  );
};

export default AdminDashboard;
