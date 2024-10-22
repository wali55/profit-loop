import { useEffect, useState } from "react";
import Footer from "../../components/common/Footer";
import InvestorNavbar from "../../components/investor/InvestorNavbar";
import { baseUrl } from "../../Base";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid2,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
// from otp ui library
import { MuiOtpInput } from "mui-one-time-password-input";

const InvestorMyProjects = () => {
  //loading
  const [loading, setLoading] = useState(true);
  // retrieve token from localStorage
  const token = localStorage.getItem("token");
  // invested projects
  const [investedProjectData, setInvestedProjectData] = useState([]);
  // pagination
  const [page, setPage] = useState(0); // current page number (0 indexed)
  const [rowsPerPage, setRowsPerPage] = useState(5); // number of rows per page
  const [totalRows, setTotalRows] = useState(0); // total number of rows from API
  // open withdraw dialog
  const [openWithdraw, setOpenWithdraw] = useState(false);
  // get share count
  const [shareCount, setShareCount] = useState(1);
  // selected project
  const [selectedProject, setSelectedProject] = useState({});
  // state variables to implement otp
  const [otpDialog, setOtpDialog] = useState(false);
  const [otp, setOtp] = useState("");
  const [counter, setCounter] = useState(60);
  const [resendDisabled, setResendDisabled] = useState(true);
  

  // function to fetch invested project data
  const fetchInvestedProject = async () => {
    try {
      const response = await fetch(
        `${baseUrl}/my-invested-project?pagination=true&pageNumber=${
          page + 1
        }&rowPerPage=${rowsPerPage}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: token,
          },
          credentials: "include",
        }
      );

      if (!response.ok)
        throw new Error("error occur when try to fetch my invested projects");

      const data = await response.json();
      setInvestedProjectData(data?.data?.results);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    const loadProjects = async () => {
      await fetchInvestedProject();
      setLoading(false);
    };
    loadProjects();
  }, []);

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

  // function to open withdraw dialog
  const handleOpenWithdraw = (shareCount, shareAmount) => {
    setOpenWithdraw(true);
  };

  // my share count
  const myShareCount = selectedProject?.investor_no_of_share;

  // invested amount that investor want to withdraw
  const withdrawAmount =
    Number(selectedProject?.project?.project_contact_info?.per_share_amount) *
      Number(shareCount) || 0;

  // function to change share count
  const handleShareCountChange = (e) => {
    const value = Number(e.target.value);

    if (value >= 1 && value <= myShareCount) {
      setShareCount(value);
    }
  };

  // investor email
  const investorEmail = localStorage.getItem("userEmail");

  // create a investment withdraw request which will hit the backend to get the otp
  const handleWithdraw = async () => {
    try {
      const response = await fetch(`${baseUrl}/request_for_otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
        credentials: "include",
        body: JSON.stringify({
          email: investorEmail,
          usingFor: "withdraw_invest",
        }),
      });

      if (response.ok) {
        setOpenWithdraw(false);
        setOtpDialog(true);
        setResendDisabled(true);
        setCounter(60);
        startCountdown();
      }
    } catch (err) {
      console.error("Error when sending investment withdraw request", err);
    }
  };

  // handle confirm otp and submit investment withdraw
  const handleConfirmOtp = async () => {
    try {
      const response = await fetch(`${baseUrl}/invest-share-withdraw`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
        credentials: "include",
        body: JSON.stringify({
          email: investorEmail,
          otp: Number(otp),
          usingFor: "withdraw_invest",
          projectId: selectedProject?.project?.id,
          no_of_share_withdraw: shareCount,
        }),
      });

      if (response.ok) {
        setOtpDialog(false); // close otp dialog
        setShareCount(1);
      }
      await response.json();
      await fetchInvestedProject();
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
          email: investorEmail,
          usingFor: "withdraw_invest",
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

      {/* My Projects Heading */}
      <Typography variant="h5" textAlign="center" sx={{ my: 4 }}>
        My Projects
      </Typography>

      {/* Available Projects Table */}
      <TableContainer component={Paper} sx={{ maxWidth: "97%", mx: "auto" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Ref. No.</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Investment Required (AED)</TableCell>
              <TableCell>No. of Share</TableCell>
              <TableCell>Sold Share</TableCell>
              <TableCell>My Share</TableCell>
              <TableCell>Invested Amount</TableCell>
              <TableCell>My Profit (AED)</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {investedProjectData.map((project) => (
              <TableRow key={project?.project?.id}>
                <TableCell>{project?.project?.project_unique_id}</TableCell>
                <TableCell>{project?.project?.projectName}</TableCell>
                <TableCell>
                  {project?.project?.project_contact_info?.investor_share_value}
                </TableCell>
                <TableCell>
                  {project?.project?.project_contact_info?.no_of_share_required}
                </TableCell>
                <TableCell>
                  {project?.project?.project_contact_info?.no_of_share_sold}
                </TableCell>
                <TableCell>{project?.investor_no_of_share}</TableCell>
                <TableCell>{project?.investor_share_amount}</TableCell>
                <TableCell>-</TableCell>
                <TableCell>
                  {project?.project?.status === "sold_out" ? project?.project?.status.split("_").join(" ") : project?.project?.status.charAt(0).toUpperCase() +
                    project?.project?.status.slice(1)}
                </TableCell>
                <TableCell>
                  <Button
                    size="small"
                    variant="outlined"
                    disabled={
                      project?.project?.status !== "available" &&
                      project?.project?.status !== "sold_out"
                    }
                    sx={{ borderColor: "#5F0F40", color: "#5F0F40" }}
                    onClick={() => {
                      setSelectedProject(project);
                      setOpenWithdraw(true);
                    }}
                  >
                    Withdraw
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

      {/* Investment Withdraw Dialog */}
      <Dialog open={openWithdraw} onClose={() => setOpenWithdraw(false)}>
        <DialogTitle>Investment Withdraw</DialogTitle>

        <DialogContent>
          <Grid2 container spacing={2}>
            <Grid2 item size={12} sx={{ mt: 1 }}>
              <TextField
                fullWidth
                label="Share Count to Withdraw"
                size="small"
                type="number"
                value={shareCount}
                onChange={handleShareCountChange}
              />
            </Grid2>

            <Grid2 item size={12}>
              <TextField
                fullWidth
                label="Share Amount to Withdraw"
                size="small"
                value={withdrawAmount}
                disabled
              />
            </Grid2>
          </Grid2>
        </DialogContent>

        <DialogActions>
          <Button
            size="small"
            variant="outlined"
            sx={{ borderColor: "#C7253E", color: "#C7253E", mb: 1 }}
            onClick={() => {
              setShareCount(1);
              setOpenWithdraw(false);
            }}
          >
            Cancel
          </Button>
          <Button
            size="small"
            variant="outlined"
            sx={{ borderColor: "#5F0F40", color: "#5F0F40", mr: 2, mb: 1 }}
            onClick={handleWithdraw}
          >
            Withdraw
          </Button>
        </DialogActions>
      </Dialog>

      {/* otp dialog */}
      <Dialog open={otpDialog}>
        <DialogTitle>Enter OTP</DialogTitle>
        <Typography variant="body2" sx={{ ml: 3, fontWeight: "bold" }}>
          Please check your email: {investorEmail}
        </Typography>
        <DialogContent>
          <Grid2 container spacing={2}>
            <Grid2 item size={12} minWidth={300}>
              <MuiOtpInput value={otp} onChange={setOtp} />
            </Grid2>
          </Grid2>
        </DialogContent>
        <DialogActions>
          <Button
            size="small"
            variant="outlined"
            sx={{ borderColor: "#CD5C08", color: "#CD5C08", mb: 2 }}
            onClick={handleResendOtp}
            disabled={resendDisabled}
          >
            {`Resend OTP (${counter}s)`}
          </Button>
          <Button
            size="small"
            variant="outlined"
            sx={{ borderColor: "#5F0F40", color: "#5F0F40", mr: 2, mb: 2 }}
            onClick={handleConfirmOtp}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default InvestorMyProjects;
