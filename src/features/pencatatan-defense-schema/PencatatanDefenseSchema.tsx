import { useState } from "react";
import { Card, Grid, Breadcrumbs, Typography, Link } from "@mui/material";
import { TabList, TabPanel, TabContext } from "@mui/lab";
import { Tab, TabName } from "src/components/tab";
import OLS from "./OLS";
import { TAB_MENU } from "./PencatatanDefenseSchema.constant";
import PageHeader from "src/@core/components/page-header";
import OGS from "./OGS";
import DS from "./DS";
import UFR from "./UFR";
import TargetIsland from "./TargetIsland";

const DefenseSchema = () => {
  const [activeTab, setActiveTab] = useState<string>("ols");

  return (
    <TabContext value={activeTab}>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Breadcrumbs aria-label="breadcrumb" sx={{ mb: "20px" }}>
            <Link underline="hover" color="inherit" href="/defense-schema">
              Defense Scheme
            </Link>
            <Typography color="text.primary">Pencatatan</Typography>
          </Breadcrumbs>
          <PageHeader
            title={
              <Typography variant="h5">Pencatatan Defense Scheme</Typography>
            }
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
