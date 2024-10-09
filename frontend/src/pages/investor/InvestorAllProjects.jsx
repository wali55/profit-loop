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
// from otp ui library
import { MuiOtpInput } from "mui-one-time-password-input";

const InvestorAllProjects = () => {
  // user id
  const userId = localStorage.getItem("userId");
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
  // open/close invest dialog
  const [openInvest, setOpenInvest] = useState(false);
  // user data
  const [userData, setUserData] = useState({});
  // project by id
  const [projectById, setProjectById] = useState({});
  // share count
  const [shareCount, setShareCount] = useState(1);
  // state to implement otp
  const [otpDialog, setOtpDialog] = useState(false);
  const [otp, setOtp] = useState("");
  const [counter, setCounter] = useState(60);
  const [resendDisabled, setResendDisabled] = useState(true);
  

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

  // function to fetch user data
  const fetchUserData = async () => {
    try {
      const response = await fetch(`${baseUrl}/investor/${userId}`, {
        method: "GET",
        headers: {
          authorization: token,
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }
      const data = await response.json();
      setUserData(data);
      setLoading(false);
    } catch (err) {
      console.error("Error when fetching user data", err);
      setLoading(false);
    }
  };

  // get current user data
  useEffect(() => {
    fetchUserData();
  }, [projectData]);

  // function to fetch project by id
  const fetchProjectById = async () => {
    try {
      if (!selectedId) return;
      const response = await fetch(`${baseUrl}/project/${selectedId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
        credentials: "include",
      });
      const data = await response.json();

      setProjectById(data?.data || {});
    } catch (error) {
      console.log(error);
    }
  };

  // get project by id
  useEffect(() => {
    fetchProjectById();
  }, [selectedId]);

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
  };

  // available share count
  const availableShareCount =
    projectById?.project_contact_info?.no_of_share_required -
      projectById?.project_contact_info?.no_of_share_sold || 0;

  // invested amount
  const investedAmount =
    projectById?.project_contact_info?.per_share_amount * shareCount || 0;

  // share count change
  const handleShareCountChange = (e) => {
    const value = Number(e.target.value);

    if (value >= 1 && value <= availableShareCount) {
      setShareCount(value);
    }
  };

  // get user email
  const userEmail = userData?.user?.email;

  // create a investment request which will hit the backend to get the otp
  const handleInvest = async () => {
    try {
      const response = await fetch(`${baseUrl}/request_for_otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
        credentials: "include",
        body: JSON.stringify({
          email: userEmail,
          usingFor: "invest_project",
        }),
      });

      if (response.ok) {
        setOpenInvest(false);
        setOtpDialog(true);
        setResendDisabled(true);
        setCounter(60);
        startCountdown();
      }
    } catch (err) {
      console.error("Error when sending withdraw request", err);
    }
  };

  // handle confirm otp and submit investment
  const handleConfirmOtp = async () => {
    try {
      const response = await fetch(`${baseUrl}/project-investment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
        credentials: "include",
        body: JSON.stringify({
          email: userEmail,
          otp: Number(otp),
          usingFor: "invest_project",
          projectId: projectById?.project_contact_info?.projectId,
          no_of_share: shareCount,
        }),
      });

      if (response.ok) {
        setOtpDialog(false); // close otp dialog
        setShareCount(1);
      }
      await response.json();
      await fetchProjectData();
    } catch (err) {
      console.error("Error occur when confirming investment otp", err);
    }
  };

  // handle resend otp
  const handleResendOtp = async () => {
    try {
      const response = await fetch(`${baseUrl}/request_for_otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
        credentials: "include",
        body: JSON.stringify({
          email: userEmail,
          usingFor: "invest_project",
        }),
      });

      if (response.ok) {
        setResendDisabled(true);
        setCounter(60);
        startCountdown();
      }
    } catch (err) {
      console.error("Error occur when resending otp", err);
    }
  };

  // countdown for resend otp button
  const startCountdown = () => {
    const interval = setInterval(() => {
      setCounter((prevCounter) => {
        if (prevCounter === 1) {
          clearInterval(interval);
          setResendDisabled(false);
        }
        return prevCounter - 1;
      });
    }, 1000);
  };

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

      {/* Create Invest Dialog */}
      <Dialog
        open={openInvest}
        onClose={() => setOpenInvest(false)}
        aria-labelledby="alert-dialog-title"
      >
        <DialogTitle id="alert-dialog-title">Project Investment</DialogTitle>
        <DialogContent>
          <Grid2 container spacing={2} sx={{ minWidth: 450 }}>
            <Grid2 item size={12} sx={{ mt: 1 }}>
              <TextField
                fullWidth
                label="Balance (AED)"
                variant="outlined"
                value={userData?.availableBalance}
                size="small"
                disabled
              />
            </Grid2>

            <Grid2 item size={12}>
              <TextField
                fullWidth
                label="Share Count"
                variant="outlined"
                type="number"
                size="small"
                value={shareCount}
                onChange={handleShareCountChange}
                InputProps={{
                  inputProps: { min: 1, max: availableShareCount },
                }}
              />
            </Grid2>

            <Grid2 item size={12} sx={{ mt: 1 }}>
              <TextField
                fullWidth
                label="Invested Amount (AED)"
                variant="outlined"
                value={investedAmount || 0}
                size="small"
                disabled
              />
            </Grid2>
          </Grid2>
        </DialogContent>

        <DialogActions sx={{mr: 2, mb: 1}}>
          <Button
          size="small"
          variant="outlined"
          sx={{ borderColor: "#C7253E", color: "#C7253E" }}
            onClick={() => {
              setShareCount(1);
              setOpenInvest(false);
            }}
          >
            No
          </Button>
          <Button
          size="small"
          variant="outlined"
          sx={{ borderColor: "#3A1078", color: "#3A1078" }}
            onClick={handleInvest}
          >
            Invest
          </Button>
        </DialogActions>
      </Dialog>

      {/* otp dialog */}
      <Dialog open={otpDialog} >
        <DialogTitle>Enter OTP</DialogTitle>
        <Typography variant="body2" sx={{ml: 3, fontWeight: 'bold'}}>Please check your email: {userEmail}</Typography>
        <DialogContent>
          <Grid2 container spacing={2}>
            <Grid2 item size={12} minWidth={300}>
              <MuiOtpInput value={otp} onChange={setOtp} />
            </Grid2>
          </Grid2>
        </DialogContent>
        <DialogActions>
          <Button size="small" variant="outlined" sx={{borderColor: '#CD5C08', color: '#CD5C08', mb: 2}} onClick={handleResendOtp} disabled={resendDisabled}>
            {`Resend OTP (${counter}s)`}
          </Button>
          <Button size="small" variant="outlined" sx={{borderColor: '#3A1078', color: '#3A1078', mr: 2, mb: 2}} onClick={handleConfirmOtp}>Confirm</Button>
        </DialogActions>
      </Dialog>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default InvestorAllProjects;
