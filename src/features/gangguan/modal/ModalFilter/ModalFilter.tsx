import { useEffect } from "react";
import dayjs from "dayjs";
import { useForm, FormProvider } from "react-hook-form";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { TrashCanOutline } from "mdi-material-ui";
import { useSnapshot } from "valtio";
import { yupResolver } from "@hookform/resolvers/yup";
import { SelectInput } from "src/components/select-input";
import { InputField } from "src/components/input-field";
import { StyledForm } from "src/components/form";
import { closeModal, modal } from "src/state/modal";
import { DatePicker } from "src/components/date-picker";
// import { useCatatanPembangkitan } from "../../useCatatanPembangkitan";
import { initialValues, validationSchema } from "./ModalFilter.constant";
import { Filter } from "../../types";
import { useModalAddGangguan } from "../modal-add-gangguan/useModalAddGangguan";

type ModaFilterProps = {
  filter: Filter;
  onChange: (value: Filter) => void;
};

const ModalFilter = ({ filter, onChange }: ModaFilterProps) => {
  const modalSnapshot = useSnapshot(modal);

  const isOpen =
    modalSnapshot.isOpen && modalSnapshot.target === "modal-filter";

  const formMethods = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: initialValues,
    mode: "onSubmit",
  });

  const jenisPeralatan = formMethods.watch("jenis_peralatan");
  const garduIndukId = formMethods.watch("gardu_induk_id");

  const {
    garduIndukOptions,
    jenisGangguanOptions,
    optionJenisPeralatan,
    peratanOptions,
    releOptions,
  } = useModalAddGangguan(jenisPeralatan, garduIndukId);

  const {
    formState: { isDirty },
  } = formMethods;

  const onSubmit = (event?: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();

    formMethods.handleSubmit(async (values) => {
      onChange(values);
      closeModal();
    })();
  };

  const onClickDelete = () => {
    formMethods.reset({ ...initialValues });
    onChange({} as Filter);
  };

  useEffect(() => {
    formMethods.reset({ ...filter });
  }, []);

  return (
    <Dialog
      open={isOpen}
      fullWidth
      onClose={closeModal}
      maxWidth="sm"
      scroll="body"
    >
      <FormProvider {...formMethods}>
        <StyledForm noValidate onSubmit={onSubmit}>
          <DialogTitle id="max-width-dialog-title">Filter</DialogTitle>
          <DialogContent>
            <Grid container spacing={1} mt={1}>
              <Grid item xs={6}>
                <SelectInput
                  label="Lokasi"
                  name="gardu_induk_id"
                  options={garduIndukOptions}
                />
              </Grid>
              <Grid item xs={6}>
                <SelectInput
                  label="Jenis Gangguan"
                  name="gangguan_jenis_id"
                  options={jenisGangguanOptions}
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
              <Grid item sm={4}>
                <SelectInput label="Rele" name="rele" options={releOptions} />
              </Grid>
              <Grid item sm={4}>
                <SelectInput
                  label="Announciator"
                  name="announciator"
                  options={releOptions}
                />
              </Grid>
              <Grid item xs={4}>
                <DatePicker label="Tanggal" name="tanggal" />
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
                {isDirty && (
                  <Button variant="text" onClick={onClickDelete}>
                    <IconButton>
                      <TrashCanOutline />
                    </IconButton>
                    Hapus Filter
                  </Button>
                )}
              </Box>
              <Box display="flex" gap="10px">
                <Button variant="outlined" onClick={closeModal}>
                  Batal
                </Button>
                <Button variant="contained" type="submit">
                  Terapkan
                </Button>
              </Box>
            </Stack>
          </DialogActions>
        </StyledForm>
      </FormProvider>
    </Dialog>
  );
};

export default ModalFilter;
