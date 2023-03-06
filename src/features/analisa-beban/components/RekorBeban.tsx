import { Grid, Typography } from "@mui/material";
import Card from "./Card";

const RekorBeban = () => {
  return (
    <>
      <Grid item xs={12}>
        <Grid item>
          <Typography variant="h5">Rekor Beban</Typography>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={6}>
          <Grid item xs={3}>
            <Card title="SS1" value="wr" />
          </Grid>
          <Grid item xs={3}>
            <Card title="SS1" value="wr" />
          </Grid>
          <Grid item xs={3}>
            <Card title="SS1" value="wr" />
          </Grid>
          <Grid item xs={3}>
            <Card title="SS1" value="wr" />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default RekorBeban;
