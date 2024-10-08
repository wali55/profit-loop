import { useState, useEffect } from "react";
import InvestorNavbar from "../../components/investor/InvestorNavbar";
import Footer from "../../components/common/Footer";
import {
  Typography,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TablePagination,
  Button,
  Paper,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  Stepper,
  StepLabel,
  Step,
  Grid2,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  DialogActions,
  IconButton,
  Menu,
} from "@mui/material";
import { baseUrl } from "../../Base";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const InvestorAllProjects = () => {
  // retrieve token from localStorage
  const token = localStorage.getItem("token");
  //loading
  const [loading, setLoading] = useState(true);
  // store project data on local storage
  const [projectData, setProjectData] = useState([]);
  // pagination
  const [page, setPage] = useState(0); // current page number (0 indexed)
  const [rowsPerPage, setRowsPerPage] = useState(5); // number of rows per page
  const [totalRows, setTotalRows] = useState(0); // total number of rows from API
  //action button menu
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  // 

  // function to fetch project data
  const fetchProjectData = async () => {
    try {
      const response = await fetch(
        `${baseUrl}/projects?pageNumber=${
          page + 1
        }&rowPerPage=${rowsPerPage}&pagination=true&status=available`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: token,
          },
          credentials: "include",
        }
      );
      const data = await response.json();
      setProjectData(data?.data?.results || []);
      setTotalRows(data?.data?.count || 0); // total row count from api
    } catch (error) {
      console.log(error);
    }
  };

  // get all projects data
  useEffect(() => {
    const loadProjects = async () => {
      await fetchProjectData();
      setLoading(false);
    };
    loadProjects();
  }, [page, rowsPerPage]);

  // table pagination
  // handle page change
  const handlePageChange = (e, newPage) => {
    setPage(newPage);
  };

  // handle rows per page change
  const handleRowsPerPageChange = (e) => {
    setRowsPerPage(parseInt(e.target.value, 10)); // 10 for decimal number system, if binary it will be 2
    setPage(0); // reset to the first page when rows per page changes
  };

  // open dialog for investment
  const handleOpenInvest = (id) => {
    setSelectedId(id);
    setOpenInvest(true);
  }

  return (
    <div>
      {/* Navbar */}
      <InvestorNavbar />

      {/* All Projects Heading */}
      <Typography variant="h5" textAlign="center" sx={{ my: 4 }}>
        All Available Projects
      </Typography>

      {/* Available Projects Table */}
      <TableContainer component={Paper} sx={{ maxWidth: "97%", mx: "auto" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Ref. No.</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Project Value (AED)</TableCell>
              <TableCell>Investment Required (AED)</TableCell>
              <TableCell>Contract Duration</TableCell>
              <TableCell>Profit/Loss Calc. Month</TableCell>
              <TableCell>No. of Share</TableCell>
              <TableCell>Sold Share</TableCell>
              <TableCell>Available Share</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {projectData.map((project) => (
              <TableRow key={project?.id}>
                <TableCell>{project?.project_unique_id}</TableCell>
                <TableCell>{project?.projectName}</TableCell>
                <TableCell>
                  {project?.project_contact_info?.actual_project_value}
                </TableCell>
                <TableCell>
                  {project?.project_contact_info?.investor_share_value}
                </TableCell>
                <TableCell>
                  {project?.project_contact_info?.contract_duration}
                </TableCell>
                <TableCell>
                  {project?.project_contact_info?.profit_loss_calc_month}
                </TableCell>
                <TableCell>
                  {project?.project_contact_info?.no_of_share_required}
                </TableCell>
                <TableCell>
                  {project?.project_contact_info?.no_of_share_sold}
                </TableCell>
                <TableCell>
                  {project?.project_contact_info?.no_of_share_required -
                    project?.project_contact_info?.no_of_share_sold}
                </TableCell>
                <TableCell>
                  {project?.status.charAt(0).toUpperCase() +
                    project?.status.slice(1)}
                </TableCell>
                <TableCell>
                  <Button
                    size="small"
                    variant="outlined"
                    sx={{ borderColor: "#3A1078", color: "#3A1078" }}
                    onClick={() => handleOpenInvest(project?.id)}
                  >
                    Invest
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Pagination */}
        <TablePagination
          component="div"
          count={totalRows}
          page={page}
          onPageChange={handlePageChange}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleRowsPerPageChange}
          rowsPerPageOptions={[5, 10, 20]}
        />
      </TableContainer>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default InvestorAllProjects;
