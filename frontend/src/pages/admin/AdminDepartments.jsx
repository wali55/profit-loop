import AdminNavbar from "../../components/admin/AdminNavbar";
import Footer from "../../components/common/Footer";
import { Typography, Table, TableHead, TableBody, TableCell, TableRow, TableContainer, TablePagination } from "@mui/material";

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

        {/* Footer */}
        <Footer />
    </div>
  )
}

export default AdminDepartments