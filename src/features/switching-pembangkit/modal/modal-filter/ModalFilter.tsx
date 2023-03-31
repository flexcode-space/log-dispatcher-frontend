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
import { SelectInput } from "src/components/select-input";
import { StyledForm } from "src/components/form";
import { modal, closeModal } from "src/state/modal";
import { DatePicker } from "src/components/date-picker";
import { useSwitchingPembengkit } from "../../useSwitchingPembangkit";
import { Filter } from "../../types";
import { initialValues, validationSchema } from "./ModalFilter.constant";
import { TrashCanOutline } from "mdi-material-ui";

type ModaFilterProps = {
  filter: Filter;
  onChange: (value: Filter) => void;
};

const ModalFilter = ({ filter, onChange }: ModaFilterProps) => {
  const modalSnapshot = useSnapshot(modal);

  const { jenisSwitchingOptions, pembangkitOptions, statusOptions } =
    useSwitchingPembengkit();

  const isOpen =
    modalSnapshot.isOpen &&
    modalSnapshot.target === "modal-filter-switching-pembangkit";

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
                Filter
              </Typography>
            </Box>
            <Grid container spacing={1} mt={1}>
              <Grid item xs={12}>
                <SelectInput
                  label="Pembangkit"
                  name="pembangkit_id"
                  options={pembangkitOptions}
                />
              </Grid>
              <Grid item xs={12}>
                <SelectInput
                  label="Status"
                  name="status"
                  options={statusOptions}
                />
              </Grid>
              <Grid item xs={6}>
                <SelectInput
                  label="Jenis Switching"
                  name="jenis"
                  options={jenisSwitchingOptions}
                />
              </Grid>
              <Grid item xs={6}>
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
