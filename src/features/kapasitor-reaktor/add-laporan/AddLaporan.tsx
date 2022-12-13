import { useForm, FormProvider } from "react-hook-form";
import { Card, CardContent, Button, Grid } from "@mui/material";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { yupResolver } from "@hookform/resolvers/yup";
import { SelectInput } from "src/components/select-input";
import { InputField } from "src/components/input-field";
import { DatePicker, TimePicker } from "src/components/date-picker";

import { StyledForm } from "src/components/form";
import { CardHeader } from "src/components/card";
import { useKapasitorReaktor } from "../useKapasitorReaktor";
import { initialValues, validationSchema } from "../KapasitorReaktor.constant";
import dayjs from "dayjs";
import { kapasitorReaktorApi } from "src/api/kapasitorReaktorApi";
import { reloadPage } from "src/state/modal";

const AddLaporan = () => {
  const formMethods = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: initialValues,
    mode: "onChange",
  });

  const { createKapasitorReaktor } = kapasitorReaktorApi();
  const { garduIndukOptions } = useKapasitorReaktor();

  const onSubmit = (event?: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();

    formMethods.handleSubmit(async (values) => {
      const { tanggal, jam_buka, jam_tutup, ...rest } = values;

      const payload = {
        ...rest,
        jam_buka: dayjs(jam_buka).format("hh:mm"),
        jam_tutup: dayjs(jam_tutup).format("hh:mm"),
        tanggal: dayjs(tanggal).format("YYYY-MM-DD"),
      };

      await createKapasitorReaktor(payload);
      reloadPage();
    })();
  };

  return (
    <Card>
      <FormProvider {...formMethods}>
        <StyledForm noValidate onSubmit={onSubmit} sx={{ width: "100%" }}>
          <CardHeader
            title="Tambah Laporan"
            action={<DatePicker label="Tanggal" name="tanggal" />}
          />
          <CardContent>
            <Grid container spacing={2} mt={1}>
              <Grid item xs={4}>
                <SelectInput
                  label="Lokasi"
                  name="gardu_induk_id"
                  options={garduIndukOptions}
                />
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
                <InputField
                  type="number"
                  name="tegangan_sebelum"
                  label="Tegangan Sebelum"
                />
              </Grid>

              <Grid item xs={4}>
                <InputField
                  type="number"
                  name="tegangan_sesudah"
                  label="Tegangan Sesudah"
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
          </CardContent>
        </StyledForm>
      </FormProvider>
    </Card>
  );
};

export default AddLaporan;
