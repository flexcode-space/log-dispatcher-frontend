import { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
} from "@mui/material";
import Plus from "mdi-material-ui/Plus";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSnapshot } from "valtio";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { SelectInput } from "src/components/select-input";
import { TextArea } from "src/components/input-field";
import { StyledForm } from "src/components/form";
import { closeModal, modal, reloadPage } from "src/state/modal";
import { TimePicker } from "src/components/date-picker";
import { useModalAdd } from "./useModalAdd";
import { validationSchema, initialValues } from "./ModalAddSwitching.contant";
import { switchingDiluarRencana, removeData } from "../state";
import { PayloadSwitchingLuarRencana } from "../types";
import { switchingLuarRencanaApi } from "src/api/switchingDiluarRencanaApi";

dayjs.extend(customParseFormat);

const defaultValue = {
  jurusan: "",
};

type DefaultValueProps = {
  jurusan: string;
}[];

const ModalAdd = () => {
  const [fields, setFields] = useState<DefaultValueProps>([defaultValue]);
  const modalSnapshot = useSnapshot(modal);
  const { data } = useSnapshot(switchingDiluarRencana);

  const { createSwitchingLuarRencana, updateSwitchingLuarRencana } =
    switchingLuarRencanaApi();

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
      let payload: PayloadSwitchingLuarRencana[] = [];

      values.penghantar.forEach((value, index: number) => {
        payload.push({
          gardu_induk_id: values.gardu_induk_id,
          jam_buka: dayjs(values.jam_buka[index].value).format("HH:mm"),
          jam_tutup: dayjs(values.jam_tutup[index].value).format("HH:mm"),
          penghantar_id: value.id,
          tanggal: dayjs(values.tanggal).format("YYYY-MM-DD"),
          keterangan: values.keterangan,
        });
      });

      if (modalSnapshot.id) {
        updateSwitchingLuarRencana({ ...payload[0], id: data.id });
      } else {
        createSwitchingLuarRencana(payload);
      }
      onCloseModal();
    })();
  };

  const onCloseModal = () => {
    closeModal();
    removeData();
    setFields([defaultValue]);
    formMethods.reset({ ...initialValues });
  };

  useEffect(() => {
    if (modalSnapshot.id) {
      formMethods.reset({
        ...data,
        gardu_induk_id: data?.gardu_induk?.id,
        jam_buka: [{ value: dayjs(data.jam_buka, "HH:mm") }],
        jam_tutup: [{ value: dayjs(data.jam_tutup, "HH:mm") }],
        penghantar: [{ id: data.penghantar.id }],
      });
    }
  }, [modalSnapshot.id]);

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
              {fields.map((value, index) => {
                return (
                  <>
                    {fields.length > 1 && (
                      <Grid item xs={12}>
                        <Typography
                          variant="subtitle1"
                          sx={{ fontWeight: 500, mb: "10px" }}
                        >{`Jurusan ${index + 1}`}</Typography>
                      </Grid>
                    )}
                    <Grid item xs={6}>
                      <SelectInput
                        label="Jurusan"
                        name={`penghantar[${index}].id`}
                        options={penghantarOptions}
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <TimePicker
                        label="Jam Buka"
                        name={`jam_buka[${index}].value`}
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <TimePicker
                        label="Jam Tutup"
                        name={`jam_tutup[${index}].value`}
                      />
                    </Grid>
                  </>
                );
              })}
              <Grid item xs={12}>
                {!modalSnapshot.id && (
                  <Button
                    variant="outlined"
                    sx={{ height: "30px", mb: "10px" }}
                    onClick={() =>
                      setFields((prevState) => [...prevState, defaultValue])
                    }
                  >
                    <Plus />
                    Tambah Jurusan Lain
                  </Button>
                )}
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
