import { Grid, Typography } from "@mui/material";
import PageHeader from "src/@core/components/page-header";
import { TableInflow } from "./table-list";
import { TableGarung } from "./table-list/table-garung";

const Air = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <PageHeader title={<Typography variant="h5">Air</Typography>} />
      </Grid>
      <Grid item xs={12}>
        <TableInflow />
      </Grid>
      <Grid item xs={12}>
        <TableGarung />
      </Grid>
    </Grid>
  );
};

export default Air;
