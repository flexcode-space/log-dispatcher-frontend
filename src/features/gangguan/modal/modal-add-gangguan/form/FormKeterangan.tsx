import {
  DialogContent,
  DialogActions,
  Box,
  Grid,
  Typography,
  Button,
} from "@mui/material";
import { InputField } from "src/components/input-field";

type FormKeteranganProps = {
  onCloseModal: () => void;
  onPrevPage: () => void;
};

export const FormKeterangan = ({
  onCloseModal,
  onPrevPage,
}: FormKeteranganProps) => {
  return (
    <>
      <DialogContent
        sx={{
          pb: 6,
          px: { xs: 8, sm: 15 },
          pt: 6,
          position: "relative",
        }}
      >
        <Box sx={{ mb: 8 }}>
          <Typography variant="h5" sx={{ mb: 3, lineHeight: "2rem" }}>
            Keterangan Gangguan
          </Typography>
        </Box>
        <Grid container spacing={2} mt={1}>
          <Grid item xs={12}>
            <InputField name="penyebab" label="Penyebab Gangguan" />
          </Grid>
          <Grid item xs={12}>
            <InputField name="akibat" label="Akibat Gangguan" />
          </Grid>
          <Grid item xs={12}>
            <InputField name="beban" label="Beban Sistem" />
          </Grid>
          <Grid item xs={12}>
            <InputField name="cuaca" label="Cuaca" />
          </Grid>
          <Grid item xs={12}>
            <InputField name="fl" label="FL" />
          </Grid>
          <Grid item xs={12}>
            <InputField name="pmt" label="Counter PMT" />
          </Grid>
          <Grid item xs={12}>
            <InputField name="la" label="Counter LA" />
          </Grid>
          <Grid item xs={12}>
            <InputField name="arus" label="Arus Gangguan" />
          </Grid>
          <Grid item xs={12}>
            <InputField name="lain" label="Lain-lain" />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions className="dialog-actions-dense">
        <Button variant="outlined" onClick={onCloseModal}>
          Batal
        </Button>
        <Button variant="contained" onClick={onPrevPage}>
          Sebelumnya
        </Button>
        <Button type="submit" variant="contained">
          Tambah
        </Button>
      </DialogActions>
    </>
  );
};
