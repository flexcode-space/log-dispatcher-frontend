import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  Grid,
} from "@mui/material";
import Plus from "mdi-material-ui/Plus";

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
      maxWidth="sm"
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
                  style={{ height: "30px" }}
                  sx={{ mb: 2 }}
                  onClick={() =>
                    setFields((prevState) => [...prevState, fields.length])
                  }
                  variant="outlined"
                >
                  <Plus sx={{ mr: 1 }} />
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
