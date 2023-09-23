import { useEffect, useState } from "react";
import { useForm, FormProvider, FieldPath } from "react-hook-form";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Stack,
  Typography,
  Box,
  IconButton,
} from "@mui/material";
import Plus from "mdi-material-ui/Plus";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSnapshot } from "valtio";
import { Axios } from "src/api/axios";
import { SelectInput } from "src/components/select-input";
import { InputField, TextArea } from "src/components/input-field";
import { StyledForm } from "src/components/form";
import { closeModal, modal, reloadPage } from "src/state/modal";
import { DatePicker, TimePicker } from "src/components/date-picker";
import { UploadFile } from "src/components/upload-file";
import { useModalAdd } from "./useModalAdd";
import { validationSchema, initialValues } from "./ModalAdd.contant";
import { energizePeralatan, removeData } from "src/state/energizePeralatan";
import { energizePeralatanApi } from "src/api/energize-peralatan";
import { CreateEnergizePeralatan } from "../../types";
import dayjs from "dayjs";
import { TrashCanOutline } from "mdi-material-ui";
import { setReloadPage } from "src/state/reloadPage";

const defaultValue = {
  manuver: "",
};

type DefaultValueProps = {
  manuver: string;
}[];

const ModalAdd = () => {
  const [fields, setFields] = useState<DefaultValueProps>([defaultValue]);
  const modalSnapshot = useSnapshot(modal);
  const { data } = useSnapshot(energizePeralatan);

  const formMethods = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: initialValues,
    mode: "onSubmit",
  });

  const jenisPeralatan = formMethods.watch("jenis_peralatan");
  const garduIndukId = formMethods.watch("gardu_induk_id");

  const { garduIndukOptions, optionJenisPeralatan, peratanOptions } =
    useModalAdd(jenisPeralatan, garduIndukId);

  const {
    createEnergizePeralatan,
    updateEnergizePeralatan,
    deleteEnergizePeralatan,
  } = energizePeralatanApi();

  const titleModal = !!modalSnapshot.id ? "Ubah Data" : "Tambah Data";
  const isOpen =
    modalSnapshot.isOpen && modalSnapshot.target === "modal-energize-peralatan";

  const onSubmit = (event?: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();

    formMethods.handleSubmit(async (values) => {
      let payload: CreateEnergizePeralatan[] = [];

      values.manuver.forEach((manuver, index: number) => {
        const date = dayjs(values.tanggal[index].value).format("YYYY-MM-DD");
        const time = dayjs(values.close[index].value).format("HH:mm");

        payload.push({
          ba_ptp: values.ba_ptp,
          gardu_induk_id: values.gardu_induk_id,
          jenis_peralatan: values.jenis_peralatan,
          keterangan: values.keterangan,
          manuver: manuver.value,
          peralatan_id: values.peralatan_id,
          permohonan: values.permohonan,
          rlb: values.rlb,
          sop: values.sop,
          tanggal: `${date}`,
          close: time,
        });
      });

      if (modalSnapshot.id) {
        await updateEnergizePeralatan({ ...payload[0], id: modalSnapshot.id });
      } else {
        await createEnergizePeralatan(payload);
      }
      onCloseModal();
      setReloadPage("energize-peralatan");
    })();
  };

  const onClickDelete = async () => {
    if (confirm("Hapus Data ini ?")) {
      await deleteEnergizePeralatan({ id: data.id });
      onCloseModal();
      setReloadPage("energize-peralatan");
    }
  };

  const onCloseModal = () => {
    closeModal();
    removeData();
    setFields([defaultValue]);
    formMethods.reset({ ...initialValues });
  };

  const handleFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    name: FieldPath<CreateEnergizePeralatan>
  ) => {
    if (!e.target.files) {
      return;
    }

    const file = e.target.files[0];

    const formData = new FormData();
    formData.append("file", file);

    Axios.post("/laporan/upload", formData).then(({ data }) => {
      formMethods.setValue(name, data.nama);
    });
  };

  useEffect(() => {
    const date = dayjs(data.tanggal);

    if (modalSnapshot.id) {
      formMethods.reset({
        ...data,
        manuver: [{ value: data.manuver }],
        gardu_induk_id: data?.gardu_induk?.id,
        peralatan_id: data.peralatan.id,
        tanggal: [{ value: date }],
        close: [{ value: date }],
      });
    }
  }, [modalSnapshot.id]);

  return (
    <Dialog
      open={isOpen}
      fullWidth
      onClose={onCloseModal}
      maxWidth="md"
      scroll="body"
    >
      <FormProvider {...formMethods}>
        <StyledForm noValidate onSubmit={onSubmit}>
          <DialogTitle id="max-width-dialog-title">{titleModal}</DialogTitle>
          <DialogContent>
            <Grid container spacing={1} mt={1}>
              <Grid item xs={12}>
                <SelectInput
                  label="Gardu Induk"
                  name="gardu_induk_id"
                  options={garduIndukOptions}
                />
              </Grid>
              <Grid item xs={6}>
                <SelectInput
                  label="Jenis Peralatan"
                  name="jenis_peralatan"
                  options={optionJenisPeralatan}
                />
              </Grid>
              <Grid item xs={6}>
                <SelectInput
                  label="Peralatan"
                  name="peralatan_id"
                  options={peratanOptions}
                />
              </Grid>
              {fields.map((value, index) => {
                return (
                  <>
                    <Grid item xs={12}>
                      <Typography
                        variant="subtitle1"
                        sx={{ fontWeight: "500", fontSize: "14px", pb: "8px" }}
                      >
                        {`Manuver ${index + 1}`}
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <InputField
                        label="Manuver"
                        name={`manuver[${index}].value`}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <DatePicker
                        label="Tanggal"
                        name={`tanggal[${index}].value`}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TimePicker
                        label="Close"
                        name={`close[${index}].value`}
                      />
                    </Grid>
                  </>
                );
              })}
              <Grid item xs={12}>
                <Button
                  variant="outlined"
                  sx={{ height: "30px" }}
                  onClick={() =>
                    setFields((prevState) => [...prevState, defaultValue])
                  }
                >
                  <Plus />
                  Tambah Manuver
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Typography
                  variant="subtitle1"
                  sx={{ fontWeight: "500", fontSize: "14px", pb: "8px" }}
                >
                  Upload File
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <UploadFile
                  label="SOP Energize"
                  name="sop"
                  onChange={(e) => handleFileUpload(e, "sop")}
                />
              </Grid>
              <Grid item xs={6}>
                <UploadFile
                  label="RLD"
                  name="rlb"
                  onChange={(e) => handleFileUpload(e, "rlb")}
                />
              </Grid>
              <Grid item xs={6}>
                <UploadFile
                  label="Surat Permohonan"
                  name="permohonan"
                  onChange={(e) => handleFileUpload(e, "permohonan")}
                />
              </Grid>
              <Grid item xs={6}>
                <UploadFile
                  label="BA PTP"
                  name="ba_ptp"
                  onChange={(e) => handleFileUpload(e, "ba_ptp")}
                />
              </Grid>
              <Grid item xs={12}>
                <TextArea label="Keterangan" name="keterangan" />
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
                {modalSnapshot.id && (
                  <Button variant="text" onClick={onClickDelete}>
                    <IconButton>
                      <TrashCanOutline />
                    </IconButton>
                    Hapus data
                  </Button>
                )}
              </Box>
              <Box display="flex" gap="10px">
                <Button variant="outlined" onClick={onCloseModal}>
                  Batal
                </Button>
                <Button variant="contained" type="submit">
                  Simpan
                </Button>
              </Box>
            </Stack>
          </DialogActions>
        </StyledForm>
      </FormProvider>
    </Dialog>
  );
};

export default ModalAdd;
