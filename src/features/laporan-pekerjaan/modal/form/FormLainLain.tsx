import { Box, Typography, Grid } from "@mui/material";
import { DatePicker, TimePicker } from "src/components/date-picker";
import { SelectInput } from "src/components/select-input";
import { TextArea } from "src/components/input-field";

const FormLainLain = () => {
  return (
    <>
      <Box sx={{ mb: 8 }}>
        <Typography variant="h5" sx={{ mb: 3, lineHeight: "2rem" }}>
        Tambah Pekerjaan Lain-Lain
        </Typography>
      </Box>
      <Grid container spacing={1} mt={1}>
        <Grid item xs={12} sm={12}>
          <SelectInput label="Tagar" name="tagar" options={[]} />
        </Grid>
        <Grid item xs={12}>
          <TextArea label="Keterangan" name="keteragangan" />
        </Grid>
      </Grid>
    </>
  );
};

export default FormLainLain;
