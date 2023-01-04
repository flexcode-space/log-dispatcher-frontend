import { ChangeEvent, useEffect, useState } from "react";
import { useForm, FormProvider, FieldPath } from "react-hook-form";
import { Dialog } from "@mui/material";
import { useSnapshot } from "valtio";
import { StyledForm } from "src/components/form";
import { modal, closeModal } from "src/state/modal";
import { FormKeterangan, FormPencatatan } from "./form";
import { yupResolver } from "@hookform/resolvers/yup";
import { initialValues, validationSchema } from "./ModalAddGangguan.constant";
import { Axios } from "src/api/axios";
import { PayloadGangguan, UploadDocumentType } from "./types";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { gangguanApi } from "src/api/gangguan";
import { setReloadPage } from "src/state/reloadPage";
import { gangguan, removeData } from "../../state/gangguan";

dayjs.extend(customParseFormat);

const ModalAddGangguan = () => {
  const modalSnapshot = useSnapshot(modal);
  const { data } = useSnapshot(gangguan);

  const [showNextForm, setShowNextForm] = useState<boolean>(false);

  const isOpen =
    modalSnapshot.isOpen && modalSnapshot.target === "modal-add-gangguan";

  const formMethods = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: initialValues,
    mode: "onSubmit",
  });

  const { createGangguan, updateGangguan } = gangguanApi();

  const jenisPeralatan = formMethods.watch("jenis_peralatan");
  const garduIndukId = formMethods.watch("gardu_induk_id");

  const onSubmit = (event?: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();

    formMethods.handleSubmit(async (values) => {
      const payload: PayloadGangguan = {
        ...values,
        tanggal: dayjs(values.tanggal).format("YYYY-MM-DD"),
        siap_op: dayjs(values.siap_op).format("HH:mm"),
        buka: dayjs(values.buka).format("HH:mm"),
        reclose: dayjs(values.reclose).format("HH:mm"),
        sms_kinerja: dayjs(values.sms_kinerja).format("HH:mm"),
        trip: dayjs(values.trip).format("HH:mm"),
        tutup: dayjs(values.tutup).format("HH:mm"),
        announciator: [values.announciator],
        rele: [values.rele],
      };

      if (modalSnapshot.id) {
        await updateGangguan({ ...payload, id: modalSnapshot.id });
      } else {
        await createGangguan(payload);
      }
      onCloseModal();
      setReloadPage("gangguan");
    })();
  };

  const onCloseModal = () => {
    closeModal();
    setShowNextForm(false);
    removeData();
    formMethods.reset({ ...initialValues });
  };

  const handleFileUpload = (
    e: ChangeEvent<HTMLInputElement>,
    name: FieldPath<UploadDocumentType>
  ) => {
    if (!e.target.files) {
      return;
    }

    const file = e.target.files[0];

    const formData = new FormData();
    formData.append("file", file);

    Axios.post("/laporan/upload", formData).then(({ data }) => {
      formMethods.setValue(name, data.nama);
    });
  };

  useEffect(() => {
    if (modalSnapshot.id) {
      const {
        tanggal,
        gardu_induk,
        gangguan_jenis,
        peralatan,
        announciator,
        ...rest
      } = data;

      formMethods.reset({
        ...rest,
        tanggal: dayjs(tanggal),
        announciator: announciator?.[0] ?? "",
        rele: rest.rele?.[0] ?? "",
        gardu_induk_id: gardu_induk?.id,
        gangguan_jenis_id: gangguan_jenis?.id,
        peralatan_id: peralatan.id,
        trip: dayjs(rest?.trip, "HH:mm"),
        reclose: dayjs(rest?.reclose, "HH:mm"),
        buka: dayjs(rest?.buka, "HH:mm"),
        tutup: dayjs(rest?.tutup, "HH:mm"),
        siap_op: dayjs(rest?.siap_op, "HH:mm"),
      });
    }
  }, [modalSnapshot.isOpen, data]);

  return (
    <>
      <Dialog
        open={isOpen}
        fullWidth
        onClose={onCloseModal}
        maxWidth="md"
        scroll="body"
      >
        <FormProvider {...formMethods}>
          <StyledForm noValidate onSubmit={onSubmit}>
            {!showNextForm ? (
              <FormPencatatan
                onCloseModal={onCloseModal}
                onClickNextPage={() => setShowNextForm(true)}
                jenisPeralatan={jenisPeralatan}
                garduIndukId={garduIndukId}
                handleFileUpload={handleFileUpload}
              />
            ) : (
              <FormKeterangan
                onCloseModal={onCloseModal}
                onPrevPage={() => setShowNextForm(false)}
              />
            )}
          </StyledForm>
        </FormProvider>
      </Dialog>
    </>
  );
};

export default ModalAddGangguan;
