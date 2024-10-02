import { useState, useEffect } from "react";
import AdminNavbar from "../../components/admin/AdminNavbar";
import Footer from "../../components/common/Footer";
import {
  Typography,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  TableContainer,
  TablePagination,
  Paper,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  DialogActions,
  Grid2,
  TextField,
  Box,
  Button,
} from "@mui/material";
import { baseUrl } from "../../Base";

const AdminDepartments = () => {
  // initial form data
  const initialFormData = {
    name: "",
    description: "",
  };
  const [formData, setFormData] = useState(initialFormData);
  //loading
  const [loading, setLoading] = useState(true);
  // retrieve token from localStorage
  const token = localStorage.getItem("token");
  const [departmentData, setDepartmentData] = useState([]);
  // pagination
  const [page, setPage] = useState(0); // current page number (0 indexed)
  const [rowsPerPage, setRowsPerPage] = useState(5); // number of rows per page
  const [totalRows, setTotalRows] = useState(0); // total number of rows from API
  // open/clos dialog to create department
  const [openCreate, setOpenCreate] = useState(false);

  const fetchDepartmentData = async () => {
    try {
      const response = await fetch(
        `${baseUrl}/department?pageNumber=${
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

      if (!response.ok) throw new Error("Failed to get the department data");

      const data = await response.json();
      setDepartmentData(data?.data?.results || []); // deposit data
      setTotalRows(data?.data?.count || 0); // total row count from api
    } catch (error) {
      console.log("Error", error);
    }
  };

  // get all department data
  useEffect(() => {
    fetchDepartmentData();
    setLoading(false);
  }, [page, rowsPerPage]);

  // handle page change
  const handlePageChange = (e, newPage) => {
    setPage(newPage);
  };

  // handle rows per page change
  const handleRowsPerPageChange = (e) => {
    setRowsPerPage(parseInt(e.target.value, 10)); // 10 for decimal number system, if binary it will be 2
    setPage(0); // reset to the first page when rows per page changes
  };

  // handle form changes (add department)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Create department
  const handleCreate = async () => {
    try {
      const response = await fetch(`${baseUrl}/department`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
        credentials: "include",
        body: JSON.stringify({
          name: formData.name,
          description: formData.description,
        }),
      });

      if (!response.ok)
        throw new Error("Error occur during creating department");

      await fetchDepartmentData(); // get department data again after creating a new department
      setOpenCreate(false); // close the create department form
    } catch (error) {
      console.log("Error", error);
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

      {/* Department Heading */}
      <Typography variant="h5" textAlign="center" sx={{ my: 4 }}>
        Departments
      </Typography>

      {/* Create Department Button */}
      <Box textAlign="right" m={2}>
        <Button
          variant="outlined"
          size="small"
          sx={{ borderColor: "#3A1078", color: "#3A1078" }}
          onClick={() => setOpenCreate(true)}
        >
          Add Department
        </Button>
      </Box>

      {/* Departments Table */}
      <TableContainer component={Paper} sx={{ maxWidth: "97%", mx: "auto" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {departmentData.map((department) => (
              <TableRow key={department?.id}>
                <TableCell>{department?.name}</TableCell>
                <TableCell>{department?.description}</TableCell>
                <TableCell>Edit</TableCell>
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

      {/* Create Department */}
      <Dialog open={openCreate} onClose={() => setOpenCreate(false)}>
        <DialogTitle>Create Department</DialogTitle>

        <DialogContent>
          <Grid2 container spacing={2}>
            <Grid2 item size={12}>
              <TextField
                size="small"
                fullWidth
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Grid2>
            <Grid2 item size={12}>
              <TextField
                size="small"
                fullWidth
                multiline
                rows={3}
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </Grid2>
          </Grid2>
        </DialogContent>
        <DialogActions sx={{ mr: 2, mb: 1 }}>
          <Button
            size="small"
            onClick={() => {
              setFormData(initialFormData);
              setOpenCreate(false);
            }}
            variant="outlined"
            color="error"
          >
            Cancel
          </Button>
          <Button
            variant="outlined"
            size="small"
            onClick={handleCreate}
            sx={{ borderColor: "#3A1078", color: "#3A1078" }}
          >
            Add Department
          </Button>
        </DialogActions>
      </Dialog>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default AdminDepartments;
