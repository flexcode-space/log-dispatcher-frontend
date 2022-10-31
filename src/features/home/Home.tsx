import {
  Typography,
  TextField,
  Card,
  CardContent,
  Button,
  Box,
} from "@mui/material";
import { Plus, ArrowRight } from "mdi-material-ui";
import DatePicketMui from "@mui/lab/DatePicker";
import Grid from "@mui/material/Grid";

import { Chart } from "./components/Chart";
import { Shortcut } from "./components/Shortcut";
import Grafik from "./components/Grafik";
import { NeracaDaya } from "./components/neraca-daya";
import { StatusPembangkit } from "./components/StatusPembangkit";
import { pengaturanSubsistem } from "./Home.constant";

const Home = () => {
  return (
    <>
      <Grid container spacing={6}>
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
        <Grid item xs={3}>
          <Chart title="Komposisi Pembebanan" />
        </Grid>
        <Grid item xs={3}>
          <Chart title="Beban Subsistem" />
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
      </Grid>
    </>
  );
};

export default Home;
