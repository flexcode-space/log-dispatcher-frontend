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
import { useCatatanPembangkitan } from "../../useCatatanPembangkitan";
import { initialValues, validationSchema } from "./ModalFilter.constant";
import { FilterProps, Filter } from "../../types";

type ModaFilterProps = {
  filter: Filter;
  onChange: (value: Filter) => void;
};

const ModalFilter = ({ filter, onChange }: ModaFilterProps) => {
  const modalSnapshot = useSnapshot(modal);

  const { pembangkitOptions, statusOptions } = useCatatanPembangkitan();

  const isOpen =
    modalSnapshot.isOpen && modalSnapshot.target === "modal-filter";

  const formMethods = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: initialValues,
    mode: "onSubmit",
  });

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
    onChange({ ...initialValues });
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
              <Grid item xs={12} sx={{ mb: "10px" }}>
                <Typography fontWeight={500}>Pembangkit Derating</Typography>
              </Grid>
              <Grid item xs={6}>
                <SelectInput
                  label="Pembangkit"
                  name="derating.pembangkit_id"
                  options={pembangkitOptions}
                />
              </Grid>
              <Grid item xs={6}>
                <SelectInput
                  label="Status"
                  name="derating.status"
                  options={statusOptions}
                />
              </Grid>
              <Grid item xs={4}>
                <DatePicker
                  label="Tanggal Mulai"
                  name="derating.tanggal_mulai"
                />
              </Grid>
              <Grid item xs={4}>
                <DatePicker
                  label="Tanggal Akhir"
                  name="derating.tanggal_akhir"
                />
              </Grid>
              <Grid item xs={4}>
                <InputField name="derating.operator" label="Operator" />
              </Grid>
            </Grid>

            <Grid container spacing={1} mt={1}>
              <Grid item xs={12} sx={{ mb: "10px" }}>
                <Typography fontWeight={500}>Pembangkit Outage</Typography>
              </Grid>
              <Grid item xs={6}>
                <SelectInput
                  label="Pembangkit"
                  name="outage.pembangkit_id"
                  options={pembangkitOptions}
                />
              </Grid>
              <Grid item xs={6}>
                <SelectInput
                  label="Status"
                  name="outage.status"
                  options={statusOptions}
                />
              </Grid>
              <Grid item xs={4}>
                <DatePicker label="Tanggal Mulai" name="outage.tanggal_mulai" />
              </Grid>
              <Grid item xs={4}>
                <DatePicker label="Tanggal Akhir" name="outage.tanggal_akhir" />
              </Grid>
              <Grid item xs={4}>
                <InputField name="outage.operator" label="Operator" />
              </Grid>
            </Grid>

            <Grid container spacing={1} mt={1}>
              <Grid item xs={12} sx={{ mb: "10px" }}>
                <Typography fontWeight={500}>Pembangkit RS, NC, Dll</Typography>
              </Grid>
              <Grid item xs={6}>
                <SelectInput
                  label="Pembangkit"
                  name="lain.pembangkit_id"
                  options={pembangkitOptions}
                />
              </Grid>
              <Grid item xs={6}>
                <SelectInput
                  label="Status"
                  name="lain.status"
                  options={statusOptions}
                />
              </Grid>
              <Grid item xs={4}>
                <DatePicker label="Tanggal Mulai" name="lain.tanggal_mulai" />
              </Grid>
              <Grid item xs={4}>
                <DatePicker label="Tanggal Akhir" name="lain.tanggal_akhir" />
              </Grid>
              <Grid item xs={4}>
                <InputField name="lain.operator" label="Operator" />
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
