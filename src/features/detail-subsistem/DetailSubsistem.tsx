import Head from "next/head";

// ** React Imports
import { SyntheticEvent, useState } from "react";
import Card from "@mui/material/Card";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";

import { Penghantar } from "src/features/penghantar";

import { Tab, TabName } from "./DetailSubsistem.styled";
import { TAB_MENU } from "./DetailSubsistem.constant";

const SubsistemDetail = () => {
  const [value, setValue] = useState<string>("ibt");

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

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
          <TabPanel sx={{ p: 0 }} value="penghantar">
            <Penghantar />
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

export default SubsistemDetail;
