// ** MUI Imports
import { styled } from "@mui/material/styles";
import Box, { BoxProps } from "@mui/material/Box";

// ** Types
import { BlankLayoutProps } from "./types";
import FooterContent from "./components/shared-components/footer/FooterContent";
import { Typography, Link } from "@mui/material";

// Styled component for Blank Layout component
const BlankLayoutWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  height: "100vh",

  // For V1 Blank layout pages
  "& .content-center": {
    display: "flex",
    minHeight: "100vh",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing(5),
  },

  // For V2 Blank layout pages
  "& .content-right": {
    display: "flex",
    minHeight: "100vh",
    overflowX: "hidden",
    position: "relative",
  },
}));

const BlankLayout = ({ children }: BlankLayoutProps) => {
  return (
    <BlankLayoutWrapper className="layout-wrapper">
      <Box
        className="app-content"
        sx={{ minHeight: "100vh", overflowX: "hidden", position: "relative" }}
      >
        {children}
        <Box position="relative">
          <Box position="absolute" left="10px" bottom="10px">
            <Typography sx={{ mr: 2 }}>
              {`© ${new Date().getFullYear()}, Made with `}
              <Box component="span" sx={{ color: "error.main" }}>
                ❤️
              </Box>
              {` by `}
              <Link target="_blank" href="https://flexcode.co.id/">
                Flexcode
              </Link>
              &nbsp; Concept by: &nbsp;
              <Link href="#">Teuku Ridha Muhammad Saputra</Link>
            </Typography>
          </Box>
        </Box>
      </Box>
    </BlankLayoutWrapper>
  );
};

export default BlankLayout;
