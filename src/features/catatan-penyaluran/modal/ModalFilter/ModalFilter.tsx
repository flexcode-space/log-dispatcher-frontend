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
import { useCatatanPenyaluran } from "../../useCatatanPenyaluran";
import { initialValues, validationSchema } from "./ModalFilter.constant";
import { FilterProps } from "../../types";
import { useEffect } from "react";

type ModaFilterProps = {
  filter: FilterProps;
  onChange: (value: FilterProps) => void;
};

const ModalFilter = ({ filter, onChange }: ModaFilterProps) => {
  const modalSnapshot = useSnapshot(modal);

  const { garduIndukOptions } = useCatatanPenyaluran();

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
    })();
  };

  const onClickCloseModal = () => {
    closeModal();
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
      onClose={onClickCloseModal}
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
                  label="Gardu Induk"
                  name="gardu_induk_id"
                  options={garduIndukOptions}
                />
              </Grid>
              <Grid item xs={6}>
                <InputField label="Jurusan" name="jurusan" />
              </Grid>
              <Grid item xs={6}>
                <DatePicker label="Tanggal Mulai" name="tanggal_mulai" />
              </Grid>
              <Grid item xs={6}>
                <DatePicker label="Tanggal Akhir" name="tanggal_akhir" />
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
                <Button variant="outlined" onClick={onClickCloseModal}>
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
