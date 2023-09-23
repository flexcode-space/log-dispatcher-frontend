import { Fragment, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useForm, FormProvider } from "react-hook-form";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  Typography,
  Box,
  IconButton,
} from "@mui/material";
import { useSnapshot } from "valtio";
import { InputField } from "src/components/input-field";
import { SelectInput } from "src/components/select-input";
import { StyledForm } from "src/components/form";
import { modal, closeModal } from "src/state/modal";

import AddCicleIcon from "src/assets/icons/add-cicle-icon.svg";
import { useModalAdd } from "./useModalAdd";
import { yupResolver } from "@hookform/resolvers/yup";
import { initialValues, validationSchema } from "./ModalAddManuver.constant";
import { TimePicker } from "src/components/date-picker";
import { PayloadManuver } from "./types";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { manuverApi } from "src/api/manuver";
import { manuver, removeData } from "../state/manuver";
import { setReloadPage } from "src/state/reloadPage";

dayjs.extend(customParseFormat);

const defaultValue = {
  jurusan: "",
};

type DefaultValueProps = {
  jurusan: string;
}[];

const ModalAddManuver = () => {
  const router = useRouter();
  const gangguanId = router.query.id as string;

  const modalSnapshot = useSnapshot(modal);
  const { data } = useSnapshot(manuver);
  const [fields, setFields] = useState<DefaultValueProps>([defaultValue]);

  const { garduIndukOptions } = useModalAdd();
  const { createManuver, updateManuver } = manuverApi();

  const isOpen =
    modalSnapshot.isOpen && modalSnapshot.target === "modal-add-manuver";

  const formMethods = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: initialValues,
    mode: "onSubmit",
  });

  const onSubmit = (event?: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();

    formMethods.handleSubmit(async (values) => {
      let payload: PayloadManuver[] = [];

      values.gardu_induk.forEach((value, index: number) => {
        payload.push({
          gangguan_id: gangguanId,
          gardu_induk_id: value.id,
          jurusan: values.jurusan[index].value,
          buka: values.buka[index].value
            ? dayjs(values.buka[index].value).format("HH:mm")
            : "",
          tutup: values.tutup[index].value
            ? dayjs(values.tutup[index].value).format("HH:mm")
            : "",
          keterangan: values.keterangan[index].value,
        });
      });

      if (modalSnapshot.id) {
        await updateManuver({ ...payload[0], id: modalSnapshot.id });
      } else {
        await createManuver(payload);
      }
      handleCloseModal();
      setReloadPage("manuver");
    })();
  };

  const handleCloseModal = () => {
    closeModal();
    setFields([defaultValue]);
    removeData();
    formMethods.reset({ ...initialValues });
  };

  useEffect(() => {
    if (modalSnapshot.id) {
      formMethods.reset({
        gardu_induk: [{ id: data.gardu_induk.id }],
        jurusan: [{ value: data.jurusan }],
        buka: [
          {
            value: dayjs(data.buka, "HH:mm").isValid()
              ? dayjs(data.buka, "HH:mm")
              : null,
          },
        ],
        tutup: [
          {
            value: dayjs(data.tutup, "HH:mm").isValid()
              ? dayjs(data.tutup, "HH:mm")
              : null,
          },
        ],
        keterangan: [{ value: data.keterangan }],
      });
    }
  }, [modalSnapshot.isOpen]);

  return (
    <Dialog
      open={isOpen}
      fullWidth
      onClose={handleCloseModal}
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
                Tambah Manuver
              </Typography>
            </Box>
            <Grid container spacing={1} mt={1}>
              {fields.map((value, index: number) => {
                return (
                  <Fragment key={`manuver-${index}`}>
                    {fields.length > 1 && (
                      <Grid item xs={12}>
                        <Typography
                          variant="subtitle1"
                          sx={{ fontWeight: 500, mb: "10px" }}
                        >
                          {`Jurusan ${index + 1}`}
                        </Typography>
                      </Grid>
                    )}
                    <Grid item xs={12} sm={12}>
                      <SelectInput
                        label="Lokasi"
                        name={`gardu_induk[${index}].id`}
                        options={garduIndukOptions}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <InputField
                        name={`jurusan[${index}].value`}
                        label="Jurusan"
                      />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <TimePicker name={`buka[${index}].value`} label="Buka" />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <TimePicker
                        name={`tutup[${index}].value`}
                        label="Tutup"
                      />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <InputField
                        name={`keterangan[${index}].value`}
                        label="Keterangan"
                      />
                    </Grid>
                  </Fragment>
                );
              })}
              {!modalSnapshot.id && (
                <Grid item xs={12} sm={12} mb="12px">
                  <Button
                    style={{ height: "30px" }}
                    sx={{ mb: 2 }}
                    onClick={() => {
                      setFields((prevState) => {
                        const nextKey = prevState.length;

                        // @ts-ignore
                        formMethods.setValue(`buka[${nextKey}].value`, null, {
                          shouldValidate: false,
                        });
                        // @ts-ignore
                        formMethods.setValue(`tutup[${nextKey}].value`, null, {
                          shouldValidate: false,
                        });
                        return [...prevState, defaultValue];
                      });
                    }}
                    variant="outlined"
                  >
                    <IconButton>
                      <AddCicleIcon />
                    </IconButton>
                    Tambah Jurusan lain
                  </Button>
                </Grid>
              )}
            </Grid>
          </DialogContent>
          <DialogActions className="dialog-actions-dense">
            <Button variant="outlined" onClick={handleCloseModal}>
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

export default ModalAddManuver;
