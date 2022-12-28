import { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { Button, Dialog, DialogActions, DialogContent } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSnapshot } from "valtio";
import { StyledForm } from "src/components/form";
import { modal, closeModal } from "src/state/modal";
import { Form } from "./form";
import {
  initialValues,
  TypeUnion,
  validationSchema,
} from "./ModalAdd.constant";
import dayjs from "dayjs";
import { laporanPekerjaanApi } from "src/api/laporan-pekerjaan";
import { setReloadPage } from "src/state/reloadPage";
import { laporanPekerjaan } from "../state/laporanPekerjaan";

const ModalAdd = () => {
  const [isNextPage, setIsNextPage] = useState<boolean>(false);

  const modalSnapshot = useSnapshot(modal);
  const { data } = useSnapshot(laporanPekerjaan);
  const { createLaporanPekerjaan, updateLaporanPekerjaan } =
    laporanPekerjaanApi();

  const isOpen =
    modalSnapshot.isOpen && modalSnapshot.target === "modal-laporan-pekerjaan";

  const formMethods = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: initialValues,
    mode: "onSubmit",
  });

  const jenisForm = formMethods.watch("tipe");

  const onSubmit = (event?: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();

    formMethods.handleSubmit(async (values) => {
      const {
        tanggal,
        tanggal_akhir,
        tanggal_awal,
        waktu_akhir,
        waktu_awal,
        ...rest
      } = values;

      const startDate = dayjs(tanggal_awal).format("YYYY-MM-DD");
      const startTime = dayjs(waktu_awal).format("HH:mm");
      const endDate = dayjs(tanggal_akhir).format("YYYY-MM-DD");
      const endTime = dayjs(waktu_akhir).format("HH:mm");

      const payload = {
        ...rest,
        tanggal: dayjs(tanggal).format("YYYY-MM-DD"),
        waktu_mulai: `${startDate} ${startTime}`,
        waktu_akhir: `${endDate} ${endTime}`,
      };

      if (modalSnapshot.id) {
        updateLaporanPekerjaan({ ...payload, id: data.id });
      } else {
        await createLaporanPekerjaan(payload);
      }
      onCloseModal();
      setReloadPage("laporan-pekerjaan");
    })();
  };

  const onCloseModal = () => {
    closeModal();
    setIsNextPage(false);
    formMethods.reset({ ...initialValues });
  };

  useEffect(() => {
    if (modalSnapshot.id) {
      const { tipe, gardu_induk, ...rest } = data;

      setIsNextPage(true);
      formMethods.reset({
        ...rest,
        tipe: data.tipe as TypeUnion,
        gardu_induk_id: gardu_induk.id,
      });
    }
  }, [modalSnapshot.isOpen]);

  return (
    <Dialog
      open={isOpen}
      fullWidth
      onClose={onCloseModal}
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
            {isNextPage ? Form[jenisForm]() : Form["DEFAULT"]()}
          </DialogContent>
          <DialogActions className="dialog-actions-dense">
            <Button
              variant={isNextPage ? "text" : "outlined"}
              onClick={onCloseModal}
            >
              Batal
            </Button>
            {isNextPage ? (
              <>
                {!modalSnapshot.id && (
                  <Button
                    variant="outlined"
                    onClick={() => setIsNextPage(false)}
                  >
                    Sebelumnya
                  </Button>
                )}
                <Button variant="contained" type="submit">
                  Tambah
                </Button>
              </>
            ) : (
              <Button variant="contained" onClick={() => setIsNextPage(true)}>
                Selanjutnya
              </Button>
            )}
          </DialogActions>
        </StyledForm>
      </FormProvider>
    </Dialog>
  );
};

export default ModalAdd;
