import { Typography, TextField } from "@mui/material";
import DatePicketMui from "@mui/lab/DatePicker";
import Grid from "@mui/material/Grid";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import PageHeader from "src/@core/components/page-header";
import { DatePicker } from "src/components/date-picker";
import { WrapperFilter } from "src/components/filter";
import { TableBebanSubsistem } from "./components/TableBebanSubsistem";
import { TableMonitoring } from "./components/TableMonitoring";

const AnalisaBeban = () => {
  return (
    <>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <WrapperFilter sx={{ alignItems: "center" }}>
            <Grid item>
              <Typography variant="h5">Analisa Harian</Typography>
            </Grid>
            <Grid item xs={2}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicketMui
                  value={new Date()}
                  label="Tanggal"
                  onChange={() => null}
                  renderInput={(params) => (
                    <TextField size="small" {...params} fullWidth />
                  )}
                />
              </LocalizationProvider>
            </Grid>
          </WrapperFilter>
        </Grid>
        <Grid item xs={12}>
          <TableBebanSubsistem />
        </Grid>
        <Grid item xl={4} md={6}>
          <TableMonitoring title="Monitoring IBT" />
        </Grid>
        <Grid item xl={4} md={6}>
          <TableMonitoring title="Monitoring Penghantar" />
        </Grid>
        <Grid item xl={4} md={6}>
          <TableMonitoring title="Monitoring Trafo" />
        </Grid>
      </Grid>
    </>
  );
};

export default AnalisaBeban;
