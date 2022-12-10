import { useEffect } from "react";
import { useForm, FormProvider, FieldPath } from "react-hook-form";
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
import { convertDate } from "src/utils/date";

const ModalAdd = () => {
  const modalSnapshot = useSnapshot(modal);
  const { data } = useSnapshot(energizePeralatan);

  const formMethods = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: initialValues,
    mode: "onSubmit",
  });

  const jenisPeralatan = formMethods.watch("jenis_peralatan");

  const { garduIndukOptions, optionJenisPeralatan, peratanOptions } =
    useModalAdd(jenisPeralatan);

  const { createEnergizePeralatan, updateEnergizePeralatan } =
    energizePeralatanApi();

  const titleModal = !!modalSnapshot.id ? "Ubah Data" : "Tambah Data";
  const isOpen =
    modalSnapshot.isOpen && modalSnapshot.target === "modal-energize-peralatan";

  const onSubmit = (event?: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();

    formMethods.handleSubmit(async (values) => {
      const { tanggal, ...rest } = values;

      const payload = {
        ...rest,
        tanggal: convertDate(tanggal),
      };

      if (modalSnapshot.id) {
        await updateEnergizePeralatan({ ...payload, id: modalSnapshot.id });
      } else {
        await createEnergizePeralatan([payload]);
      }
      onCloseModal();
      reloadPage();
    })();
  };

  const onCloseModal = () => {
    closeModal();
    removeData();
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
    if (modalSnapshot.id) {
      formMethods.reset({ ...data, gardu_induk_id: data?.gardu_induk?.id });
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
              <Grid item xs={12}>
                <Typography
                  variant="subtitle1"
                  sx={{ fontWeight: "500", fontSize: "14px", pb: "8px" }}
                >
                  Manuver 1
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <InputField label="Manuver" name="manuver" />
              </Grid>
              <Grid item xs={6}>
                <DatePicker label="Tanggal" name="tanggal" />
              </Grid>
              {/* <Grid item xs={6}>
                <TimePicker label="Close" name="close" />
              </Grid> */}
              <Grid item xs={12}>
                <Button variant="outlined" sx={{ height: "30px" }}>
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
