import { Typography, Card, CardContent } from "@mui/material";
import Grid from "@mui/material/Grid";

import { Chart } from "./components/Chart";
import { Shortcut } from "./components/Shortcut";
import Grafik from "./components/Grafik";
import { NeracaDaya } from "./components/neraca-daya";
import { StatusPembangkit } from "./components/StatusPembangkit";
import { MonitoringIBT } from "./components/MonitoringIBT";
import { MonitoringPenghantar } from "./components/MonitoringPenghantar";
import { TeganganSubsistem } from "./components/TeganganSubsistem";
import JadwalShift from "./components/JadwalShift";
import { pengaturanSubsistem } from "./Home.constant";

const Home = () => {
  return (
    <>
      <Grid container spacing={6} height="auto">
        <Grid item xs={6}>
          <Card sx={{ height: 390 }}>
            <CardContent>
              <Typography variant="h6">Pengaturan Sistem</Typography>
              <Grid container spacing={4} mt="24px">
                {pengaturanSubsistem.map((value) => (
                  <Shortcut key={value} title={value} />
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Chart />
        </Grid>
        <Grid item xs={6}>
          <Grafik title="Pembebanan Sistem Jateng & DIY" />
        </Grid>
        <Grid item xs={6}>
          <Grafik title="Beban Subsistem" />
        </Grid>
        <Grid item xs={7}>
          <NeracaDaya />
        </Grid>
        <Grid item xs={5}>
          <StatusPembangkit />
        </Grid>
        <Grid item xs={7}>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <JadwalShift />
            </Grid>
            <Grid item xs={12}>
              <TeganganSubsistem />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={5}>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <MonitoringIBT />
            </Grid>
            <Grid item xs={12}>
              <MonitoringPenghantar />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Home;
