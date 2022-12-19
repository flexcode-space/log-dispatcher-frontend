import { useForm, FormProvider } from "react-hook-form";
import {
  Card,
  CardContent,
  Button,
  Box,
  Typography,
  Grid,
} from "@mui/material";
import { SelectInput } from "src/components/select-input";
import { InputField } from "src/components/input-field";
import { DatePicker, TimePicker } from "src/components/date-picker";

import { StyledForm } from "src/components/form";
import { useSwitchingPembengkit } from "../useSwitchingPembangkit";

const AddLaporan = () => {
  const {
    jenisSwitchingOptions,
    pembangkitOptions,
    statusOptions,
    energiPrimerOptions,
  } = useSwitchingPembengkit();

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
                  label="Jenis Switching"
                  name="jenis"
                  options={jenisSwitchingOptions}
                />
              </Grid>
              <Grid item xs={12}>
                <SelectInput
                  label="Pembangkit"
                  name="pembangkit_id"
                  options={pembangkitOptions}
                />
              </Grid>
              <Grid item xs={12}>
                <DatePicker label="Tanggal" name="tanggal" />
              </Grid>
              <Grid item xs={12}>
                <TimePicker label="Waktu Perintah" name="waktu_perintah" />
              </Grid>
              <Grid item xs={12}>
                <TimePicker label="Waktu Real" name="waktu_real" />
              </Grid>
              <Grid item xs={12}>
                <SelectInput
                  label="BPOS"
                  name="operator_bops_id"
                  options={[]}
                />
              </Grid>
              <Grid item xs={12}>
                <SelectInput label="ACC" name="operator_acc_id" options={[]} />
              </Grid>
              <Grid item xs={12}>
                <SelectInput
                  label="Operator Pembengkit"
                  name="operator_pembangkit_id"
                  options={[]}
                />
              </Grid>
              <Grid item xs={12}>
                <SelectInput
                  label="Energi Primer"
                  name="energi_primer"
                  options={energiPrimerOptions}
                />
              </Grid>
              <Grid item xs={12}>
                <SelectInput
                  label="Status"
                  name="status"
                  options={statusOptions}
                />
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
