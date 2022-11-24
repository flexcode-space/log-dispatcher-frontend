import Head from "next/head";
import { Grid, Card, CardContent } from "@mui/material";
import { DataTable } from "src/components/table";

const AirPage = () => {
  return (
    <>
      <Head>
        <title>Energi Primer - Air</title>
      </Head>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <DataTable />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default AirPage;
