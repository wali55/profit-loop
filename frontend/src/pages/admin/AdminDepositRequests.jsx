import { useState, useEffect } from "react";
import AdminNavbar from "../../components/admin/AdminNavbar";
import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  TablePagination,
  Paper,
  RadioGroup,
  FormControlLabel,
  Radio,
  Box,
  Button,
  Typography,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  DialogActions,
} from "@mui/material";
import Footer from "../../components/common/Footer";
import { baseUrl } from "../../Base";

const AdminDepositRequests = () => {
  // retrieve token from localStorage
  const token = localStorage.getItem("token");

  // deposit data
  const [depositData, setDepositData] = useState([]);
  // deposit status
  const [status, setStatus] = useState("pending"); // default to pending
  //loading
  const [loading, setLoading] = useState(true);
  // pagination
  const [page, setPage] = useState(0); // current page number (0 indexed)
  const [rowsPerPage, setRowsPerPage] = useState(5); // number of rows per page
  const [totalRows, setTotalRows] = useState(0); // total number of rows from API
  // dialog for confirmation of status change
  const [open, setOpen] = useState(false);
  const [selectedAction, setSelectedAction] = useState(null);
  const [selectedId, setSelectedId] = useState(null);

  // fetch deposit data function
  const fetchDepositData = async () => {
    try {
      const response = await fetch(
        `${baseUrl}/deposit?pagination=true&pageNumber=${
          page + 1
        }&rowPerPage=${rowsPerPage}&status=${status}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: token,
          },
          credentials: "include",
        }
      );

      if (!response.ok) throw new Error("Failed to get the deposit data");

      const data = await response.json();
      setDepositData(data?.data?.results || []); // deposit data
      setTotalRows(data?.data?.count || 0); // total row count from api
    } catch (error) {
      console.error("Error when fetching deposit data", error);
    }
  };

  // get all deposit data of the user
  useEffect(() => {
    if (!token) return;
    fetchDepositData();
    setLoading(false);
  }, [status, page, rowsPerPage]);

  // handle page change
  const handlePageChange = (e, newPage) => {
    setPage(newPage);
  };

  // handle rows per page change
  const handleRowsPerPageChange = (e) => {
    setRowsPerPage(parseInt(e.target.value, 10)); // 10 for decimal number system, if binary it will be 2
    setPage(0); // reset to the first page when rows per page changes
  };

  // function to change the status of the deposit
  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  // Approve/Reject handler to update the status
  const handleAction = async (id, action) => {
    try {
      const response = await fetch(`${baseUrl}/update-deposit-status/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
        credentials: "include",
        body: JSON.stringify({ status: action }),
      });
      await response.json();
      fetchDepositData(); // Reload data after the status update
    } catch (err) {
      console.error("Error when updating status", err);
    }
  };

  // open the confirmation dialog (for changing deposit status)
  const handleOpen = (id, action) => {
    setSelectedId(id);
    setSelectedAction(action);
    setOpen(true);
  };

  // close the confirmation dialog (for changing deposit status)
  const handleClose = () => {
    setOpen(false);
  };

  // make the api call to change the status
  const handleConfirm = () => {
    handleAction(selectedId, selectedAction);
    setOpen(false); // after confirm close the dialog
  };

  // show loading message when the data is being fetched
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {/* Navbar */}
      <AdminNavbar />

      {/* Deposit Requests Heading */}
      <Typography variant="h5" textAlign="center" sx={{ mt: 5 }}>
        Deposit Requests
      </Typography>

      {/* Deposit Summary Table */}
      <Box>
        {/* Radio Buttons */}
        <RadioGroup
          row
          value={status}
          onChange={handleStatusChange}
          sx={{ mt: 4, ml: 3, mb: 1 }}
        >
          <FormControlLabel
            value="pending"
            control={<Radio />}
            label="Pending"
          />
          <FormControlLabel
            value="approved"
            control={<Radio />}
            label="Approved"
          />
          <FormControlLabel
            value="rejected"
            control={<Radio />}
            label="Rejected"
          />
        </RadioGroup>

        {/* Table */}
        <TableContainer component={Paper} sx={{ maxWidth: "97%", mx: "auto" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Ref. No.</TableCell>
                <TableCell>Investor</TableCell>
                <TableCell>Deposit Date</TableCell>
                <TableCell>Deposit Type</TableCell>
                <TableCell>Deposit Amount (AED)</TableCell>
                <TableCell>Status</TableCell>
                {status === "pending" && <TableCell>Action</TableCell>}
              </TableRow>
            </TableHead>

            <TableBody>
              {depositData.map((item) => (
                <TableRow key={item?.deposit_transaction_id}>
                  <TableCell>{item?.deposit_transaction_id}</TableCell>
                  <TableCell>
                    {item?.investor?.user?.firstName}{" "}
                    {item?.investor?.user?.lastName}
                  </TableCell>
                  <TableCell>{item?.depositDate.slice(0, 10)}</TableCell>
                  <TableCell>
                    {item?.depositType.charAt(0) +
                      item?.depositType.slice(1).toLowerCase()}
                  </TableCell>
                  <TableCell>{item?.depositAmount}</TableCell>
                  <TableCell>
                    {item?.status.charAt(0).toUpperCase() +
                      item?.status.slice(1)}
                  </TableCell>
                  {status === "pending" && (
                    <TableCell>
                      <Button
                        size="small"
                        variant="outlined"
                        onClick={() => handleOpen(item?.id, "approved")}
                        sx={{ mr: 1, borderColor: "#7ABA78", color: "#7ABA78" }}
                      >
                        Approve
                      </Button>
                      <Button
                        size="small"
                        variant="outlined"
                        onClick={() => handleOpen(item?.id, "rejected")}
                        sx={{ borderColor: "#C7253E", color: "#C7253E" }}
                      >
                        Reject
                      </Button>
                    </TableCell>
                  )}
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
      </Box>

      {/* Dialog for confirmation to change the status (deposit requests) */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Confirmation</DialogTitle>
        <DialogContent>
          <DialogContentText>{`Are you sure you want to ${
            selectedAction === "approved" ? "approve" : "reject"
          } this deposit request?`}</DialogContentText>
        </DialogContent>
        <DialogActions sx={{mr: 1, mb: 1}}>
          <Button
            size="small"
            variant="outlined"
            sx={{ borderColor: "#7ABA78", color: "#7ABA78" }}
            onClick={handleConfirm}
          >
            Yes
          </Button>
          <Button
            size="small"
            variant="outlined"
            sx={{ borderColor: "#C7253E", color: "#C7253E" }}
            onClick={handleClose}
          >
            No
          </Button>
        </DialogActions>
      </Dialog>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default AdminDepositRequests;
