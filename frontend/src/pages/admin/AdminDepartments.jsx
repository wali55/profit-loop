import AdminNavbar from "../../components/admin/AdminNavbar";
import Footer from "../../components/common/Footer";
import { Typography, Table, TableHead, TableBody, TableCell, TableRow, TableContainer, TablePagination, Paper } from "@mui/material";

const AdminDepartments = () => {
  return (
    <div>
        {/* Navbar */}
        <AdminNavbar />

        {/* Department Heading */}
        <Typography variant="h5" textAlign="center" sx={{my: 4}}>
            Departments
        </Typography>

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
              <TableRow>
                <TableCell>IT</TableCell>
                <TableCell>IT Department</TableCell>
                <TableCell>Edit</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        {/* Footer */}
        <Footer />
    </div>
  )
}

export default AdminDepartments