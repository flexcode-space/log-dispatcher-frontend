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
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSnapshot } from "valtio";
import { SelectInput } from "src/components/select-input";
import { DatePicker, TimePicker } from "src/components/date-picker";
import { StyledForm } from "src/components/form";
import { modal, closeModal, openModal } from "src/state/modal";
import dayjs, { Dayjs } from "dayjs";

type ModalFilterProps = {
  onChangeFilter: ({
    tanggal,
    jam,
  }: {
    tanggal: Dayjs | null;
    jam: Dayjs | null;
  }) => void;
};

const ModalFilter = ({ onChangeFilter }: ModalFilterProps) => {
  const modalSnapshot = useSnapshot(modal);

  const isOpen =
    modalSnapshot.isOpen && modalSnapshot.target === "modal-filter-neraca-daya";

  const initialValues = {
    jenis_laporan: 1,
    tanggal: new Date(),
    jam: new Date(),
  };

  const validationSchema = yup.object({
    jenis_laporan: yup.number(),
    tanggal: yup.string(),
    jam: yup.string(),
  });

  const formMethods = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: initialValues,
    mode: "onSubmit",
  });

  const onSubmit = (event?: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();

    formMethods.handleSubmit(async (values) => {
      console.log("values", values);
      const tanggal = values.jenis_laporan === 2 ? dayjs(values.tanggal) : null;
      const jam = values.jenis_laporan === 2 ? dayjs(values.jam) : null;
      onChangeFilter({
        tanggal,
        jam,
      });
      openModal("modal-generate-laporan");
      formMethods.reset({ ...initialValues });
    })();
  };

  const hanleCloseModal = () => {
    closeModal();
    formMethods.reset({ ...initialValues });
  };

  const jenisLaporan = formMethods.watch("jenis_laporan");

  return (
    <Dialog
      open={isOpen}
      fullWidth
      onClose={hanleCloseModal}
      maxWidth="sm"
      scroll="body"
    >
      <FormProvider {...formMethods}>
        <StyledForm noValidate onSubmit={onSubmit} sx={{ width: "100%" }}>
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
                Generate Laporan
              </Typography>
            </Box>
            <Grid container spacing={1} mt={1}>
              <Grid item xs={12}>
                <SelectInput
                  name="jenis_laporan"
                  label="Jenis Laporan"
                  options={[
                    {
                      value: 1,
                      label: "Rencana Neraca Daya",
                    },
                    {
                      value: 2,
                      label: "Laporan Neraca Daya (Perjam)",
                    },
                  ]}
                />
              </Grid>
              {jenisLaporan === 2 && (
                <>
                  <Grid item xs={6}>
                    <DatePicker label="Tanggal" name="tanggal" />
                  </Grid>
                  <Grid item xs={6}>
                    <TimePicker label="Jam" name="jam" />
                  </Grid>
                </>
              )}
            </Grid>
          </DialogContent>
          <DialogActions className="dialog-actions-dense">
            <Button variant="outlined" onClick={hanleCloseModal}>
              Batal
            </Button>
            <Button variant="contained" type="submit">
              Generate
            </Button>
          </DialogActions>
        </StyledForm>
      </FormProvider>
    </Dialog>
  );
};

export default ModalFilter;
