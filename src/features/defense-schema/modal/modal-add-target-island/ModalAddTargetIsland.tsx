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
import Plus from "mdi-material-ui/Plus";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSnapshot } from "valtio";
import { InputField } from "src/components/input-field";
import { SelectInput } from "src/components/select-input";
import { DatePicker } from "src/components/date-picker";
import { StyledForm } from "src/components/form";
import { modal, closeModal } from "src/state/modal";
import { useModalTargetIsland } from "./useModalTargetIsland";
import { initialValues, validationSchema } from "./ModalAddTarget.constant";
import dayjs from "dayjs";
import { PayloadTargetIsland } from "./types";
import { defenseApi } from "src/api/defense";
import { setReloadPage } from "src/state/reloadPage";
import { targetIsland } from "../../target-island/state/targetIsland";

const defaultValue = {
  target: "",
};

type DefaultValueProps = {
  target: string;
}[];

const ModalAdd = () => {
  const modalSnapshot = useSnapshot(modal);
  const { data } = useSnapshot(targetIsland);

  const [fields, setFields] = useState<DefaultValueProps>([defaultValue]);

  const { garduIndukOptions, tahapOptions, statusOptions } =
    useModalTargetIsland();

  const { updateDefense, createDefense } = defenseApi();

  const isOpen =
    modalSnapshot.isOpen && modalSnapshot.target === "modal-add-target-island";

  const formMethods = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: initialValues,
    mode: "onSubmit",
  });

  const onSubmit = (event?: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();

    formMethods.handleSubmit(async (values) => {
      const { tanggal, target_trip, ...rest } = values;

      const date = dayjs(values.tanggal).format("YYYY-MM-DD");

      const payload: PayloadTargetIsland[] = [];

      target_trip.forEach((target) => {
        payload.push({
          ...rest,
          target_trip: target.value,
          tanggal: date,
          status: values.status === "true",
        });
      });

      if (modalSnapshot.id) {
        updateDefense("target-island", { ...payload[0], id: modalSnapshot.id });
      } else {
        createDefense("target-island", payload);
      }
      onCloseModal();
      setReloadPage("target-island");
    })();
  };

  const onCloseModal = () => {
    closeModal();
    setFields([defaultValue]);
    formMethods.reset({ ...initialValues });
  };

  useEffect(() => {
    if (modalSnapshot.id) {
      const { tanggal, gardu_induk, tahap, ...rest } = data;

      formMethods.reset({
        ...rest,
        tanggal: dayjs(tanggal),
        gardu_induk_id: gardu_induk.id,
        defense_tahap_id: tahap.id,
        target_trip: [{ value: rest.target_trip }],
        status: rest.status ? "true" : "false",
      });
    }
  }, [modalSnapshot.isOpen]);

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
                <SelectInput
                  label="Gardu Induk"
                  name="gardu_induk_id"
                  options={garduIndukOptions}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <SelectInput
                  label="Tahap"
                  name="defense_tahap_id"
                  options={tahapOptions}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <InputField name="frekuensi" label="Frekuensi" />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                  Setting
                </Typography>
              </Grid>
              {fields.map((value, index: number) => {
                return (
                  <Grid key={`target_trip${index}`} item xs={12} sm={12}>
                    <InputField
                      label="Target Trip"
                      name={`target_trip[${index}].value`}
                    />
                  </Grid>
                );
              })}
              {!modalSnapshot.id && (
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
              )}
              <Grid item xs={12} sm={12}>
                <DatePicker label="Tanggal Aktif" name="tanggal" />
              </Grid>
              <Grid item xs={12} sm={12}>
                <SelectInput
                  label="Status"
                  name="status"
                  options={statusOptions}
                />
              </Grid>
            </Grid>
            <Grid item xs={12} sm={12}>
              <InputField name="keterangan" label="Keterangan" />
            </Grid>
          </DialogContent>
          <DialogActions className="dialog-actions-dense">
            <Button variant="outlined" onClick={onCloseModal}>
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
