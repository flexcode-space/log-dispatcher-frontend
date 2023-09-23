import { useEffect, useState } from "react";
import { Typography, TextField } from "@mui/material";
import DatePickerMui from "@mui/lab/DatePicker";
import Grid from "@mui/material/Grid";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { WrapperFilter } from "src/components/filter";
import { TableBebanSubsistem } from "./components/TableBebanSubsistem";
import { TableMonitoring } from "./components/TableMonitoring";
import { analisaBebanApi } from "src/api/analisa-beban";
import { convertDate } from "src/utils/date";
import RekorBeban from "./components/RekorBeban";

const AnalisaBeban = () => {
  const [date, setDate] = useState<any>(new Date());

  const {
    getMonitorIbt,
    getMonitorPenghantar,
    getMonitorTrafo,
    monitorIbtList,
    monitorPengahantarList,
    monitorTrafoList,
  } = analisaBebanApi();

  const tanggal = convertDate(date);

  useEffect(() => {
    getMonitorIbt({ tanggal });
    getMonitorPenghantar({ tanggal });
    getMonitorTrafo({ tanggal });
  }, [date]);

  return (
    <>
      <Grid container spacing={6}>
        <RekorBeban />
        <Grid item xs={12}>
          <WrapperFilter sx={{ alignItems: "center" }}>
            <Grid item>
              <Typography variant="h5">Analisa Harian</Typography>
            </Grid>
            <Grid item xs={2}>
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
        <Grid item xs={12}>
          <TableBebanSubsistem tanggal={tanggal} />
        </Grid>
        <Grid item xl={6}>
          <TableMonitoring title="Monitoring IBT" data={monitorIbtList} />
        </Grid>
        <Grid item xl={6}>
          <TableMonitoring
            title="Monitoring Penghantar"
            data={monitorPengahantarList}
          />
        </Grid>
        <Grid item xl={6}>
          <TableMonitoring title="Monitoring Trafo" data={monitorTrafoList} />
        </Grid>
      </Grid>
    </>
  );
};

export default AnalisaBeban;
