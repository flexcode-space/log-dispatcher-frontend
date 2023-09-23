// ** MUI Import
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import CircularProgress from "@mui/material/CircularProgress";

const FallbackSpinner = () => {
  // ** Hook
  const theme = useTheme();

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Box component="img" width={40} height="auto" src="/images/favicon.ico" />
      <CircularProgress disableShrink sx={{ mt: 6 }} />
    </Box>
  );
};

export default FallbackSpinner;
