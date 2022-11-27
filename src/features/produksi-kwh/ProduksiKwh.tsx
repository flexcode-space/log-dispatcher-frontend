import { useState } from "react";
import { Grid, Typography, TextField } from "@mui/material";
import DatePickerMui from "@mui/lab/DatePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import PageHeader from "src/@core/components/page-header";
import { WrapperFilter } from "src/components/filter";
import Card from "./components/Card";
import { TableProduksi } from "./table-produksi/TableProduksi";
import { dataMock } from "./table-produksi/TableProduksi.constant";

const ProduksiKwh = () => {
  const [date, setDate] = useState<any>(new Date());
  return (
    <Grid container spacing={6} height="auto">
      <Grid item xs={12}>
        <WrapperFilter>
          <Grid item>
            <PageHeader
              title={<Typography variant="h5">Produksi kWh</Typography>}
            />
          </Grid>
          <Grid item>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePickerMui
                value={date}
                inputFormat="dd/M/yyyy"
                label="Tanggal"
                onChange={(e) => setDate(e)}
                renderInput={(params) => (
                  <TextField size="small" {...params} fullWidth />
                )}
              />
            </LocalizationProvider>
          </Grid>
        </WrapperFilter>
      </Grid>
      <Grid item xs={6} md={3}>
        <Card title="Konsumsi Jateng & DIY" value="28,468 kWh" />
      </Grid>
      <Grid item xs={6} md={3}>
        <Card title="Thermis" value="28,468 kWh" />
      </Grid>
      <Grid item xs={6} md={3}>
        <Card title="Pembangkitan" value="28,468 kWh" />
      </Grid>
      <Grid item xs={6} md={3}>
        <Card title="Transfer" value="28,468 kWh" />
      </Grid>
      <Grid item xs={6} md={2.4}>
        <Card title="PLTA" value="28,468 kWh" imageUrl="/images/plta.png" />
      </Grid>
      <Grid item xs={6} md={2.4}>
        <Card title="PLTU" value="28,468 kWh" imageUrl="/images/pltu.png" />
      </Grid>
      <Grid item xs={6} md={2.4}>
        <Card title="PLTG" value="28,468 kWh" imageUrl="/images/pltg.png" />
      </Grid>
      <Grid item xs={6} md={2.4}>
        <Card title="PLTGU" value="28,468 kWh" imageUrl="/images/pltgu.png" />
      </Grid>
      <Grid item xs={6} md={2.4}>
        <Card title="PLTP" value="28,468 kWh" imageUrl="/images/pltp.png" />
      </Grid>

      <Grid item xl={4} md={6}>
        <TableProduksi title="PLTGU - GAS" data={dataMock()} />
      </Grid>
      <Grid item xl={4} md={6}>
        <TableProduksi title="PLTGU - GAS" data={dataMock()} />
      </Grid>
      <Grid item xl={4} md={6}>
        <TableProduksi title="PLTGU - GAS" data={dataMock()} />
      </Grid>
      <Grid item xl={4} md={6}>
        <TableProduksi title="PLTGU - GAS" data={dataMock()} />
      </Grid>
    </Grid>
  );
};

export default ProduksiKwh;
