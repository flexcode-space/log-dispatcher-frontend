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
import { StyledForm } from "../Penghantar.styled";
import { modal, reloadPage } from "src/state/modal";
import { InputField } from "src/components/input-field";
import { SelectInput } from "src/components/select-input";
import { penghantarApi } from "src/api/penghantar";
import {
  validationSchema,
  initialValues,
  jenisPenghantarOptions,
} from "./ModalAddPenghantar.constant";
import { useModalPenghantar } from "./useModalPenghantar";

type ModalAddProps = {
  handleClose: () => void;
};

const ModalAddPenghantar = ({ handleClose }: ModalAddProps) => {
  const { subsistemOptions, garduIndukOptions, teganganOptions } =
    useModalPenghantar();

  const { createPenghantar, updatePenghantar, getPenghantarDetail } =
    penghantarApi();

  const modalSnapshot = useSnapshot(modal);

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
        await updatePenghantar(payload);
      } else {
        await createPenghantar(payload);
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
      getPenghantarDetail(modalSnapshot.id).then((data: any) => {
        const {
          gardu_induk,
          gardu_induk_tujuan,
          scada,
          sub_sistem,
          tegangan,
          ...rest
        } = data;
        formMethods.reset({
          ...rest,
          ...scada,
          gardu_induk_id: gardu_induk.id,
          gardu_induk_tujuan_id: gardu_induk_tujuan.id,
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
                Tambah Penghantar
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
              <Grid item xs={12} sm={6}>
                <SelectInput
                  label="Gardu Induk Tujuan"
                  name="gardu_induk_tujuan_id"
                  options={garduIndukOptions}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <SelectInput
                  label="Line"
                  name="line"
                  options={[{ value: "1", label: "Line 1" }]}
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
              <Grid item xs={12} sm={12}>
                <SelectInput
                  label="Tegangan (KV)"
                  name="tegangan_id"
                  options={teganganOptions}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <InputField name="arus_nominal" label="Arus Nominal (A)" />
              </Grid>
              <Grid item xs={12} sm={4}>
                <InputField name="arus_mampu" label="Arus Mampu (A)" />
              </Grid>
              <Grid item xs={12} sm={4}>
                <SelectInput
                  label="Jenis Penghantar"
                  name="jenis"
                  options={jenisPenghantarOptions}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <InputField name="nama" label="Nama Penghantar" />
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

export default ModalAddPenghantar;
