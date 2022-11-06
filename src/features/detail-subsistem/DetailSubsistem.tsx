import { SyntheticEvent, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { TabList, TabPanel, TabContext } from "@mui/lab";

import { Card, Grid, Typography, Breadcrumbs, Link } from "@mui/material";
import PageHeader from "src/@core/components/page-header";

import { subsistemApi } from "src/api/subsistem";

import { Penghantar } from "src/features/penghantar";
import { IBT } from "src/features/ibt";
import { Pembangkit } from "src/features/pembangkit";
import { Trafo } from "src/features/trafo";
import { Busbar } from "src/features/busbar";
import { Reaktor } from "src/features/reaktor";

import { Tab, TabName } from "./DetailSubsistem.styled";
import { TAB_MENU } from "./DetailSubsistem.constant";

const SubsistemDetail = () => {
  const router = useRouter();
  const [subsistem, setSubsistem] = useState<string>("");

  const id = router.query.id as string;
  const tab = (router.query.tab as string) || "ibt";

  const { getSubsistemDetail } = subsistemApi();

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    router.replace(
      { pathname: `/master-data/sub-sistem/${id}`, query: { tab: newValue } },
      undefined,
      { shallow: true }
    );
  };

  useEffect(() => {
    if (id) {
      getSubsistemDetail(id).then((value: any) => setSubsistem(value.nama));
    }
  }, [id]);

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Breadcrumbs aria-label="breadcrumb" sx={{ mb: "20px" }}>
          <Link underline="hover" color="inherit" href="/master-data/sub-sistem">
            Subsistem
          </Link>
          <Typography color="text.primary">{subsistem}</Typography>
        </Breadcrumbs>
        <PageHeader title={<Typography variant="h5">{subsistem}</Typography>} />
      </Grid>
      <Grid item xs={12}>
        <Card>
          <TabContext value={tab}>
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
      </Grid>
    </Grid>
  );
};

export default SubsistemDetail;
