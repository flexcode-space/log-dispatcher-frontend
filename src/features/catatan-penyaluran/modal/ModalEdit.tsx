import { useForm, FormProvider } from "react-hook-form";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
} from "@mui/material";
// import { yupResolver } from "@hookform/resolvers/yup";
import { useSnapshot } from "valtio";
import { SelectInput } from "src/components/select-input";
import { InputField, TextArea } from "src/components/input-field";
import { StyledForm } from "src/components/form";
import { modal, reloadPage } from "src/state/modal";
import { DatePicker, TimePicker } from "src/components/date-picker";

type ModalFilter = {
  handleClose: () => void;
};

const ModalFilter = ({ handleClose }: ModalFilter) => {
  const modalSnapshot = useSnapshot(modal);

  const isOpen =
    modalSnapshot.isOpen && modalSnapshot.target === "modal-catatan-penyaluran";

  const formMethods = useForm({
    // resolver: yupResolver(validationSchema),
    // defaultValues: initialValues,
    mode: "onSubmit",
  });

  const onSubmit = (event?: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();

    formMethods.handleSubmit(async (values) => {
      console.log(values);

      handleClose();
    })();
  };

  const onClickCloseModal = () => {
    handleClose();
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
                  label="Gardu Induk"
                  name="gardu_induk_id"
                  options={[]}
                />
              </Grid>
              <Grid item xs={12}>
                <InputField label="Jurusan" name="jurusan" />
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
            <Button variant="outlined" onClick={onClickCloseModal}>
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

export default ModalFilter;
