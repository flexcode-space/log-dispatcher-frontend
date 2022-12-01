import { useState } from "react";
import { Grid, Typography } from "@mui/material";
import PageHeader from "src/@core/components/page-header";
import { TableMonitoring } from "./table-monitoring";

const LaporanScada = () => {
  return (
    <>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <PageHeader
            title={<Typography variant="h5">Laporan SCADA</Typography>}
          />
        </Grid>
        <Grid item xs={12}>
          <TableMonitoring title="Monitoring SCADA OOP" />
        </Grid>
        <Grid item xs={12}>
          <TableMonitoring title="Monitoring Telemetering Tidak Sesuai" />
        </Grid>
      </Grid>
    </>
  );
};

export default LaporanScada;
