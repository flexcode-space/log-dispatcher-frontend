import { useState } from "react";
import { Card, Grid, Typography } from "@mui/material";
import { TabList, TabPanel, TabContext } from "@mui/lab";
import { Tab, TabName } from "src/components/tab";
import PageHeader from "src/@core/components/page-header";
import { OLS } from "./ols";
import { OGS } from "./ogs";
import { DS } from "./ds";
import { TargetIsland } from "./target-island";
import { UFR } from "./ufr";
import { TAB_MENU } from "./DefenseSchema.constant";

const DefenseSchema = () => {
  const [activeTab, setActiveTab] = useState<string>("ufr");

  return (
    <TabContext value={activeTab}>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <PageHeader
            title={<Typography variant="h5">Defense Scheme</Typography>}
          />
        </Grid>
        <Grid item xs={12}>
          <Card>
            <TabList onChange={(e, newValue) => setActiveTab(newValue)}>
              {TAB_MENU.map(({ value, label }) => (
                <Tab
                  key={value}
                  value={value}
                  label={<TabName>{label}</TabName>}
                />
              ))}
            </TabList>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <TabPanel sx={{ p: 0 }} value="ols">
            <OLS />
          </TabPanel>
          <TabPanel sx={{ p: 0 }} value="ogs">
            <OGS />
          </TabPanel>
          <TabPanel sx={{ p: 0 }} value="ds">
            <DS />
          </TabPanel>
          <TabPanel sx={{ p: 0 }} value="target">
            <TargetIsland />
          </TabPanel>
          <TabPanel sx={{ p: 0 }} value="ufr">
            <UFR />
          </TabPanel>
        </Grid>
      </Grid>
    </TabContext>
  );
};

export default DefenseSchema;
