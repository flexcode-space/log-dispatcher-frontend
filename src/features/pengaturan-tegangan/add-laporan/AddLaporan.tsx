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
import { yupResolver } from "@hookform/resolvers/yup";
import { SelectInput } from "src/components/select-input";
import { InputField } from "src/components/input-field";
import { DatePicker, TimePicker } from "src/components/date-picker";

import { StyledForm } from "src/components/form";
import { usePengaturanTegangan } from "../usePengaturanTegangan";
import {
  validationSchema,
  initialValues,
} from "../PengaturanTegangan.constant";
import dayjs from "dayjs";
import { pengaturanTeganganApi } from "src/api/pengaturan-tegangan";
import { setReloadPage } from "src/state/reloadPage";

const AddLaporan = () => {
  const { garduIndukOptions, openCloseOptions, konfigurasiOptions } =
    usePengaturanTegangan();

  const { createPengaturanTegangan } = pengaturanTeganganApi();

  const formMethods = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: initialValues,
    mode: "onChange",
  });

  const onSubmit = (event?: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();

    formMethods.handleSubmit(async (values) => {
      const { tanggal, waktu, ...rest } = values;

      const payload = {
        ...rest,
        tanggal: dayjs(tanggal).format("YYYY-MM-DD"),
        waktu: dayjs(waktu).format("HH:mm"),
      };

      await createPengaturanTegangan(payload);
      formMethods.reset({ ...initialValues });
      setReloadPage("pengaturan-tegangan");
    })();
  };

  return (
    <Card>
      <CardContent>
        <Box sx={{ mb: 8 }}>
          <Typography variant="h6" sx={{ mb: 3, lineHeight: "2rem" }}>
            Tambah Laporan
          </Typography>
        </Box>
        <FormProvider {...formMethods}>
          <StyledForm noValidate onSubmit={onSubmit} sx={{ width: "100%" }}>
            <Grid container spacing={2} mt={1}>
              <Grid item xs={12}>
                <SelectInput
                  label="Gard Induk"
                  name="gardu_induk_id"
                  options={garduIndukOptions}
                />
              </Grid>
              <Grid item xs={12}>
                <SelectInput
                  label="Jurusan"
                  name="jurusan_id"
                  options={konfigurasiOptions}
                />
              </Grid>
              <Grid item xs={12}>
                <SelectInput
                  label="Open / Close"
                  name="open_close"
                  options={openCloseOptions}
                />
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
                <InputField type="number" name="sebelum" label="Sebelum" />
              </Grid>
              <Grid item xs={6}>
                <InputField type="number" name="sesudah" label="Sesudah" />
              </Grid>
              <Grid item xs={12}>
                <InputField type="number" name="mvar" label="MVAR" />
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
