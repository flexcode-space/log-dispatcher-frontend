import { Grid, Typography } from "@mui/material";
import PageHeader from "src/@core/components/page-header";
import ModalAddData from "./modal/ModalAddData";

import { TableList } from "./table-list";

const Batubara = () => {
  return (
    <>
      <ModalAddData />
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <PageHeader title={<Typography variant="h5">Batubara</Typography>} />
        </Grid>
        <TableList type="batubara" />

        <Grid item xs={12}>
          <PageHeader title={<Typography variant="h5">HSD - MFO</Typography>} />
        </Grid>

        <TableList type="hsd" />
      </Grid>
    </>
  );
};

export default Batubara;
