import { useEffect } from "react";
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
import { useSnapshot } from "valtio";
import { yupResolver } from "@hookform/resolvers/yup";
import { InputField } from "src/components/input-field";
import { SelectInput } from "src/components/select-input";
import { closeModal, modal, reloadPage } from "src/state/modal";
import { trafoApi } from "src/api/trafo";
import {
  initialValues,
  validationSchema,
  trafoListOptions,
} from "./ModalAddBusbar.constant";
import { StyledForm } from "../Trafo.styled";
import { useModalTrafo } from "./useModalTrafo";

const ModalAddTrafo = () => {
  const modalSnapshot = useSnapshot(modal);

  const isOpen = modalSnapshot.isOpen && modalSnapshot.target === "modal-trafo";

  const {
    subsistemOptions,
    garduIndukOptions,
    rasioTeganganOptions,
    mvaOptions,
  } = useModalTrafo();

  const { createTrafo, getTrafoDetail, updateTrafo } = trafoApi();

  const formMethods = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: initialValues,
    mode: "onSubmit",
  });

  const onSubmit = (event?: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();

    formMethods.handleSubmit(async (values) => {
      const { b1, b2, b3, arus_mampu, arus_nominal, ...rest } = values;

      const payload = {
        ...rest,
        arus_mampu: Number(values.arus_mampu),
        arus_nominal: Number(values.arus_nominal),
        scada: { b1, b2, b3 },
      };

      if (modalSnapshot.id) {
        await updateTrafo(payload);
      } else {
        await createTrafo(payload);
      }

      closeModal();
      reloadPage();
    })();
  };

  const onClickCloseModal = () => {
    closeModal();
    formMethods.reset({ ...initialValues });
  };

  useEffect(() => {
    if (modalSnapshot.id) {
      getTrafoDetail(modalSnapshot.id).then((data: any) => {
        const { gardu_induk, scada, sub_sistem, rasio_tegangan, mva, ...rest } =
          data;
          
        formMethods.reset({
          ...rest,
          ...scada,
          mva_id: mva.id,
          gardu_induk_id: gardu_induk.id,
          sub_sistem_id: sub_sistem.id,
          rasio_tegangan_id: rasio_tegangan.id,
        });
      });
    }
  }, [modalSnapshot.id]);

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
                Tambah Trafo
              </Typography>
            </Box>
            <Grid container spacing={1} mt={1}>
              <Grid item xs={12} sm={4}>
                <SelectInput
                  label="Subsistem"
                  name="sub_sistem_id"
                  options={subsistemOptions}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <SelectInput
                  label="Gardu Induk"
                  name="gardu_induk_id"
                  options={garduIndukOptions}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <SelectInput
                  label="No. Trafo"
                  name="no"
                  options={trafoListOptions}
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
                <InputField name="id_amr" label="ID Point" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <SelectInput
                  label="Rasio Tegangan"
                  name="rasio_tegangan_id"
                  options={rasioTeganganOptions}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <SelectInput label="MVA" name="mva_id" options={mvaOptions} />
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

export default ModalAddTrafo;
