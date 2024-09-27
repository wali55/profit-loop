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
} from "@mui/material";
import Footer from "../../components/common/Footer";
import { baseUrl } from "../../Base";

const AdminWithdrawRequests = () => {
  // retrieve token from localStorage
  const token = localStorage.getItem("token");
  // withdraw data
  const [withdrawData, setWithdrawData] = useState([]);
  // withdraw status
  const [status, setStatus] = useState("pending");
  // loading
  const [loading, setLoading] = useState(true);
  // pagination
  const [page, setPage] = useState(0); // current page number (0 indexed)
  const [rowsPerPage, setRowsPerPage] = useState(5); // number of rows per page
  const [totalRows, setTotalRows] = useState(0); // total number of rows from API
  // dialog
  const [open, setOpen] = useState(false);

  // handle open/close dialog (of confirmation status change)
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // fetch withdraw data
  const fetchWithdrawData = async () => {
    try {
      const response = await fetch(
        `${baseUrl}/withdraw_amount?pagination=true&pageNumber=${
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

      if (!response.ok) throw new Error("Failed to get the withdraw data");

      const data = await response.json();

      setWithdrawData(data?.data?.results || []);
      setTotalRows(data?.data?.count || 0);
    } catch (err) {
      console.error("Error", err);
    }
  };

  // fetch all withdraw data when loading the page
  useEffect(() => {
    fetchWithdrawData();
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

  // handle confirm status change (approve withdraw request/reject withdraw request)
  const handleConfirm = (id) => {
    handleOpen()
  }

  // Approve/Reject handler to update the status
  const handleAction = async (id, action) => {
    try {
      const response = await fetch(
        `${baseUrl}/update-withdraw-status/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            authorization: token,
          },
          credentials: "include",
          body: JSON.stringify({ status: action }),
        }
      );
      await response.json();
      fetchWithdrawData(); // Reload data after the status update
    } catch (err) {
      console.error("Error when updating status", err);
    }
  };

  // show loading message when the data is being fetched
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {/* Navbar */}
      <AdminNavbar />

      {/* Withdraw Requests Heading */}
      <Typography variant="h5" textAlign="center" sx={{ mt: 5 }}>
        Withdraw Requests
      </Typography>

      {/* Withdraw Summary Table */}
      <Box>
        {/* Radio Buttons */}
        <RadioGroup row value={status} onChange={handleStatusChange} sx={{mt: 4, ml: 3, mb: 1}}>
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
                <TableCell>Withdraw Date</TableCell>
                <TableCell>Withdraw Type</TableCell>
                <TableCell>Withdraw Amount</TableCell>
                <TableCell>Status</TableCell>
                {status === 'pending' && <TableCell>Action</TableCell>}
              </TableRow>
            </TableHead>

            <TableBody>
              {withdrawData.map((item) => (
                <TableRow key={item?.withdraw_transaction_id}>
                  <TableCell>{item?.withdraw_transaction_id}</TableCell>
                  <TableCell>{item?.investor?.user?.firstName} {item?.investor?.user?.lastName}</TableCell>
                  <TableCell>{item?.withdrawDate.slice(0, 10)}</TableCell>
                  <TableCell>
                    {item?.withdrawType.charAt(0) +
                      item?.withdrawType.slice(1).toLowerCase()}
                  </TableCell>
                  <TableCell>{item?.withdrawalAmount}</TableCell>
                  <TableCell>
                    {item?.status.charAt(0).toUpperCase() +
                      item?.status.slice(1)}
                  </TableCell>
                  {status === 'pending' && (
                    <TableCell>
                      <Button size="small" variant="outlined" onClick={() => handleAction(item?.id ,'approved')} sx={{mr: 1, borderColor: '#7ABA78', color: '#7ABA78'}}>Approve</Button>
                      <Button size="small" variant="outlined" onClick={() => handleAction(item?.id ,'rejected')} sx={{borderColor: '#C7253E', color: '#C7253E'}}>Rejected</Button>
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

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default AdminWithdrawRequests;
