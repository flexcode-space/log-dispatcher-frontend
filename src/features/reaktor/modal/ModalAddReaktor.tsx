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
import { StyledForm } from "../Reaktor.styled";
import { InputField } from "src/components/input-field";
import { SelectInput } from "src/components/select-input";
import { modal, reloadPage } from "src/state/modal";
import { reaktorApi } from "src/api/reaktor";
import {
  initialValues,
  validationSchema,
  jenisReaktorOptions,
} from "./ModalAddReaktor.constant";
import { useModalReaktor } from "./useModalReaktor";

type ModalAddProps = {
  handleClose: () => void;
};

const ModalAddReaktor = ({ handleClose }: ModalAddProps) => {
  const modalSnapshot = useSnapshot(modal);

  const { createReaktor, updateReaktor, getReaktorDetail } = reaktorApi();
  const { subsistemOptions, garduIndukOptions, teganganOptions } =
    useModalReaktor();

  const formMethods = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: initialValues,
    mode: "onSubmit",
  });

  const onSubmit = (event?: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();

    formMethods.handleSubmit(async (values) => {
      const { b1, b2, b3, mvar, setting, ...rest } = values;

      const payload = {
        ...rest,
        mvar: Number(mvar),
        setting: Number(setting),
        scada: { b1, b2, b3 },
      };

      if (modalSnapshot.id) {
        await updateReaktor(payload);
      } else {
        await createReaktor(payload);
      }

      handleClose();
      reloadPage();
    })();
  };

  const onClickCloseModal = () => {
    handleClose();
    formMethods.reset({ ...initialValues });
  };

  useEffect(() => {
    if (modalSnapshot.id) {
      getReaktorDetail(modalSnapshot.id).then((data: any) => {
        const { gardu_induk, scada, sub_sistem, tegangan, ...rest } = data;
        formMethods.reset({
          ...rest,
          ...scada,
          gardu_induk_id: gardu_induk.id,
          sub_sistem_id: sub_sistem.id,
          tegangan_id: tegangan.id,
        });
      });
    }
  }, [modalSnapshot.id]);

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
                Tambah Reaktor & Kapasitor
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
                  label="Jenis"
                  name="jenis"
                  options={jenisReaktorOptions}
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
              <Grid item xs={12} sm={4}>
                <SelectInput
                  label="Tegangan (KV)"
                  name="tegangan_id"
                  options={teganganOptions}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <InputField name="setting_ovr" label="Setting OVR" />
              </Grid>
              <Grid item xs={12} sm={4}>
                <InputField name="mvar" label="MVAR" />
              </Grid>
              <Grid item xs={12} sm={12}>
                <InputField name="nama" label="Nama Reaktor" />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions className="dialog-actions-dense">
            <Button variant="outlined" onClick={onClickCloseModal}>
              Batal
            </Button>
            <Button variant="contained" type="submit">
              Tambah Busbar
            </Button>
          </DialogActions>
        </StyledForm>
      </FormProvider>
    </Dialog>
  );
};

export default ModalAddReaktor;
