import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  Typography,
  Box,
  Tab,
} from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSnapshot } from "valtio";
import { SelectInput } from "src/components/select-input";
import { StyledForm } from "src/components/form";
import {
  initialValues,
  TAB_MENU,
  validationSchema,
} from "./ModalEditBebanHarian.constant";
import { modal, closeModal } from "src/state/modal";
import { useModal } from "./useModal";
import { bebanApi } from "src/api/beban";
import dayjs, { Dayjs } from "dayjs";
import { TIME } from "src/constants/time";
import { InputField } from "src/components/input-field";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { TabName } from "src/components/tab";

type ModalEditBebanHarianProps = {
  date: Dayjs | null;
};

const ModalEditBebanHarian = ({ date }: ModalEditBebanHarianProps) => {
  const modalSnapshot = useSnapshot(modal);

  const [tab, setTab] = useState<"mw" | "mx">("mw");

  const { updateBeban } = bebanApi();

  const isOpen = modalSnapshot.isOpen && modalSnapshot.target === "modal-edit";

  const formMethods = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: initialValues,
    mode: "onSubmit",
  });

  const jenisPeralatan = formMethods.watch("jenis_peralatan");
  const subsistemId = formMethods.watch("subsistem_id");

  const { optionJenisPeralatan, peralatanOptions, subsistemOptions } = useModal(
    jenisPeralatan,
    subsistemId
  );

  const onSubmit = (event?: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();

    formMethods.handleSubmit(async (values) => {
      const { subsistem_id, jenis_peralatan, peralatan_id, ...rest } = values;

      Object.keys(rest).forEach((key) => {
        // @ts-ignore
        if (rest[key] === undefined) {
          // @ts-ignore
          delete rest[key];
        }
      });

      const payload = {
        subsistem_id,
        jenis_peralatan,
        peralatan_id,
        tanggal: dayjs(date).format("YYYY-MM-DD"),
        data: rest,
      };
      updateBeban(payload).then(() => {
        onClickCloseModal();
      });
    })();
  };

  const onClickCloseModal = () => {
    closeModal();
    formMethods.reset({ ...initialValues });
  };

  return (
    <Dialog
      open={isOpen}
      fullWidth
      onClose={onClickCloseModal}
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
                {`Ubah Data ${dayjs(date).format("DD/MM/YYYY")}`}
              </Typography>
            </Box>
            <Grid container spacing={3} mt={1}>
              <Grid item xs={12} sm={4}>
                <SelectInput
                  label="Subsistem"
                  name="subsistem_id"
                  options={subsistemOptions}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <SelectInput
                  label="Jenis Peralatan"
                  name="jenis_peralatan"
                  options={optionJenisPeralatan}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <SelectInput
                  label="Pilih Peralatan"
                  name="peralatan_id"
                  options={peralatanOptions}
                />
              </Grid>

              <Grid item xs={12}>
                <TabContext value={tab as string}>
                  <TabList
                    // @ts-ignore
                    onChange={(_, value: string) => setTab(value)}
                    aria-label="account-settings tabs"
                    sx={{
                      marginBottom: "20px",
                      borderBottom: (theme) =>
                        `1px solid ${theme.palette.divider}`,
                    }}
                    variant="fullWidth"
                  >
                    {TAB_MENU.map(({ value, label }) => (
                      <Tab
                        key={value}
                        value={value}
                        label={<TabName>{label}</TabName>}
                      />
                    ))}
                  </TabList>
                  <TabPanel sx={{ p: 0 }} value="mw">
                    <Grid container spacing={3}>
                      {TIME.map((value) => (
                        <Grid item xs={1.5} key={value}>
                          <InputField
                            name={`mw_${value.replace(".", "")}`}
                            label={value}
                            type="number"
                          />
                        </Grid>
                      ))}
                    </Grid>
                  </TabPanel>
                  <TabPanel sx={{ p: 0 }} value="mx">
                    <Grid container spacing={3}>
                      {TIME.map((value) => (
                        <Grid item xs={1.5} key={value}>
                          <InputField
                            name={`mx_${value.replace(".", "")}`}
                            label={value}
                            type="number"
                          />
                        </Grid>
                      ))}
                    </Grid>
                  </TabPanel>
                </TabContext>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions className="dialog-actions-dense">
            <Button variant="outlined" onClick={onClickCloseModal}>
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

export default ModalEditBebanHarian;
