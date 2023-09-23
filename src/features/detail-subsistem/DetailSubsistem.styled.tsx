import { styled } from "@mui/material/styles";
import MuiTab, { TabProps } from "@mui/material/Tab";

export const Tab = styled(MuiTab)<TabProps>(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    minWidth: 100,
  },
  [theme.breakpoints.down("sm")]: {
    minWidth: 67,
  },
}));

export const TabName = styled("span")(({ theme }) => ({
  lineHeight: 1.71,
  marginLeft: theme.spacing(2.5),
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));
