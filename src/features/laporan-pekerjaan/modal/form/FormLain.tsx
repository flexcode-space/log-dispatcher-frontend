import { useEffect } from "react";
import { Box, Typography, Grid } from "@mui/material";
import { TextArea, InputField } from "src/components/input-field";
import { useModalAdd } from "../useModalAdd";

export const FormLain = () => {
  const { garduIndukOptions } = useModalAdd();
  return (
    <>
      <Box sx={{ mb: 8 }}>
        <Typography variant="h5" sx={{ mb: 3, lineHeight: "2rem" }}>
          Tambah Pekerjaan Lain-Lain
        </Typography>
      </Box>
      <Grid container spacing={1} mt={1}>
        <Grid item xs={12}>
          <InputField label="Tagar" name="tagar" />
        </Grid>
        <Grid item xs={12}>
          <TextArea label="Keterangan" name="keterangan" />
        </Grid>
      </Grid>
    </>
  );
};
