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
import { CardHeader } from "src/components/card";

const AddLaporan = () => {
  const formMethods = useForm({
    // resolver: yupResolver(validationSchema),
    // defaultValues: initialValues,
    mode: "onChange",
  });

  return (
    <Card>
      <FormProvider {...formMethods}>
        <StyledForm noValidate onSubmit={() => null} sx={{ width: "100%" }}>
          <CardHeader
            title="Tambah Laporan"
            action={<DatePicker label="Tanggal" name="tanggal" />}
          />
          <CardContent>
            <Grid container spacing={2} mt={1}>
              <Grid item xs={4}>
                <SelectInput label="Lokasi" name="lokasi" options={[]} />
              </Grid>
              <Grid item xs={4}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <TimePicker label="Jam Buka" name="jam_buka" />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={4}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <TimePicker label="Jam Tutup" name="jam_tutup" />
                </LocalizationProvider>
              </Grid>

              <Grid item xs={4}>
                <InputField name="tegangan_sebelum" label="Tegangan Sebelum" />
              </Grid>

              <Grid item xs={4}>
                <InputField name="tegangan_sesudah" label="Tegangan Sesudah" />
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
          </CardContent>
        </StyledForm>
      </FormProvider>
    </Card>
  );
};

export default AddLaporan;
