import { Box, Typography, Grid } from "@mui/material";
import { DatePicker, TimePicker } from "src/components/date-picker";
import { SelectInput } from "src/components/select-input";
import { TextArea } from "src/components/input-field";

export const FormEmergency = () => {
  return (
    <>
      <Box sx={{ mb: 8 }}>
        <Typography variant="h5" sx={{ mb: 3, lineHeight: "2rem" }}>
          Tambah Pekerjaan Emergency
        </Typography>
      </Box>
      <Grid container spacing={1} mt={1}>
        <Grid item xs={12} sm={6}>
          <SelectInput label="Gardu Induk" name="gardu_induk_id" options={[]} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <SelectInput label="Bay" name="bay" options={[]} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <SelectInput
            label="Unit Pelaksana"
            name="unit_pelaksana"
            options={[]}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <SelectInput label="Progress" name="progress" options={[]} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <DatePicker label="Tanggal Mulai" name="tanggal_mulai" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TimePicker label="Waktu Mulai" name="waktu_mulai" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <DatePicker label="Tanggal Akhir" name="tanggal_akhir" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TimePicker label="Waktu Akhir" name="waktu_akhir" />
        </Grid>
        <Grid item xs={12}>
          <TextArea label="Uraian Pekerjaan" name="uraian_pekerjaan" />
        </Grid>
      </Grid>
    </>
  );
};
