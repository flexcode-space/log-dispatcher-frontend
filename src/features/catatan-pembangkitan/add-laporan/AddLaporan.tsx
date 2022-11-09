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
import AddIcon from "src/assets/icons/add-icon.svg";

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
            Tambah Data
          </Typography>
        </Box>
        <FormProvider {...formMethods}>
          <StyledForm noValidate onSubmit={() => null} sx={{ width: "100%" }}>
            <Grid container spacing={2} mt={1} alignItems="center">
              <Grid item xs={2}>
                <SelectInput
                  label="Pembangkit"
                  name="pembangkit"
                  options={[]}
                />
              </Grid>
              <Grid item xs={2}>
                <SelectInput label="Status" name="status" options={[]} />
              </Grid>
              <Grid item xs={2}>
                <InputField name="mampu" label="Mampu" />
              </Grid>
              <Grid item xs={2}>
                <DatePicker label="Tanggal Mulai" name="tanggal" />
              </Grid>
              <Grid item xs={2}>
                <TimePicker label="Waktu Mulai" name="waktu_mulai" />
              </Grid>
              <Grid item xs={2}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    cursor: "pointer",
                    marginBottom: "1rem",
                  }}
                >
                  <AddIcon />
                  <Typography
                    variant="button"
                    sx={{ ml: "5px", lineHeight: "2rem", color: "#4AA1B9" }}
                  >
                    Tambah waktu akhir
                  </Typography>
                </div>
              </Grid>
              <Grid item xs={4}>
                <InputField
                  name="operator_pembangkit"
                  label="Operator Pembangkit"
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
