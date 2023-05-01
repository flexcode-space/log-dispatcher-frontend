import { useForm, FormProvider } from "react-hook-form";
import {
  Card,
  CardContent,
  Button,
  Box,
  Typography,
  Grid,
} from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import { SelectInput } from "src/components/select-input";
import { InputField } from "src/components/input-field";
import { DatePicker, TimePicker } from "src/components/date-picker";

import { StyledForm } from "src/components/form";
import { useSwitchingPembengkit } from "../useSwitchingPembangkit";
import {
  initialValues,
  validationSchema,
} from "../SwitchingPembangkit.constant";
import dayjs from "dayjs";
import { switchingPembangkitApi } from "src/api/switching-pembangkit";
import { setReloadPage } from "src/state/reloadPage";

const AddLaporan = () => {
  const {
    jenisSwitchingOptions,
    pembangkitOptions,
    // statusOptions,
    energiPrimerOptions,
    bopsOptions,
    accOptions,
    operatorOptions,
  } = useSwitchingPembengkit();

  const { createSwitchingPembangkit } = switchingPembangkitApi();

  const formMethods = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: initialValues,
    mode: "onChange",
  });

  const jenis = formMethods.watch("jenis");

  const onSubmit = (event?: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();

    formMethods.handleSubmit(async (values) => {
      const { tanggal, waktu_perintah, waktu_real, ...rest } = values;

      const payload = {
        ...rest,
        tanggal: dayjs(tanggal).format("YYYY-MM-DD"),
        waktu_perintah: dayjs(waktu_perintah).format("HH:mm"),
        waktu_real: dayjs(waktu_real).format("HH:mm"),
      };

      await createSwitchingPembangkit(payload);
      formMethods.reset({ ...initialValues });
      setReloadPage("switching-pembangkit");
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
                  label="Jenis Switching"
                  name="jenis"
                  options={jenisSwitchingOptions}
                />
              </Grid>
              {jenis === "start-stop" && (
                <Grid item xs={12}>
                  <SelectInput
                    label="Dispatch"
                    name="tipe"
                    options={[
                      {
                        value: "Start",
                        label: "Start",
                      },
                      {
                        value: "Stop",
                        label: "Stop",
                      },
                    ]}
                  />
                </Grid>
              )}
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
                  label="BOPS"
                  name="operator_bops_id"
                  options={bopsOptions}
                />
              </Grid>
              <Grid item xs={12}>
                <SelectInput
                  label="ACC"
                  name="operator_acc_id"
                  options={accOptions}
                />
              </Grid>
              <Grid item xs={12}>
                <SelectInput
                  label="Operator Pembangkit"
                  name="operator_pembangkit_id"
                  options={operatorOptions}
                />
              </Grid>
              {jenis !== "change-over" ? (
                <Grid item xs={12}>
                  <SelectInput
                    label="Energi Primer"
                    name="energi_primer"
                    options={energiPrimerOptions}
                  />
                </Grid>
              ) : null}
              {/* {jenis === "change-over" ? (
                <Grid item xs={12}>
                  <SelectInput
                    label="Status"
                    name="status"
                    options={statusOptions}
                  />
                </Grid>
              ) : null} */}

              {jenis === "naik-turun" && (
                <Grid item xs={12}>
                  <InputField type="number" name="tegangan" label="Tegangan" />
                </Grid>
              )}

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
