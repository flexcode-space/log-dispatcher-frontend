import Head from "next/head";

// ** React Imports
import { SyntheticEvent, useState } from "react";

// ** MUI Imports
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";
import { styled } from "@mui/material/styles";
import MuiTab, { TabProps } from "@mui/material/Tab";

// ** Icons Imports
import BellOutline from "mdi-material-ui/BellOutline";
import AccountOutline from "mdi-material-ui/AccountOutline";
import LockOpenOutline from "mdi-material-ui/LockOpenOutline";
import BookmarkOutline from "mdi-material-ui/BookmarkOutline";
import InformationOutline from "mdi-material-ui/InformationOutline";

const Tab = styled(MuiTab)<TabProps>(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    minWidth: 100,
  },
  [theme.breakpoints.down("sm")]: {
    minWidth: 67,
  },
}));

const TabName = styled("span")(({ theme }) => ({
  lineHeight: 1.71,
  marginLeft: theme.spacing(2.5),
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));

const SubsistemPage = () => {
  const [value, setValue] = useState<string>("account");

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const TAB_MENU = [
    { value: "ibt", label: "IBT" },
    { value: "pembangkit", label: "Pembangkit" },
    { value: "penghantar", label: "Penghantar" },
    { value: "trafo", label: "Trafo" },
    { value: "busbar", label: "Busbar" },
    { value: "reaktor", label: "Reaktor & Kapasitor" },
  ];

  return (
    <>
      <Head>
        <title>Master Data - Subsistem</title>
      </Head>
      <Card>
        <TabContext value={value}>
          <TabList
            onChange={handleChange}
            aria-label="account-settings tabs"
            sx={{
              borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
            }}
          >
            {TAB_MENU.map(({ value, label }) => (
              <Tab
                key={value}
                value={value}
                label={<TabName>{label}</TabName>}
              />
            ))}
          </TabList>

          <TabPanel sx={{ p: 0 }} value="ibt">
            <h1>test</h1>
          </TabPanel>
          <TabPanel sx={{ p: 0 }} value="security">
            <h1>test</h1>
          </TabPanel>
          <TabPanel sx={{ p: 0 }} value="info">
            <h1>test</h1>
          </TabPanel>
          <TabPanel sx={{ p: 0 }} value="billing">
            <h1>test</h1>
          </TabPanel>
          <TabPanel sx={{ p: 0 }} value="notifications">
            <h1>test</h1>
          </TabPanel>
        </TabContext>
      </Card>
    </>
  );
};

export default SubsistemPage;
