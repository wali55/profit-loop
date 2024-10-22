import Footer from "../../components/common/Footer";
import AdminNavbar from "../../components/admin/AdminNavbar";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid2,
  InputLabel,
  MenuItem,
  Paper,
  Select,
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
import { useEffect, useState } from "react";
import { baseUrl } from "../../Base";

const AdminProjectExpenses = () => {
  // initial create data
  const initialData = {
    expenseDate: "",
    expenseType: "",
    expenseAmount: "",
    projectId: ""
  };
  //loading
  const [loading, setLoading] = useState(true);
  // retrieve token from localStorage
  const token = localStorage.getItem("token");
  // expense data
  const [expenseData, setExpenseData] = useState([]);
  // pagination
  const [page, setPage] = useState(0); // current page number (0 indexed)
  const [rowsPerPage, setRowsPerPage] = useState(5); // number of rows per page
  const [totalRows, setTotalRows] = useState(0); // total number of rows from API
  // open create expense dialog
  const [openCreate, setOpenCreate] = useState(false);
  // create data
  const [createData, setCreateData] = useState(initialData);
  // project list
  const [projectList, setProjectList] = useState([]);

  // function to fetch all the expense data
  const fetchExpenseData = async () => {
    const response = await fetch(
      `${baseUrl}/project-expense?pageNumber=${
        page + 1
      }&rowPerPage=${rowsPerPage}&pagination=true`,
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
      throw new Error("Error occur when trying to fetch expense data");

    const data = await response.json();
    setExpenseData(data?.data?.results);
  };

  useEffect(() => {
    const loadData = async () => {
      await fetchExpenseData();
      setLoading(false);
    };
    loadData();
  }, []);

  // handle page change
  const handlePageChange = (e, newPage) => {
    setPage(newPage);
  };

  // handle rows per page change
  const handleRowsPerPageChange = (e) => {
    setRowsPerPage(parseInt(e.target.value, 10)); // 10 for decimal number system, if binary it will be 2
    setPage(0); // reset to the first page when rows per page changes
  };

  // create expense form change
  const handleCreateChange = (e) => {
    const { name, value } = e.target;

    setCreateData((prevData) => {
      // If the field is 'expenseDate', format the date
      if (name === "expenseDate") {
        const formattedDate = new Date(value).toLocaleDateString("en-CA"); // Format date as yyyy-mm-dd
        return { ...prevData, [name]: formattedDate };
      }

      // For other fields, simply update the value
      return { ...prevData, [name]: value };
    });
  };

  // fetch project list
  const fetchProjectList = async () => {
    const response = await fetch(`${baseUrl}/projects_name_list?status=booked`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            authorization: token
        },
        credentials: "include"
    })

    if (!response.ok) throw new Error("Error occur when")
    
    const data = await response.json();
    // not done yet
  }

  // show loading message when the data is being fetched
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {/* Navbar */}
      <AdminNavbar />

      {/* Project Expenses Heading */}
      <Typography variant="h5" sx={{ my: 4, textAlign: "center" }}>
        Project Expenses
      </Typography>

      {/* Create Expense Button */}
      <Box textAlign="right" m={2}>
        <Button
          variant="outlined"
          size="small"
          sx={{ borderColor: "#5F0F40", color: "#5F0F40" }}
          onClick={() => setOpenCreate(true)}
        >
          Create Expense
        </Button>
      </Box>

      {/* Create expense Dialog form */}
      <Dialog open={openCreate} onClose={() => setOpenCreate(false)}>
        {/* Dialog Title */}
        <DialogTitle>Create Expense</DialogTitle>
        {/* Dialog Content */}
        <DialogContent>
          <Grid2 container spacing={2}>
            <Grid2 item size={12} mt={1}>
              <TextField
                label="Expense Date"
                name="expenseDate"
                fullWidth
                type="date"
                InputLabelProps={{ shrink: true }}
                size="small"
                value={createData.expenseDate}
                onChange={handleCreateChange}
                required
              />
            </Grid2>

            <Grid2 item size={12}>
              <TextField
                size="small"
                fullWidth
                label="Expense Amount (AED)"
                name="expenseAmount"
                type="number"
                value={createData.expenseAmount}
                onChange={handleCreateChange}
                required
              />
            </Grid2>

            <Grid2 item size={12}>
              <FormControl fullWidth>
                <InputLabel id="expense-category-label">
                  Expense Category
                </InputLabel>
                <Select
                  labelId="expense-category-label"
                  label="Expense Category"
                  size="small"
                  name="expenseType"
                  value={createData.expenseType}
                  onChange={handleCreateChange}
                >
                  <MenuItem value="samarabiz_platform_profit">
                    SamaraBiz Platform Profit
                  </MenuItem>
                  <MenuItem value="sales_manager_cost">
                    Sales Manager Cost
                  </MenuItem>
                  <MenuItem value="support_manager_cost">
                    Support Manager Cost
                  </MenuItem>
                  <MenuItem value="camp_lease">Camp Lease</MenuItem>
                </Select>
              </FormControl>
            </Grid2>

            <Grid2 item size={12}>
              <FormControl fullWidth>
                <InputLabel>
                  Select Project
                </InputLabel>
                <Select
                  label="Select Project"
                  size="small"
                  name="projectId"
                  value={createData.projectId}
                  onChange={handleCreateChange}
                >
                  <MenuItem value="samarabiz_platform_profit">
                    SamaraBiz Platform Profit
                  </MenuItem>
                  <MenuItem value="sales_manager_cost">
                    Sales Manager Cost
                  </MenuItem>
                  <MenuItem value="support_manager_cost">
                    Support Manager Cost
                  </MenuItem>
                  <MenuItem value="camp_lease">Camp Lease</MenuItem>
                </Select>
              </FormControl>
            </Grid2>
          </Grid2>
        </DialogContent>
        <DialogActions sx={{ mr: 2, mb: 1 }}>
          <Button
            size="small"
            variant="outlined"
            sx={{ borderColor: "#C7253E", color: "#C7253E" }}
            onClick={() => {
              setCreateData(initialData);
              setOpenCreate(false);
            }}
          >
            Cancel
          </Button>
          <Button
            variant="outlined"
            size="small"
            sx={{ borderColor: "#5F0F40", color: "#5F0F40" }}
          >
            Send Request
          </Button>
        </DialogActions>
      </Dialog>

      {/* Expense Summary Table */}
      <TableContainer component={Paper} sx={{ maxWidth: "97%", mx: "auto" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Project Name</TableCell>
              <TableCell>Expense Date</TableCell>
              <TableCell>Expense Amount (AED)</TableCell>
              <TableCell>Expense Category</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {expenseData.map((expense) => (
              <TableRow key={expense?.id}>
                <TableCell>{expense?.project?.projectName}</TableCell>
                <TableCell>{expense?.expenseDate.slice(0, 10)}</TableCell>
                <TableCell>{expense?.expenseAmount}</TableCell>
                <TableCell>
                  {expense?.expenseType
                    .split("_")
                    .join(" ")
                    .charAt(0)
                    .toUpperCase() +
                    expense?.expenseType.split("_").join(" ").slice(1)}
                </TableCell>
                <TableCell>
                  <Button
                    size="small"
                    variant="outlined"
                    sx={{ borderColor: "#CD5C08", color: "#CD5C08" }}
                  >
                    Edit
                  </Button>
                  <Button
                    size="small"
                    variant="outlined"
                    sx={{ borderColor: "#C7253E", color: "#C7253E", ml: 1 }}
                  >
                    Delete
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

export default AdminProjectExpenses;
