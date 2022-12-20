import { Box, Typography, Grid } from "@mui/material";
import { DatePicker } from "src/components/date-picker";
import { SelectInput } from "src/components/select-input";
import { useModalAdd } from "./useModalAdd";

type Props = {
  jenisPekerjaanOptions?: {
    value: string;
    label: string;
  }[];
};

export const Index = ({ jenisPekerjaanOptions }: Props) => {
  return (
    <>
      <Box sx={{ mb: 8 }}>
        <Typography variant="h5" sx={{ mb: 3, lineHeight: "2rem" }}>
          Tambah Laporan Pekerjaan
        </Typography>
      </Box>
      <Grid container spacing={1} mt={1}>
        <Grid item xs={12} sm={12}>
          <SelectInput
            label="Jenis Pekerjaan"
            name="jenis"
            options={jenisPekerjaanOptions}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <DatePicker label="Pilih Tanggal" name="tanggal" />
        </Grid>
      </Grid>
    </>
  );
};

export const FormTerencana = ({ jenisPekerjaanOptions }: Props) => {
  return (
    <>
      <Box sx={{ mb: 8 }}>
        <Typography variant="h5" sx={{ mb: 3, lineHeight: "2rem" }}>
          Tambah Pekerjaan Terencana
        </Typography>
      </Box>
      <Grid container spacing={1} mt={1}>
        <Grid item xs={12} sm={12}>
          <SelectInput
            label="Jenis Pekerjaan"
            name="jenis"
            options={jenisPekerjaanOptions}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <DatePicker label="Pilih Tanggal" name="tanggal" />
        </Grid>
      </Grid>
    </>
  );
};
