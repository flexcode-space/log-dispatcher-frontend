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

import { StyledForm } from "../Trafo.styled";
import { InputField } from "src/components/input-field";
import { SelectInput } from "src/components/select-input";

type ModalAddProps = {
  open: boolean;
  handleClose: () => void;
};

const ModalAdd = ({ open, handleClose }: ModalAddProps) => {
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
        <StyledForm noValidate onSubmit={() => null}>
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
                Tambah Trafo
              </Typography>
            </Box>
            <Grid container spacing={1} mt={1}>
              <Grid item xs={12} sm={4}>
                <SelectInput
                  label="Subsistem"
                  name="subsistem"
                  options={[{ value: "1", label: "Subsistem 1" }]}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <SelectInput
                  label="Gardu Induk"
                  name="gardu_induk"
                  options={[{ value: "1", label: "Gardu Induk 1" }]}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <SelectInput
                  label="No. Trafo"
                  name="trafo"
                  options={[{ value: "1", label: "Trafo 1" }]}
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
              <Grid item xs={12} sm={6}>
                <SelectInput
                  label="Ration Tegangan"
                  name="ratio_tegangan"
                  options={[{ value: "1", label: "100 KV" }]}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <SelectInput
                  label="MVA"
                  name="mva"
                  options={[{ value: "1", label: "100 MVA" }]}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <InputField name="arus_nominal" label="Arus Nominal" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <InputField name="arus_mampu" label="Arus Mampu" />
              </Grid>
              <Grid item xs={12} sm={12}>
                <InputField name="nama" label="Nama Trafo" />
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

export default ModalAdd;
