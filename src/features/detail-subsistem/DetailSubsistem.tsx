import Head from "next/head";

// ** React Imports
import { SyntheticEvent, useState } from "react";
import Card from "@mui/material/Card";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";

import { Penghantar } from "src/features/penghantar";
import { IBT } from "src/features/ibt";
import { Pembangkit } from "src/features/pembangkit";
import { Trafo } from "src/features/trafo";
import { Busbar } from "src/features/busbar";
import { Reaktor } from "src/features/reaktor";

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
            <IBT />
          </TabPanel>
          <TabPanel sx={{ p: 0 }} value="pembangkit">
            <Pembangkit />
          </TabPanel>
          <TabPanel sx={{ p: 0 }} value="penghantar">
            <Penghantar />
          </TabPanel>
          <TabPanel sx={{ p: 0 }} value="trafo">
            <Trafo />
          </TabPanel>
          <TabPanel sx={{ p: 0 }} value="busbar">
            <Busbar />
          </TabPanel>
          <TabPanel sx={{ p: 0 }} value="reaktor">
            <Reaktor />
          </TabPanel>
        </TabContext>
      </Card>
    </>
  );
};

export default SubsistemDetail;
