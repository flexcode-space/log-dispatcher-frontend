import { useState } from "react";
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
import AddIcon from "src/assets/icons/add-icon.svg";
import DeleteIcon from "src/assets/icons/delete-icon.svg";
import { useCatatanPenyaluran } from "../useCatatanPenyaluran";
import { validationSchema, initialValues } from "../CatatanPenyaluran.constant";

const AddData = () => {
  const [showWaktuAkhir, setShowWaktuAkhir] = useState<boolean>(false);

  const formMethods = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: initialValues,
    mode: "onChange",
  });

  const { garduIndukOptions } = useCatatanPenyaluran();

  const onSubmit = (event?: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();

    formMethods.handleSubmit(async (values) => {
      console.log(values);
    })();
  };

  return (
    <Card>
      <CardContent>
        <Box sx={{ mb: 8 }}>
          <Typography variant="h6" sx={{ mb: 3, lineHeight: "2rem" }}>
            Tambah Data
          </Typography>
        </Box>
        <FormProvider {...formMethods}>
          <StyledForm noValidate onSubmit={onSubmit} sx={{ width: "100%" }}>
            <Grid container spacing={2} mt={1} alignItems="center">
              <Grid item xs={2.4}>
                <SelectInput
                  label="Gardu Induk"
                  name="gardu_induk_id"
                  options={garduIndukOptions}
                />
              </Grid>
              <Grid item xs={2.4}>
                <InputField name="jurusan" label="Jurusan" />
              </Grid>
              <Grid item xs={2.4}>
                <DatePicker label="Tanggal Mulai" name="tanggal_mulai" />
              </Grid>
              <Grid item xs={2.4}>
                <TimePicker label="Waktu Mulai" name="waktu_mulai" />
              </Grid>
              <Grid item xs={2.4}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    cursor: "pointer",
                    marginBottom: "1rem",
                  }}
                  onClick={() => setShowWaktuAkhir(!showWaktuAkhir)}
                >
                  {showWaktuAkhir ? <DeleteIcon /> : <AddIcon />}
                  <Typography
                    variant="button"
                    sx={{ ml: "5px", lineHeight: "2rem", color: "#4AA1B9" }}
                  >
                    {showWaktuAkhir
                      ? "Hapus Waktu Akhir"
                      : "Tambah waktu akhir"}
                  </Typography>
                </div>
              </Grid>
              <Grid item xs={4}>
                <InputField name="keterangan" label="Keterangan" />
              </Grid>
              {showWaktuAkhir && (
                <>
                  <Grid item xs={2}>
                    <DatePicker label="Tanggal Akhir" name="tanggal_akhir" />
                  </Grid>
                  <Grid item xs={2}>
                    <TimePicker label="Waktu Akhir" name="waktu_akhir" />
                  </Grid>
                </>
              )}
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

export default AddData;
