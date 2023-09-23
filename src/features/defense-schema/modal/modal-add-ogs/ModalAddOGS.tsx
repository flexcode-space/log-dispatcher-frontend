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
  Stack,
  IconButton,
} from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSnapshot } from "valtio";
import { InputField } from "src/components/input-field";
import { SelectInput } from "src/components/select-input";
import { DatePicker } from "src/components/date-picker";
import { StyledForm } from "src/components/form";
import { modal, closeModal } from "src/state/modal";
import { useModalAdd } from "./useModalAdd";
import { initialValues, validationSchema } from "./ModalAddOGS.constant";
import dayjs from "dayjs";
import { setReloadPage } from "src/state/reloadPage";
import { usePeralatan } from "./usePeralatan";
import { defenseApi } from "src/api/defense";
import { defenseSchema, removeData } from "../../state/defenseSchema";
import { TrashCanOutline } from "mdi-material-ui";

const ModalAdd = () => {
  const modalSnapshot = useSnapshot(modal);
  const { data } = useSnapshot(defenseSchema);

  // const [fields, setFields] = useState<DefaultValueProps>([defaultValue]);

  const { createDefense, updateDefense, deleteDefense } = defenseApi();

  const formMethods = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: initialValues,
    mode: "onSubmit",
  });
  const isOpen =
    modalSnapshot.isOpen && modalSnapshot.target === "modal-add-ogs";
  const onSubmit = (event?: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();

    formMethods.handleSubmit(async (values) => {
      const { tanggal, status, ...rest } = values;

      const payload = {
        ...rest,
        status: status === "true",
        tanggal: dayjs(tanggal).format("YYYY-MM-DD"),
      };

      if (modalSnapshot.id) {
        await updateDefense("ogs", { ...payload, id: modalSnapshot.id });
      } else {
        await createDefense("ogs", [payload]);
      }
      onCloseModal();
      setReloadPage("ogs");
    })();
  };

  const onClickDelete = async () => {
    if (confirm("Hapus Data ini ?")) {
      await deleteDefense("ogs", { id: data.id });
      onCloseModal();
      setReloadPage("ogs");
    }
  };

  const jenisPeralatan = formMethods.watch("jenis_peralatan");
  const jenisPeralatanTarget = formMethods.watch("jenis_peralatan_target");

  const {
    subsistemOptions,
    tahapOptions,
    statusOptions,
    garduIndukOptions,
    optionJenisPeralatan,
    peratanOptions,
    ampOptions,
  } = useModalAdd(jenisPeralatan);

  const { jenisPeralatanTargetOptions, peralatantargetOptions } =
    usePeralatan(jenisPeralatanTarget);

  const onCloseModal = () => {
    closeModal();
    removeData();
    formMethods.reset({ ...initialValues });
  };
  useEffect(() => {
    if (modalSnapshot.id) {
      const {
        tanggal,
        gardu_induk,
        sub_sistem,
        peralatan,
        peralatan2,
        peralatan_target,
        tahap,
        amp,
        status,
        ...rest
      } = data;

      formMethods.reset({
        ...rest,
        sub_sistem_id: sub_sistem.id,
        tanggal: dayjs(tanggal),
        gardu_induk_id: gardu_induk.id,
        peralatan_id: peralatan.id,
        peralatan2_id: peralatan2?.id,
        peralatan_target_id: peralatan_target.id,
        status: status ? "true" : "false",
        tahap_id: tahap.id,
        amp_id: amp.id,
      });
    }
  }, [modalSnapshot.isOpen]);

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
                Tambah OGS
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
                  label="Jenis Peralatan"
                  name="jenis_peralatan"
                  options={optionJenisPeralatan}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <SelectInput
                  label="Peralatan"
                  name="peralatan_id"
                  options={peratanOptions}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <SelectInput
                  label="Peralatan 2"
                  name="peralatan2_id"
                  options={peratanOptions}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <SelectInput
                  label="Tahap"
                  name="tahap_id"
                  options={tahapOptions}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                  Setting
                </Typography>
              </Grid>
              <Grid item xs={12} sm={4}>
                <SelectInput label="AMP" name="amp_id" options={ampOptions} />
              </Grid>
              <Grid item xs={12} sm={4}>
                <InputField name="detik" label="Detik" />
              </Grid>
              <Grid item xs={12} sm={4}>
                <InputField label="MW" name="mw" />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                  Target Trip
                </Typography>
              </Grid>
              {/* {fields.map((value, index: number) => {
                return (
                  <> */}
              <Grid item xs={4}>
                <SelectInput
                  label="Gardu Induk"
                  name="gardu_induk_id"
                  options={garduIndukOptions}
                />
              </Grid>
              <Grid item xs={4}>
                <SelectInput
                  label="Jenis Peralatan"
                  name="jenis_peralatan_target"
                  options={jenisPeralatanTargetOptions}
                />
              </Grid>
              <Grid item xs={4}>
                <SelectInput
                  label="Peralatan"
                  name="peralatan_target_id"
                  options={peralatantargetOptions}
                />
              </Grid>
              {/* </>
                );
              })} */}
              <Grid item xs={12} sm={12}>
                <DatePicker label="Aktif" name="tanggal" />
              </Grid>
              <Grid item xs={12} sm={12}>
                <SelectInput
                  label="Status"
                  name="status"
                  options={statusOptions}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <InputField name="keterangan" label="Keterangan" />
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
