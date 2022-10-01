import { useForm, FormProvider } from "react-hook-form";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  Typography,
  Box,
} from "@mui/material";

import { StyledForm } from "../Penghantar.styled";
import { InputField } from "src/components/input-field";
import { SelectInput } from "src/components/select-input";

type ModalAddProps = {
  open: boolean;
  handleClose: () => void;
};

const ModalAddPenghantar = ({ open, handleClose }: ModalAddProps) => {
  const formMethods = useForm({
    // resolver: yupResolver(validationSchema),
    // defaultValues: initialValues,
    mode: "onSubmit",
  });

  return (
    <Dialog
      open={open}
      fullWidth
      onClose={handleClose}
      maxWidth="sm"
      scroll="body"
    >
      <FormProvider {...formMethods}>
        <StyledForm noValidate>
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
                Tambah Penghantar
              </Typography>
            </Box>
            <Grid container spacing={1} mt={1}>
              <Grid item xs={12} sm={6}>
                <SelectInput
                  label="Subsistem"
                  name="subsistem"
                  options={[{ value: "1", label: "Subsistem 1" }]}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <SelectInput
                  label="Gardu Induk Asal"
                  name="gardu-asal"
                  options={[{ value: "1", label: "Gardu Induk Asal 1" }]}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <SelectInput
                  label="Gardu Induk Tujuan"
                  name="gardu-tujuan"
                  options={[{ value: "1", label: "Gardu Induk Tujuan 1" }]}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <SelectInput
                  label="Line"
                  name="line"
                  options={[{ value: "1", label: "Line 1" }]}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <InputField name="b1" label="B1" />
              </Grid>
              <Grid item xs={12} sm={4}>
                <InputField name="b2" label="B2" />
              </Grid>
              <Grid item xs={12} sm={4}>
                <InputField name="b3" label="B3" />
              </Grid>
              <Grid item xs={12} sm={12}>
                <InputField name="id_point" label="ID Point" />
              </Grid>
              <Grid item xs={12} sm={12}>
                <SelectInput
                  label="Tegangan (KV)"
                  name="tegangan"
                  options={[{ value: "1", label: "100 KV" }]}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <InputField name="arus_nominal" label="Arus Nominal (A)" />
              </Grid>
              <Grid item xs={12} sm={4}>
                <InputField name="arus_mampu" label="Arus Mampu (A)" />
              </Grid>
              <Grid item xs={12} sm={4}>
                <SelectInput
                  label="Jenis Penghantar"
                  name="penghantar"
                  options={[{ value: "1", label: "Penghantar 1" }]}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <InputField name="nama_penghantar" label="Nama Penghantar" />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions className="dialog-actions-dense">
            <Button variant="outlined" onClick={handleClose}>
              Batal
            </Button>
            <Button variant="contained" onClick={() => null}>
              Tambah
            </Button>
          </DialogActions>
        </StyledForm>
      </FormProvider>
    </Dialog>
  );
};

export default ModalAddPenghantar;
