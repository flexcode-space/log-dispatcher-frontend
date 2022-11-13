import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import PageHeader from "src/@core/components/page-header";
import { subsistemApi } from "src/api/subsistem";
import { GrafikBebanDistribusi } from "./grafik-beban-distribusi";
import { GrafikSubsistem } from "./grafik-subsistem";

export type DateType = Date | null | undefined;

const Grafik = () => {
  const { getSubsistemList, subsistemList } = subsistemApi();

  useEffect(() => {
    getSubsistemList();
  }, []);

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <PageHeader title={<Typography variant="h5">Grafik</Typography>} />
      </Grid>
      <Grid item xs={12} sm={12}>
        <GrafikBebanDistribusi />
      </Grid>
      <Grid item xs={12}>
        <PageHeader title={<Typography variant="h5">Subsistem</Typography>} />
      </Grid>
      {subsistemList.map((subsistem: any) => (
        <Grid key={subsistem?.id} item xs={12} sm={6}>
          <GrafikSubsistem id={subsistem?.id} name={subsistem?.nama} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Grafik;
