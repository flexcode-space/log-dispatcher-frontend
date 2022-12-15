import { useForm, FormProvider } from "react-hook-form";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Stack,
} from "@mui/material";
import { TrashCanOutline } from "mdi-material-ui";
// import { yupResolver } from "@hookform/resolvers/yup";
import { useSnapshot } from "valtio";
import { SelectInput } from "src/components/select-input";
import { InputField, TextArea } from "src/components/input-field";
import { StyledForm } from "src/components/form";
import { closeModal, modal } from "src/state/modal";
import { DatePicker, TimePicker } from "src/components/date-picker";
import { useCatatanPembangkitan } from "../useCatatanPembangkitan";

const ModalFilter = () => {
  const modalSnapshot = useSnapshot(modal);
  const { pembangkitOptions, statusOptions } = useCatatanPembangkitan();

  const isOpen =
    modalSnapshot.isOpen && modalSnapshot.target === "modal-catatan-pembangkit";

  const formMethods = useForm({
    // resolver: yupResolver(validationSchema),
    // defaultValues: initialValues,
    mode: "onSubmit",
  });

  const onSubmit = (event?: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();

    formMethods.handleSubmit(async (values) => {
      console.log(values);

      closeModal();
    })();
  };

  const onClickCloseModal = () => {
    closeModal();
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
          <DialogTitle id="max-width-dialog-title">Ubah Data</DialogTitle>
          <DialogContent>
            <Grid container spacing={1} mt={1}>
              <Grid item xs={12}>
                <SelectInput
                  label="Pembangkit"
                  name="pembangkit_id"
                  options={pembangkitOptions}
                />
              </Grid>
              <Grid item xs={6}>
                <SelectInput
                  label="Status"
                  name="status"
                  options={statusOptions}
                />
              </Grid>
              <Grid item xs={6}>
                <InputField type="number" name="mampu" label="Mampu" />
              </Grid>
              <Grid item xs={6}>
                <DatePicker label="Tanggal Mulai" name="tanggal" />
              </Grid>
              <Grid item xs={6}>
                <TimePicker label="Watu Mulai" name="tanggal" />
              </Grid>
              <Grid item xs={6}>
                <DatePicker label="Tanggal Akhir" name="tanggal" />
              </Grid>
              <Grid item xs={6}>
                <TimePicker label="Watu Akhir" name="tanggal" />
              </Grid>
              <Grid item xs={12}>
                <TextArea label="Keterangan" name="keterangan" />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions className="dialog-actions-dense">
            <Stack
              width="100%"
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Box>
                <Button variant="text" onClick={onClickCloseModal}>
                  <IconButton>
                    <TrashCanOutline />
                  </IconButton>
                  Hapus data
                </Button>
              </Box>
              <Box display="flex" gap="10px">
                <Button variant="outlined" onClick={onClickCloseModal}>
                  Batal
                </Button>
                <Button variant="contained" type="submit">
                  Simpan
                </Button>
              </Box>
            </Stack>
          </DialogActions>
        </StyledForm>
      </FormProvider>
    </Dialog>
  );
};

export default ModalFilter;
