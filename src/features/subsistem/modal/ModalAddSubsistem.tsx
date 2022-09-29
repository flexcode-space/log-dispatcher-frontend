import { useForm, FormProvider } from "react-hook-form";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  Grid,
} from "@mui/material";

import { useState } from "react";
import { StyledForm } from "../Subsistem.styled";
import { InputField } from "src/components/input-field";

type ModalAddSubsistemProps = {
  open: boolean;
  handleClose: () => void;
};

const ModalAddSubsistem = ({ open, handleClose }: ModalAddSubsistemProps) => {
  const [fields, setFields] = useState<Array<number>>([0]);

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
      maxWidth="xs"
      scroll="body"
    >
      <FormProvider {...formMethods}>
        <StyledForm noValidate>
          <DialogTitle id="max-width-dialog-title">
            Tambah Subsistem
          </DialogTitle>
          <DialogContent>
            <Grid container spacing={1} mt={1}>
              {fields.map((index) => {
                return (
                  <Grid item xs={12} sm={12}>
                    <InputField
                      key={`subsistem-${index}`}
                      name="name"
                      label={`Nama Subsistem ${index + 1}`}
                    />
                  </Grid>
                );
              })}
              <Grid item xs={12} sm={12}>
                <Button
                  style={{ width: "250px" }}
                  sx={{ mb: 2 }}
                  onClick={() =>
                    setFields((prevState) => [...prevState, fields.length])
                  }
                  variant="outlined"
                >
                  Tambah Subsistem
                </Button>
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

export default ModalAddSubsistem;
