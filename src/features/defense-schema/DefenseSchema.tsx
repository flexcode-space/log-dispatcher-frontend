import { useState } from "react";
import { Button, Card, Grid, IconButton, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { TabList, TabPanel, TabContext } from "@mui/lab";
import { Tab, TabName } from "src/components/tab";
import { OLS } from "./ols";
import { OGS } from "./ogs";
import { DS } from "./ds";
import { TargetIsland } from "./target-island";
import { UFR } from "./ufr";
import { TAB_MENU } from "./DefenseSchema.constant";
import { WrapperFilter } from "src/components/filter";
import PencatatanIcon from "src/assets/icons/pencatatan-icon.svg";

const DefenseSchema = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<string>("ols");

  return (
    <TabContext value={activeTab}>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <WrapperFilter sx={{ alignItems: "baseline" }}>
            <Typography variant="h5">Defense Scheme</Typography>
            <div style={{ display: "flex", gap: "10px" }}>
              <Button
                variant="outlined"
                onClick={() => router.push("/defense-schema/pencatatan")}
                size="small"
              >
                <IconButton>
                  <PencatatanIcon />
                </IconButton>
                Lihat pencatatan
              </Button>
            </div>
          </WrapperFilter>
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
