import { Grid, Typography } from "@mui/material";

import PageHeader from "src/@core/components/page-header";

const ProduksiKwh = () => {
  return (
    <Grid container spacing={6} height="auto">
      <Grid item xs={12}>
        <PageHeader
          title={<Typography variant="h5">Produksi kWh</Typography>}
        />
      </Grid>
    </Grid>
  );
};

export default ProduksiKwh;
