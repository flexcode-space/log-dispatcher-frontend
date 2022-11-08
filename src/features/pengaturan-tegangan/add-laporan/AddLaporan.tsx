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
          <Typography variant="h6" sx={{ mb: 3, lineHeight: "2rem" }}>
            Tambah Laporan
          </Typography>
        </Box>
        <FormProvider {...formMethods}>
          <StyledForm noValidate onSubmit={() => null} sx={{ width: "100%" }}>
            <Grid container spacing={2} mt={1}>
              <Grid item xs={12}>
                <SelectInput
                  label="Gard Induk"
                  name="gardu_induk"
                  options={[]}
                />
              </Grid>
              <Grid item xs={12}>
                <SelectInput label="Peralatan" name="peralatan" options={[]} />
              </Grid>
              <Grid item xs={12}>
                <SelectInput label="Open" name="open" options={[]} />
              </Grid>
              <Grid item xs={12}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker label="Tanggal" name="tanggal" />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <TimePicker label="Waktu" name="waktu" />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle1" fontWeight="bold">
                  Tegangan
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <InputField name="sebelum" label="Sebelum" />
              </Grid>
              <Grid item xs={6}>
                <InputField name="sesudah" label="Sesudah" />
              </Grid>
              <Grid item xs={12}>
                <InputField name="mvar" label="MVAR" />
              </Grid>
              <Grid item xs={12}>
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
