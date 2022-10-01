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
import { StyledForm } from "../Busbar.styled";
import { InputField } from "src/components/input-field";
import { SelectInput } from "src/components/select-input";
import { useModalBusbar } from "./useModalBusbar";
import { busbarApi } from "src/api/busbar";
import { initialValues, validationSchema } from "./ModalAddBusbar.constant";
import { modal, reloadPage } from "src/state/modal";

type ModalAddProps = {
  handleClose: () => void;
};

const ModalAdd = ({ handleClose }: ModalAddProps) => {
  const { subsistemOptions, garduIndukOptions, teganganOptions } =
    useModalBusbar();

  const modalSnapshot = useSnapshot(modal);

  // console.log("modalSnapshot", modalSnapshot.id);

  const { createBusbar, getBusbarDetail, updateBusbar } = busbarApi();

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
        await updateBusbar(payload);
      } else {
        await createBusbar(payload);
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
      getBusbarDetail(modalSnapshot.id).then((data: any) => {
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
                Tambah Busbar
              </Typography>
            </Box>
            <Grid container spacing={1} mt={1}>
              <Grid item xs={12} sm={6}>
                <SelectInput
                  label="Subsistem"
                  name="sub_sistem_id"
                  options={subsistemOptions}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <SelectInput
                  label="Gardu Induk Asal"
                  name="gardu_induk_id"
                  options={garduIndukOptions}
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
              <Grid item xs={12} sm={4}>
                <InputField name="arus_nominal" label="Arus Nominal (A)" />
              </Grid>
              <Grid item xs={12} sm={4}>
                <InputField name="arus_mampu" label="Arus Mampu (A)" />
              </Grid>
              <Grid item xs={12} sm={4}>
                <SelectInput
                  label="Tegangan (KV)"
                  name="tegangan_id"
                  options={teganganOptions}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <InputField name="nama" label="Nama Busbar" />
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

export default ModalAdd;
