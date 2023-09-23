import { useEffect, useState } from "react";
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
import { StyledForm } from "src/components/form";
import { closeModal, modal, reloadPage } from "src/state/modal";
import { InputField } from "src/components/input-field";
import { SelectInput } from "src/components/select-input";
import {
  symbolOptions,
  validationSchema,
  initialValues,
} from "./ModalKoefisien.constant";
import { busbarApi } from "src/api/busbar";

const ModalKoefisien = () => {
  const [data, setData] = useState<{}>({});

  const { updateBusbar, getBusbarDetail } = busbarApi();

  const modalSnapshot = useSnapshot(modal);

  const isOpen =
    modalSnapshot.isOpen && modalSnapshot.target === "modal-koefisien";

  const formMethods = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: initialValues,
    mode: "onSubmit",
  });

  const onSubmit = (event?: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();

    formMethods.handleSubmit(async (values) => {
      const payload = {
        ...data,
        ...values,
      };

      await updateBusbar(payload);
      onClickCloseModal();
      reloadPage();
    })();
  };

  const onClickCloseModal = () => {
    closeModal();
    formMethods.reset({ ...initialValues });
  };

  useEffect(() => {
    if (modalSnapshot.id) {
      getBusbarDetail(modalSnapshot.id).then((result: any) => {
        const { gardu_induk, scada, sub_sistem, tegangan, ...rest } = result;
        formMethods.reset({
          kof_num: rest?.kof_num,
          kof_sym: rest?.kof_sym,
        });

        setData({
          ...rest,
          scada,
          gardu_induk_id: gardu_induk.id,
          sub_sistem_id: sub_sistem.id,
          tegangan_id: tegangan.id,
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
                Tambah Koefisien
              </Typography>
            </Box>
            <Grid container spacing={1} mt={1}>
              <Grid item xs={12} sm={6}>
                <SelectInput
                  label="Koefisien"
                  name="kof_sym"
                  options={symbolOptions}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <InputField type="number" name="kof_num" label="Nilai" />
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

export default ModalKoefisien;
