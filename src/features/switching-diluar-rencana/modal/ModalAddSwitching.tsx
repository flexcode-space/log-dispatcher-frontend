import { useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
} from "@mui/material";
import Plus from "mdi-material-ui/Plus";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSnapshot } from "valtio";
import { SelectInput } from "src/components/select-input";
import { TextArea } from "src/components/input-field";
import { StyledForm } from "src/components/form";
import { closeModal, modal, reloadPage } from "src/state/modal";
import { TimePicker } from "src/components/date-picker";
import { useModalAdd } from "./useModalAdd";
import { validationSchema, initialValues } from "./ModalAddSwitching.contant";
import { energizePeralatan, removeData } from "src/state/energizePeralatan";

const ModalAdd = () => {
  const modalSnapshot = useSnapshot(modal);
  const { data } = useSnapshot(energizePeralatan);

  const formMethods = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: initialValues,
    mode: "onSubmit",
  });

  const { garduIndukOptions, penghantarOptions } = useModalAdd();

  const titleModal = !!modalSnapshot.id
    ? "Ubah Switching Lain"
    : "Tambah Switching Lain";
  const isOpen =
    modalSnapshot.isOpen &&
    modalSnapshot.target === "modal-switching-luar-rencana";

  const onSubmit = (event?: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();

    formMethods.handleSubmit(async (values) => {
      // TODO: HANDLE SUBMIT
    })();
  };

  const onCloseModal = () => {
    closeModal();
    removeData();
    formMethods.reset({ ...initialValues });
  };

  // useEffect(() => {
  //   if (modalSnapshot.id) {
  //     formMethods.reset({ ...data, gardu_induk_id: data?.gardu_induk?.id });
  //   }
  // }, [modalSnapshot.id]);

  return (
    <Dialog
      open={isOpen}
      fullWidth
      onClose={onCloseModal}
      maxWidth="sm"
      scroll="body"
    >
      <FormProvider {...formMethods}>
        <StyledForm noValidate onSubmit={onSubmit}>
          <DialogTitle id="max-width-dialog-title">{titleModal}</DialogTitle>
          <DialogContent>
            <Grid container spacing={1} mt={1}>
              <Grid item xs={12}>
                <SelectInput
                  label="Lokasi"
                  name="gardu_induk_id"
                  options={garduIndukOptions}
                />
              </Grid>
              <Grid item xs={6}>
                <SelectInput label="Jurusan" name="peralatan_id" options={penghantarOptions} />
              </Grid>
              <Grid item xs={3}>
                <TimePicker label="Jam Buka" name="jam_tutup" />
              </Grid>
              <Grid item xs={3}>
                <TimePicker label="Jam Tutup" name="jam_tutup" />
              </Grid>
              <Grid item xs={12}>
                <Button variant="outlined" sx={{ height: "30px", mb: "10px" }}>
                  <Plus />
                  Tambah Jurusan Lain
                </Button>
              </Grid>
              <Grid item xs={12}>
                <TextArea label="Keterangan" name="keterangan" />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions className="dialog-actions-dense">
            <Button variant="outlined" onClick={onCloseModal}>
              Batal
            </Button>
            <Button variant="contained" type="submit">
              Simpan
            </Button>
          </DialogActions>
        </StyledForm>
      </FormProvider>
    </Dialog>
  );
};

export default ModalAdd;
