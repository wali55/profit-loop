import { useState, useEffect } from "react";
import AdminNavbar from "../../components/admin/AdminNavbar";
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
} from "@mui/material";
import { baseUrl } from "../../Base";

const AdminAllProjects = () => {
  const initialData = {
    projectName: "",
    departmentId: "",
    businessModel: "",
    investment_start_date: "",
    investment_end_date: "",
    projectDescription: "",
    project_image: "",
    hardware_asset_value: "",
    software_asset_value: "",
    brand_asset_value: "",
    property_asset_value: "",
    actual_project_value: 0,
    owner_share_percentage: "",
    investor_share_percentage: "",
    owner_share_value: 0,
    investor_share_value: 0,
    owner_profit_loss_percent: "",
    investor_profit_loss_percent: "",
    owner_approximate_profit: 0,
    investor_approximate_profit: 0,
    no_of_share_required: "",
    per_share_amount: 0,
    contract_duration: "",
    profit_loss_calc_month: "",
  };
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
  // project form data
  const [formData, setFormData] = useState(initialData);
  // open create project dialog
  const [openCreate, setOpenCreate] = useState(false);
  // track steps of the form
  const [activeStep, setActiveStep] = useState(0);
  // get department
  const [departmentData, setDepartmentData] = useState([]);
  // to show the image file name
  const [imageFileName, setImageFileName] = useState("");

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

  // fetch department data function
  const fetchDepartmentData = async () => {
    try {
      const response = await fetch(`${baseUrl}/department`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
        credentials: "include",
      });

      if (!response.ok) throw new Error("Failed to get the department data");

      const data = await response.json();
      setDepartmentData(data?.data || []);
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

  // get all department data
  useEffect(() => {
    fetchDepartmentData();
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

  // handle project form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "owner_share_percentage") {
      const investor_share_percentage = 100 - value;
      const owner_share_value = (formData.actual_project_value * value) / 100;
      const investor_share_value =
        formData.actual_project_value - owner_share_value;
      setFormData((prev) => ({
        ...prev,
        investor_share_percentage,
        owner_share_value,
        investor_share_value,
      }));
    }

    if (name === "owner_profit_loss_percent") {
      const investor_profit_loss_percent = 100 - value;
      setFormData((prev) => ({ ...prev, investor_profit_loss_percent }));
    }

    if (name === "no_of_share_required") {
      const per_share_amount = formData.investor_share_value / Number(value);
      setFormData((prev) => ({ ...prev, per_share_amount }));
    }

    if (name === "investment_start_date" || name === "investment_end_date") {
      const formattedDate = new Date(value).toLocaleDateString("en-CA"); // 'en-CA' locale formats date as yyyy-mm-dd
      setFormData((prev) => ({ ...prev, [name]: formattedDate }));
    }
  };

  // function for step navigation
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  // function for changing/putting image
  const handleImageChange = (e) => {
    const file = e.target.files[0]; // get the selected file
    if (file) {
      setImageFileName(file.name); // set the file name in the state
    }

    setFormData((prev) => ({ ...prev, project_image: e.target.files[0] }));
  };

  // create a project function
  const handleCreate = () => {};

  // steps array of sub headings
  const steps = ["General Information", "Project Value", "Contract"];

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

      {/* Create Project Button */}
      <Box textAlign="right" m={2}>
        <Button
          variant="outlined"
          size="small"
          sx={{ borderColor: "#3A1078", color: "#3A1078" }}
          onClick={() => setOpenCreate(true)}
        >
          Create Project
        </Button>
      </Box>

      {/* Create Project Form */}
      <Dialog open={openCreate} onClose={() => setOpenCreate(false)}>
        <DialogTitle>Create Project</DialogTitle>

        <DialogContent sx={{ minWidth: 450 }}>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {activeStep === 0 && (
            <Grid2 container spacing={2}>
              <Grid2 item size={12} sx={{ mt: 4 }}>
                <TextField
                  label="Project Name"
                  name="projectName"
                  fullWidth
                  value={formData.projectName}
                  onChange={handleChange}
                  size="small"
                />
              </Grid2>

              <Grid2 item size={12}>
                <FormControl fullWidth size="small">
                  <InputLabel>Department</InputLabel>
                  <Select
                    label="Department"
                    name="departmentId"
                    value={formData.departmentId}
                    onChange={handleChange}
                  >
                    {departmentData.map((department) => (
                      <MenuItem key={department?.id} value={department?.id}>
                        {department?.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid2>

              <Grid2 item size={12}>
                <FormControl fullWidth size="small">
                  <InputLabel>Business Model</InputLabel>
                  <Select
                    label="Business Model"
                    name="businessModel"
                    value={formData.businessModel}
                    onChange={handleChange}
                  >
                    <MenuItem value="service_based">Service Based</MenuItem>
                    <MenuItem value="quantity_based">Quantity Based</MenuItem>
                    <MenuItem value="installment_based">
                      Installment Based
                    </MenuItem>
                  </Select>
                </FormControl>
              </Grid2>

              <Grid2 item size={12}>
                <TextField
                  label="Investment Start Date"
                  name="investment_start_date"
                  fullWidth
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  value={formData.investment_start_date}
                  onChange={handleChange}
                  size="small"
                />
              </Grid2>

              <Grid2 item size={12}>
                <TextField
                  label="Investment End Date"
                  name="investment_end_date"
                  fullWidth
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  value={formData.investment_end_date}
                  onChange={handleChange}
                  size="small"
                />
              </Grid2>

              <Grid2 item size={12}>
                <Button
                  variant="outlined"
                  component="label"
                  fullWidth
                  sx={{ borderColor: "#3A1078", color: "#3A1078" }}
                >
                  Upload Image
                  <input type="file" hidden onChange={handleImageChange} />
                </Button>
              </Grid2>

              {imageFileName && (
                <Grid2 item size={12}>
                  <Typography variant="body2" color="textSecondary">
                    Selected File: {imageFileName}
                  </Typography>
                </Grid2>
              )}

              <Grid2 item size={12}>
                <TextField
                  label="Project Description"
                  name="projectDescription"
                  fullWidth
                  multiline
                  rows={3}
                  value={formData.projectDescription}
                  onChange={handleChange}
                  size="small"
                />
              </Grid2>
            </Grid2>
          )}

          {activeStep === 1 && (
            <Grid2 container spacing={2}>
              <Grid2 item size={12} sx={{ mt: 4 }}>
                <TextField
                  label="Hardware Asset Value"
                  name="hardware_asset_value"
                  fullWidth
                  value={formData.hardware_asset_value}
                  onChange={handleChange}
                  size="small"
                />
              </Grid2>

              <Grid2 item size={12}>
                <TextField
                  label="Software Value"
                  name="software_asset_value"
                  fullWidth
                  value={formData.software_asset_value}
                  onChange={handleChange}
                  size="small"
                />
              </Grid2>

              <Grid2 item size={12}>
                <TextField
                  label="Brand Value"
                  name="brand_asset_value"
                  fullWidth
                  value={formData.brand_asset_value}
                  onChange={handleChange}
                  size="small"
                />
              </Grid2>
            </Grid2>
          )}
        </DialogContent>

        <DialogActions sx={{mr: 3}}>
          {activeStep !== 0 && (
            <Button
              size="small"
              variant="outlined"
              sx={{ borderColor: "#CD5C08", color: "#CD5C08" }}
              onClick={handleBack}
            >
              Back
            </Button>
          )}
          {activeStep === steps.length - 1 ? (
            <Button
              size="small"
              variant="outlined"
              sx={{ borderColor: "#3A1078", color: "#3A1078" }}
              onClick={handleCreate}
            >
              Create Project
            </Button>
          ) : (
            <Button
              size="small"
              variant="outlined"
              sx={{ borderColor: "#7ABA78", color: "#7ABA78" }}
              onClick={handleNext}
            >
              Next
            </Button>
          )}
        </DialogActions>
      </Dialog>

      {/* All Projects Table */}
      <TableContainer component={Paper} sx={{ maxWidth: "97%", mx: "auto" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Ref. No.</TableCell>
              <TableCell>Name</TableCell>
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
                <TableCell>{project?.project_unique_id}</TableCell>
                <TableCell>{project?.projectName}</TableCell>
                <TableCell>
                  {project?.businessModel
                    .split("_")
                    .join(" ")
                    .charAt(0)
                    .toUpperCase() +
                    project?.businessModel.split("_").join(" ").slice(1)}
                </TableCell>
                <TableCell>
                  {project?.project_contact_info?.actual_project_value}
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
                  {project?.project_contact_info?.launch_date === null
                    ? "-"
                    : project?.project_contact_info?.launch_date}
                </TableCell>
                <TableCell>
                  {project?.project_contact_info?.mature_date === null
                    ? "-"
                    : project?.project_contact_info?.mature_date}
                </TableCell>
                <TableCell>
                  {project?.status.charAt(0).toUpperCase() +
                    project?.status.slice(1)}
                </TableCell>
                <TableCell>
                  <Button variant="outlined" size="small">
                    Make Available
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

export default AdminAllProjects;
