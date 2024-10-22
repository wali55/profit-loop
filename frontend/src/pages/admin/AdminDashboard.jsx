import { useState, useEffect, useMemo } from "react";
import {
  MenuItem,
  Box,
  Typography,
  Card,
  CardContent,
  Grid2,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  FormControl,
  InputLabel,
  TablePagination,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  Work,
  AccountBalance,
  AttachMoney,
} from "@mui/icons-material";
import AdminNavbar from "../../components/admin/AdminNavbar";
import Footer from "../../components/common/Footer";
import { baseUrl } from "../../Base";
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';

const AdminDashboard = () => {
  const token = localStorage.getItem("token");
  const [projects, setProjects] = useState([]);

  
  const fetchProjectData = async () => {
    const response = await fetch(`${baseUrl}/projects`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: token
      },
      credentials: "include"
    })

    if (!response.ok) throw new Error("Error occur when try to fetch project data");

    const data = await response.json();
    setProjects(data?.data);
  };

  useEffect(() => {
    fetchProjectData();
  }, []);

  const noOfProjects = projects.length || 0;

  let totalProjectValue = 0;
  let totalInvestmentRequired = 0;
  let totalInvestedAmount = 0;

  projects.map((project) => {
    totalProjectValue += project?.project_contact_info?.actual_project_value || 0;
    totalInvestmentRequired += project?.project_contact_info?.investor_share_value || 0;
    totalInvestedAmount += project?.project_contact_info?.total_invested_amount || 0;
  })

  return (
    <div>
      {/* Nav section */}
      <AdminNavbar />

      {/* Card Section */}
      <Grid2 container spacing={3} padding={3}>
        {/* Card 1 No. Of Projects */}
        <Grid2 item size={{ xs: 12, md: 6 }}>
          <Card sx={{ textAlign: "center" }}>
            <CardContent>
              <Work sx={{ fontSize: 40, color: "#5F0F40" }} />
              <Typography variant="body2" color="textSecondary">
                No. Of Projects
              </Typography>
              <Typography variant="h4" fontWeight="bold">
                {noOfProjects}
              </Typography>
            </CardContent>
          </Card>
        </Grid2>

        {/* Card 2 Total Withdrawn */}
        <Grid2 item size={{ xs: 12, md: 6 }}>
          <Card sx={{ textAlign: "center" }}>
            <CardContent>
              <MonetizationOnIcon sx={{ fontSize: 40, color: "#5F0F40" }} />
              <Typography variant="body2" color="textSecondary">
                Total Project Value (AED)
              </Typography>
              <Typography variant="h4" fontWeight="bold">
                {totalProjectValue}
              </Typography>
            </CardContent>
          </Card>
        </Grid2>

        {/* Card 2 Total Investment */}
        <Grid2 item size={{ xs: 12, md: 6 }}>
          <Card sx={{ textAlign: "center" }}>
            <CardContent>
              <AccountBalance sx={{ fontSize: 40, color: "#5F0F40" }} />
              <Typography variant="body2" color="textSecondary">
                Total Investment Required (AED)
              </Typography>
              <Typography variant="h4" fontWeight="bold">
                {totalInvestmentRequired}
              </Typography>
            </CardContent>
          </Card>
        </Grid2>

        {/* Card 2 Total Earning */}
        <Grid2 item size={{ xs: 12, md: 6 }}>
          <Card sx={{ textAlign: "center" }}>
            <CardContent>
              <AttachMoney sx={{ fontSize: 40, color: "#5F0F40" }} />
              <Typography variant="body2" color="textSecondary">
                Total Invested Amount (AED)
              </Typography>
              <Typography variant="h4" fontWeight="bold">
                {totalInvestedAmount}
              </Typography>
            </CardContent>
          </Card>
        </Grid2>
      </Grid2>

      <Footer />
    </div>
  );
};

export default AdminDashboard;
