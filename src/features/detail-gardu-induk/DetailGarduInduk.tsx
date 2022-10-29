import { SyntheticEvent, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { TabList, TabPanel, TabContext } from "@mui/lab";

import { Card, Grid, Typography, Breadcrumbs, Link } from "@mui/material";
import PageHeader from "src/@core/components/page-header";

import { garduIndukApi } from "src/api/gardu-induk";

import { Penghantar } from "src/features/penghantar";
import { IBT } from "src/features/ibt";
import { Pembangkit } from "src/features/pembangkit";
import { Trafo } from "src/features/trafo";
import { Busbar } from "src/features/busbar";
import { Reaktor } from "src/features/reaktor";

import { Tab, TabName } from "./DetailGarduInduk.styled";
import { TAB_MENU } from "./DetailGarduInduk.constant";

const GarduIndukDetail = () => {
  const router = useRouter();
  const [garduInduk, setGarduInduk] = useState<string>("");

  const id = router.query.id as string;
  const tab = (router.query.tab as string) || "ibt";

  const { getGarduIndukDetail } = garduIndukApi();

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    router.replace(
      { pathname: `/master-data/gardu-induk/${id}`, query: { tab: newValue } },
      undefined,
      { shallow: true }
    );
  };

  useEffect(() => {
    if (id) {
      getGarduIndukDetail(id).then((value: any) => setGarduInduk(value.nama));
    }
  }, [id]);

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Breadcrumbs aria-label="breadcrumb" sx={{ mb: "20px" }}>
          <Link underline="hover" color="inherit" href="/master-data/gardu-induk">
            Gardu Induk
          </Link>
          <Typography color="text.primary">{garduInduk}</Typography>
        </Breadcrumbs>
        <PageHeader title={<Typography variant="h5">{garduInduk}</Typography>} />
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

export default GarduIndukDetail;
