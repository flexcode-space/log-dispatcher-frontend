import { useState, useEffect } from "react";
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
import Plus from "mdi-material-ui/Plus";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSnapshot } from "valtio";
import { InputField } from "src/components/input-field";
import { SelectInput } from "src/components/select-input";
import { DatePicker } from "src/components/date-picker";
import { StyledForm } from "src/components/form";
import { modal, reloadPage, closeModal } from "src/state/modal";
import { useModalAdd } from "./useModalAdd";
import { initialValues } from "./ModalAddOLS.constant";
import { defenseSchemeOlsApi } from "src/api/defense-ols";
import dayjs from "dayjs";
import { ols, removeData } from "../../ols/state/ols";
import { setReloadPage } from "src/state/reloadPage";
// import { laporanNeracaDaya } from "../state/laporanNeracaDaya";

type ModalAddProps = {
  name: string;
};

const defaultValue = {
  target: "",
};

type DefaultValueProps = {
  target: string;
}[];

const ModalAdd = ({ name }: ModalAddProps) => {
  const modalSnapshot = useSnapshot(modal);
  const { data } = useSnapshot(ols);
  // const { data } = useSnapshot(laporanNeracaDaya);
  const [fields, setFields] = useState<DefaultValueProps>([defaultValue]);

  const { createDefenseScheme } = defenseSchemeOlsApi();

  const { subsistemOptions } = useModalAdd();

  const formMethods = useForm({
    // resolver: yupResolver(validationSchema),
    defaultValues: initialValues,
    mode: "onSubmit",
  });
  const isOpen =
    modalSnapshot.isOpen && modalSnapshot.target === "modal-add-ols";
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
        // await updateDefenseUFR([{ ...payload, id: modalSnapshot.id }]);
        console.log("tes");
      } else {
        await createDefenseScheme([payload]);
      }
      onClickCloseModal();
      setReloadPage("ufr");
    })();
  };

  const onClickCloseModal = () => {
    closeModal();
    removeData();
    formMethods.reset({ ...initialValues });
    // formMethods.reset({ ...initialValues });
  };
  useEffect(() => {
    if (modalSnapshot.id) {
      const {
        tanggal,
        status,
        gardu_induk,

        sub_sistem,
        tahap,
        ...rest
      } = data;
    }
  }, [modalSnapshot.isOpen]);
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
                {`Tambah ${name}`}
              </Typography>
            </Box>
            <Grid container spacing={1} mt={1}>
              <Grid item xs={12} sm={6}>
                <InputField name="lokasi_ols" label={`Lokasi ${name}`} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <SelectInput
                  label="Subsistem"
                  name="sub_sistem_id"
                  options={subsistemOptions}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <SelectInput label="Tahap" name="tahap" options={[]} />
              </Grid>
              <Grid item xs={12} sm={4}>
                <SelectInput label="AMP" name="amp" options={[]} />
              </Grid>
              <Grid item xs={12} sm={4}>
                <InputField name="detik" label="Detik" />
              </Grid>
              <Grid item xs={12} sm={4}>
                <InputField label="MW" name="mw" />
              </Grid>
              <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                Setting
              </Typography>
              {fields.map((value, index: number) => {
                return (
                  <Grid key={`target_${index}`} item xs={12} sm={12}>
                    <SelectInput
                      label="Target Trip"
                      name={`target_[${index}]`}
                      options={[]}
                    />
                  </Grid>
                );
              })}
              <Grid item xs={12} sm={12} mb="12px">
                <Button
                  style={{ height: "30px" }}
                  sx={{ mb: 2 }}
                  onClick={() =>
                    setFields((prevState) => [...prevState, defaultValue])
                  }
                  variant="outlined"
                >
                  <Plus sx={{ mr: 1 }} />
                  Tambah Target Trip Lain
                </Button>
              </Grid>
              <Grid item xs={12} sm={12}>
                <DatePicker label="Aktif" name="aktif" />
              </Grid>
              <Grid item xs={12} sm={12}>
                <SelectInput label="Status" name="status" options={[]} />
              </Grid>
              <Grid item xs={12} sm={12}>
                <InputField name="keterangan" label="Keterangan" />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions className="dialog-actions-dense">
            <Button variant="outlined" onClick={onClickCloseModal}>
              Batal
            </Button>
            <Button variant="contained" type="submit">
              Tambah
            </Button>
          </DialogActions>
        </StyledForm>
      </FormProvider>
    </Dialog>
  );
};

export default ModalAdd;
