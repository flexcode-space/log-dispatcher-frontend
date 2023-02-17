import { useEffect } from "react";
import dayjs from "dayjs";
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
  Typography,
} from "@mui/material";
import { TrashCanOutline } from "mdi-material-ui";
import { useSnapshot } from "valtio";
// import { yupResolver } from "@hookform/resolvers/yup";
import { SelectInput } from "src/components/select-input";
import { InputField } from "src/components/input-field";
import { StyledForm } from "src/components/form";
import { closeModal, modal } from "src/state/modal";
import { DatePicker } from "src/components/date-picker";
import { useCatatanPenyaluran } from "../../useCatatanPenyaluran";
// import { useCatatanPembangkitan } from "../../useCatatanPembangkitan";

const ModalFilter = () => {
  const modalSnapshot = useSnapshot(modal);

  const { garduIndukOptions } = useCatatanPenyaluran();

  const isOpen =
    modalSnapshot.isOpen && modalSnapshot.target === "modal-filter";

  const formMethods = useForm({
    // resolver: yupResolver(validationSchema),
    // defaultValues: initialValues,
    mode: "onSubmit",
  });

  const onSubmit = (event?: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();

    formMethods.handleSubmit(async (values) => {
      // TODO: handle submit
    })();
  };

  const onClickCloseModal = () => {
    closeModal();
    // formMethods.reset({ ...initialValues });
  };

  const onClickDelete = () => {
    // TODO: handle delete
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
          <DialogTitle id="max-width-dialog-title">Filter</DialogTitle>
          <DialogContent>
            <Grid container spacing={1} mt={1}>
              <Grid item xs={12} sx={{ mb: "10px" }}>
                <Typography fontWeight={500}>Pembangkit Derating</Typography>
              </Grid>
              <Grid item xs={6}>
                <SelectInput
                  label="Gardu Induk"
                  name="gardu_induk_id"
                  options={garduIndukOptions}
                />
              </Grid>
              <Grid item xs={6}>
                <InputField label="Jurusan" name="jurusan" />
              </Grid>
              <Grid item xs={6}>
                <DatePicker label="Tanggal Mulai" name="tanggal_mulai" />
              </Grid>
              <Grid item xs={6}>
                <DatePicker label="Tanggal Akhir" name="tanggal_akhir" />
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
                <Button variant="text" onClick={onClickDelete}>
                  <IconButton>
                    <TrashCanOutline />
                  </IconButton>
                  Hapus Filter
                </Button>
              </Box>
              <Box display="flex" gap="10px">
                <Button variant="outlined" onClick={onClickCloseModal}>
                  Batal
                </Button>
                <Button variant="contained" type="submit">
                  Terapkan
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
