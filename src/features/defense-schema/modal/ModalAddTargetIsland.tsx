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
} from "@mui/material";
import Plus from "mdi-material-ui/Plus";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSnapshot } from "valtio";
import { InputField } from "src/components/input-field";
import { SelectInput } from "src/components/select-input";
import { DatePicker } from "src/components/date-picker";
import { StyledForm } from "src/components/form";
import { modal, reloadPage, closeModal } from "src/state/modal";

const defaultValue = {
  target: "",
};

type DefaultValueProps = {
  target: string;
}[];

const ModalAdd = () => {
  const modalSnapshot = useSnapshot(modal);
  const [fields, setFields] = useState<DefaultValueProps>([defaultValue]);

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
      open={modalSnapshot.isOpen}
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
                Target Island
              </Typography>
            </Box>
            <Grid container spacing={1} mt={1}>
              <Grid item xs={12} sm={12}>
                <InputField name="island" label="Island" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <SelectInput label="Tahap" name="tahap" options={[]} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <InputField name="frekuensi" label="Frekuensi" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <SelectInput label="APP" name="app" options={[]} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <SelectInput
                  label="Gardu Induk"
                  name="gardu_induk_id"
                  options={[]}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                  Setting
                </Typography>
              </Grid>
              {fields.map((value, index: number) => {
                return (
                  <Grid key={`target_${index}`} item xs={12} sm={12}>
                    <SelectInput
                      label="Target Trip"
                      name={`target_[${index}]`}
                      options={[]}
                    />
                  </Grid>
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
                  <Plus sx={{ mr: 1 }} />
                  Tambah Target Trip Lain
                </Button>
              </Grid>
              <Grid item xs={12} sm={12}>
                <DatePicker label="Tanggal Aktif" name="aktif" />
              </Grid>
              <Grid item xs={12} sm={12}>
                <SelectInput label="Status" name="status" options={[]} />
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

export default ModalAdd;
