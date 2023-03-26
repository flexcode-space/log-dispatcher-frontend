import { Typography, Card, CardContent } from "@mui/material";
import Grid from "@mui/material/Grid";
import { Chart } from "./components/Chart";
import { Shortcut } from "./components/Shortcut";
import Grafik from "./components/Grafik";
import { NeracaDaya } from "./components/neraca-daya";
import { StatusPembangkit } from "./components/StatusPembangkit";
import { MonitoringIBT } from "./components/MonitoringIBT";
// import { MonitoringPenghantar } from "./components/MonitoringPenghantar";
// import { TeganganSubsistem } from "./components/TeganganSubsistem";
import JadwalShift from "./components/JadwalShift";
import { pengaturanSubsistem } from "./Home.constant";
import { berandaApi } from "src/api/beranda";
import { useEffect } from "react";
import { useRouter } from "next/router";
import dayjs from "dayjs";
import { GrafikBebanDistribusi } from "./components/grafik-beban-distribusi";

const Home = () => {
  const router = useRouter();

  const date = dayjs().format("YYYY-MM-DD");

  const {
    getMonitoringIBT,
    getPengaturanSistem,
    getMonitoringPenghantar,
    getStatusPembangkitan,
    getMonitorAnalisaBeban,
    ibtList,
    penghantarList,
    pengaturanSistem,
    statusPembangkitanList,
    monitorAnalisaBeban,
  } = berandaApi();

  const dataPenghantar = penghantarList?.map((value, index) => ({
    id: index,
    ...(value as Object),
  }));

  const dataIbt = ibtList?.map((value, index) => ({
    id: index,
    ...(value as Object),
  }));

  const statusPembangkitan = statusPembangkitanList?.map((value, index) => ({
    id: index,
    ...(value as Object),
  }));

  const tegangganSubsistem = monitorAnalisaBeban?.tertinggi?.map(
    (value, index) => ({
      ...value,
      tegangan_terendah: monitorAnalisaBeban?.terendah?.[index].tegangan,
    })
  );

  useEffect(() => {
    getPengaturanSistem();
    getMonitoringPenghantar({ tanggal: date, limit: 10 });
    getMonitoringIBT({ tanggal: date });
    getStatusPembangkitan({ tanggal: date });
    getMonitorAnalisaBeban({ tanggal: date });
  }, []);

  return (
    <>
      <Grid container spacing={6} height="auto">
        <Grid item xs={6}>
          <Card sx={{ height: 390 }}>
            <CardContent>
              <Typography variant="h6">Pengaturan Sistem</Typography>
              <Grid container spacing={4} mt="24px">
                {pengaturanSubsistem.map((value) => (
                  <Shortcut
                    key={value.type}
                    title={value.name}
                    count={(pengaturanSistem as any)[value.type]}
                    onClick={() => router.push(value.path)}
                  />
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Chart />
        </Grid>
        <Grid item xs={6}>
          <GrafikBebanDistribusi
            title="Pembebanan Sistem Jateng & DIY"
            path="total-pembangkit"
          />
        </Grid>
        <Grid item xs={6}>
          <Grafik title="Beban Subsistem" />
        </Grid>
        <Grid item xs={7}>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <NeracaDaya />
            </Grid>
            <Grid item xs={12}>
              <JadwalShift onClick={() => router.push("/piket-dan-shift")} />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={5}>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <StatusPembangkit data={(statusPembangkitan as []) || []} />
            </Grid>
            <Grid item xs={12}>
              <MonitoringIBT data={(dataIbt as []) || []} />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={7}>
          <Grid container spacing={6}>
            {/* <Grid item xs={12}>
              <JadwalShift onClick={() => router.push("/piket-dan-shift")} />
            </Grid> */}
            {/* <Grid item xs={12}>
              <TeganganSubsistem data={(tegangganSubsistem as []) || []} />
            </Grid> */}
          </Grid>
        </Grid>
        <Grid item xs={5}>
          <Grid container spacing={6}>
            {/* <Grid item xs={12}>
              <MonitoringIBT data={(dataIbt as []) || []} />
            </Grid> */}
            {/* <Grid item xs={12}>
              <MonitoringPenghantar data={(dataPenghantar as []) || []} />
            </Grid> */}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Home;
