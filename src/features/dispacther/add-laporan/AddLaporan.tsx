import { useForm, FormProvider } from "react-hook-form";
import {
  Card,
  CardContent,
  Button,
  Box,
  Typography,
  Grid,
} from "@mui/material";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { SelectInput } from "src/components/select-input";
import { InputField } from "src/components/input-field";
import { DatePicker, TimePicker } from "src/components/date-picker";

import { StyledForm } from "src/components/form";

import { ENERGI_PRIMER } from "../Dispacther.constant";

const AddLaporan = () => {
  const formMethods = useForm({
    // resolver: yupResolver(validationSchema),
    // defaultValues: initialValues,
    mode: "onChange",
  });

  return (
    <Card>
      <CardContent>
        <Box sx={{ mb: 8 }}>
          <Typography variant="h5" sx={{ mb: 3, lineHeight: "2rem" }}>
            Tambah Laporan
          </Typography>
        </Box>
        <FormProvider {...formMethods}>
          <StyledForm noValidate onSubmit={() => null} sx={{ width: "100%" }}>
            <Grid container spacing={2} mt={1}>
              <Grid item xs={2.4}>
                <SelectInput label="Lokasi" name="lokasi" options={[]} />
              </Grid>
              <Grid item xs={2.4}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker label="Tanggal" name="tanggal" />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={2.4}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <TimePicker label="Perintah" name="perintah" />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={2.4}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <TimePicker label="Real" name="real" />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={2.4}>
                <SelectInput
                  label="Engergi Primer"
                  name="energi_primer"
                  options={ENERGI_PRIMER}
                />
              </Grid>

              <Grid item xs={2}>
                <SelectInput label="BOPS" name="bops" options={[]} />
              </Grid>

              <Grid item xs={2}>
                <SelectInput label="ACC" name="acc" options={[]} />
              </Grid>

              <Grid item xs={2}>
                <SelectInput
                  label="Pembangkit"
                  name="pembangkit"
                  options={[]}
                />
              </Grid>

              <Grid item xs={2}>
                <SelectInput
                  label="Start/Stop"
                  name="start_stop"
                  options={[]}
                />
              </Grid>

              <Grid item xs={4}>
                <InputField name="keterangan" label="Keterangan" />
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" type="submit">
                  Tambah
                </Button>
              </Grid>
            </Grid>
          </StyledForm>
        </FormProvider>
      </CardContent>
    </Card>
  );
};

export default AddLaporan;
