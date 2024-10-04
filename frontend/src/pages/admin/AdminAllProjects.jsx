import { useState, useEffect } from "react";
import AdminNavbar from "../../components/admin/AdminNavbar";
import Footer from "../../components/common/Footer";
import { Typography, Table, TableContainer, TableHead, TableBody, TableRow, TableCell, TablePagination, Button, Paper } from "@mui/material";
import { baseUrl } from "../../Base";

const AdminAllProjects = () => {
  // retrieve token from localStorage
  const token = localStorage.getItem("token");
  //loading
  const [loading, setLoading] = useState(true);
  // project data
  const [projectData, setProjectData] = useState([]);
  // pagination
  const [page, setPage] = useState(0); // current page number (0 indexed)
  const [rowsPerPage, setRowsPerPage] = useState(5); // number of rows per page
  const [totalRows, setTotalRows] = useState(0); // total number of rows from API

  // fetch project data function
  const fetchProjectData = async () => {
    try {
      const response = await fetch(
        `${baseUrl}/projects?pageNumber=${
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

      if (!response.ok) throw new Error("Failed to get the projects data");

      const data = await response.json();
      setProjectData(data?.data?.results || []); // deposit data
      setTotalRows(data?.data?.count || 0); // total row count from api
    } catch (error) {
      console.log("Error", error);
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

  // show loading message when the data is being fetched
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      {/* Admin Navbar */}
      <AdminNavbar />

      {/* All Projects Heading */}
      <Typography variant="h5" textAlign="center" sx={{ my: 4 }}>
        All Projects
      </Typography>

      {/* All Projects Table */}
      <TableContainer component={Paper} sx={{maxWidth: "97%", mx: "auto"}}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Ref. No.</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Department</TableCell>
              <TableCell>Business Model</TableCell>
              <TableCell>Project Value (AED)</TableCell>
              <TableCell>Contract Duration</TableCell>
              <TableCell>Profit/Loss Calc. Month</TableCell>
              <TableCell>No. of Share</TableCell>
              <TableCell>Sold Share</TableCell>
              <TableCell>Launch Date</TableCell>
              <TableCell>Mature Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {projectData.map((project) => (
              <TableRow key={project?.id}>
                <TableCell>PR-101</TableCell>
                <TableCell>{project?.projectName}</TableCell>
                <TableCell>{project?.department?.name}</TableCell>
                <TableCell>{project?.businessModel.split("_").join(" ").charAt(0).toUpperCase() + project?.businessModel.split("_").join(" ").slice(1)}</TableCell>
                <TableCell>{project?.project_contact_info?.actual_project_value}</TableCell>
                <TableCell>{project?.project_contact_info?.contract_duration}</TableCell>
                <TableCell>{project?.project_contact_info?.profit_loss_calc_month}</TableCell>
                <TableCell>{project?.project_contact_info?.no_of_share_required}</TableCell>
                <TableCell>{project?.project_contact_info?.no_of_share_sold}</TableCell>
                <TableCell>{project?.project_contact_info?.launch_date === null ? "-" : project?.project_contact_info?.launch_date}</TableCell>
                <TableCell>{project?.project_contact_info?.mature_date === null ? "-" : project?.project_contact_info?.mature_date}</TableCell>
                <TableCell>{project?.status.charAt(0).toUpperCase() + project?.status.slice(1)}</TableCell>
                <TableCell><Button variant="outlined" size="small">Make Available</Button></TableCell>
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

export default AdminAllProjects;
