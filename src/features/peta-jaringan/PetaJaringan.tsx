import { Grid, Typography, Card, CardContent, TextField } from "@mui/material";
import PageHeader from "src/@core/components/page-header";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import DatePicketMui from "@mui/lab/DatePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { CardHeader } from "src/components/card";
import PetaJaringanImages from "src/assets/images/peta-jaringan.svg";

const PetaJaringan = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <PageHeader
          title={<Typography variant="h5">Peta Jaringan</Typography>}
        />
      </Grid>
      <Grid item xs={12}>
        <Card>
          <CardHeader
            title="Subsistem Pemalang"
            action={
              <div style={{ display: "flex", gap: "10px" }}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicketMui
                    value={new Date()}
                    inputFormat="dd/M/yyyy"
                    onChange={() => null}
                    renderInput={(params) => (
                      <TextField
                        size="small"
                        {...params}
                        sx={{ width: "250px" }}
                      />
                    )}
                  />
                </LocalizationProvider>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <TimePicker
                    label="Pilih Jam"
                    ampm={false}
                    value={new Date()}
                    onChange={() => null}
                    renderInput={(params) => (
                      <TextField size="small" {...params} />
                    )}
                  />
                </LocalizationProvider>
              </div>
            }
          />
          <CardContent sx={{ overflowX: "auto" }}>
            <PetaJaringanImages />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default PetaJaringan;
