import { Box, Typography } from "@mui/material";

const Footer = ({ children }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '80vh', // Ensures the page takes full height
      }}
    >
      <Box sx={{ flexGrow: 1 }}>{children}</Box> {/* Page Content */}
      <MyFooter /> {/* Footer always at the bottom */}
    </Box>
  );
};

const MyFooter = () => {
  return (
    <Box
      sx={{
        mt: 'auto',
        p: 4,
        textAlign: 'center',
        backgroundColor: '#3A1078', 
        color: 'white',
      }}
    >
      <Typography>SamaraBiz © 2024 All Rights Reserved​</Typography>
    </Box>
  );
};

export default Footer;




