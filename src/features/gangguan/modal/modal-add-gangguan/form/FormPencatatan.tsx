import {
  DialogContent,
  DialogActions,
  Box,
  Grid,
  Typography,
  Button,
} from "@mui/material";
import { DatePicker } from "src/components/date-picker";
import { InputField } from "src/components/input-field";
import { SelectInput } from "src/components/select-input";
import { UploadFile } from "src/components/upload-file";
import { useModalAddGangguan } from "../useModalAddGangguan";

type FormPencatatanProps = {
  onCloseModal: () => void;
  onClickNextPage: () => void;
  jenisPeralatan: string;
};

export const FormPencatatan = ({
  onCloseModal,
  onClickNextPage,
  jenisPeralatan,
}: FormPencatatanProps) => {
  const {
    optionJenisPeralatan,
    garduIndukOptions,
    jenisGangguanOptions,
    releOptions,
    peratanOptions,
  } = useModalAddGangguan(jenisPeralatan);

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
            Tambah Pencatatan Gangguan
          </Typography>
        </Box>
        <Grid container spacing={2} mt={1}>
          <Grid item xs={12} sm={6}>
            <SelectInput
              label="Lokasi"
              name="gardu_induk_id"
              options={garduIndukOptions}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <SelectInput
              label="Jenis Gangguan"
              name="jenis"
              options={jenisGangguanOptions}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <SelectInput
              label="Jenis Peralatan"
              name="jenis_peralatan"
              options={optionJenisPeralatan}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <SelectInput
              label="Peralatan"
              name="peralatan_id"
              options={peratanOptions}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: 500, mb: "10px" }}
            >
              Waktu
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12}>
            <DatePicker label="Tanggal" name="tanggal" />
          </Grid>
          <Grid item xs={12} sm={3}>
            <InputField name="trip" label="Trip" />
          </Grid>
          <Grid item xs={12} sm={3}>
            <InputField name="reclose" label="Reclose" />
          </Grid>
          <Grid item xs={12} sm={3}>
            <InputField name="buka" label="Buka" />
          </Grid>
          <Grid item xs={12} sm={3}>
            <InputField name="tutup" label="Tutup" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <InputField name="sms" label="SMS Kinerja" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <InputField name="pmt" label="Siap Op. PMT" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <SelectInput label="Rele" name="rele" options={releOptions} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <SelectInput
              label="Announciator"
              name="announciator"
              options={releOptions}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: 500, mb: "10px" }}
            >
              Upload File
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <UploadFile name="dfr" label="DFR" onChange={() => null} />
          </Grid>
          <Grid item xs={6}>
            <UploadFile name="pqm" label="PQM" onChange={() => null} />
          </Grid>
          <Grid item xs={6}>
            <UploadFile name="vaisala" label="VAISALA" onChange={() => null} />
          </Grid>
          <Grid item xs={6}>
            <UploadFile name="sld" label="SLD" onChange={() => null} />
          </Grid>
          <Grid item xs={6}>
            <UploadFile name="gensum" label="Gensum" onChange={() => null} />
          </Grid>
          <Grid item xs={6}>
            <UploadFile
              name="lap"
              label="Lap. Gangguan"
              onChange={() => null}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions className="dialog-actions-dense">
        <Button variant="outlined" onClick={onCloseModal}>
          Batal
        </Button>
        <Button variant="contained" onClick={onClickNextPage}>
          Selanjutnya
        </Button>
      </DialogActions>
    </>
  );
};
