import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  Typography,
  Box,
  IconButton,
} from "@mui/material";
import { useSnapshot } from "valtio";
import { InputField } from "src/components/input-field";
import { SelectInput } from "src/components/select-input";
import { StyledForm } from "src/components/form";
import { modal, closeModal } from "src/state/modal";

import AddCicleIcon from "src/assets/icons/add-cicle-icon.svg";

const defaultValue = {
  jurusan: "",
};

type DefaultValueProps = {
  jurusan: string;
}[];

const ModalAddManuver = () => {
  const modalSnapshot = useSnapshot(modal);
  const [fields, setFields] = useState<DefaultValueProps>([defaultValue]);

  const isOpen =
    modalSnapshot.isOpen && modalSnapshot.target === "modal-add-manuver";

  const formMethods = useForm({
    // resolver: yupResolver(validationSchema),
    // defaultValues: initialValues,
    mode: "onSubmit",
  });

  const onSubmit = (event?: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();

    formMethods.handleSubmit(async (values) => {
      //  TODO: handle submit
    })();
  };

  const onClickCloseModal = () => {
    closeModal();
    setFields([defaultValue]);
    // formMethods.reset({ ...initialValues });
  };

  return (
    <Dialog
      open={isOpen}
      fullWidth
      onClose={onClickCloseModal}
      maxWidth="sm"
      scroll="body"
    >
      <FormProvider {...formMethods}>
        <StyledForm noValidate onSubmit={onSubmit}>
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
                Tambah Manuver
              </Typography>
            </Box>
            <Grid container spacing={1} mt={1}>
              {fields.map((value, index: number) => {
                return (
                  <>
                    {fields.length > 1 && (
                      <Grid item xs={12}>
                        <Typography
                          variant="subtitle1"
                          sx={{ fontWeight: 500, mb: "10px" }}
                        >
                          {`Jurusan ${index + 1}`}
                        </Typography>
                      </Grid>
                    )}
                    <Grid item xs={12} sm={12}>
                      <SelectInput label="Lokasi" name="lokasi" options={[]} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <InputField name="jurusan" label="Jurusan" />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <InputField name="buka" label="Buka" />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <InputField name="tutup" label="Tutup" />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <InputField name="keterangan" label="Keterangan" />
                    </Grid>
                  </>
                );
              })}
              <Grid item xs={12} sm={12} mb="12px">
                <Button
                  style={{ height: "30px" }}
                  sx={{ mb: 2 }}
                  onClick={() =>
                    setFields((prevState) => [...prevState, defaultValue])
                  }
                  variant="outlined"
                >
                  <IconButton>
                    <AddCicleIcon />
                  </IconButton>
                  Tambah Jurusan lain
                </Button>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions className="dialog-actions-dense">
            <Button variant="outlined" onClick={onClickCloseModal}>
              Batal
            </Button>
            <Button variant="contained" type="submit">
              Tambah
            </Button>
          </DialogActions>
        </StyledForm>
      </FormProvider>
    </Dialog>
  );
};

export default ModalAddManuver;
