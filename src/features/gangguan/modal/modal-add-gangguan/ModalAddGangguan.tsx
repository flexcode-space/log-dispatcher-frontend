import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { Dialog } from "@mui/material";
import { useSnapshot } from "valtio";
import { StyledForm } from "src/components/form";
import { modal, closeModal } from "src/state/modal";
import { FormKeterangan, FormPencatatan } from "./form";
import { yupResolver } from "@hookform/resolvers/yup";
import { initialValues, validationSchema } from "./ModalAddGangguan.constant";

const defaultValue = {
  jurusan: "",
};

type DefaultValueProps = {
  jurusan: string;
}[];

const ModalAddGangguan = () => {
  const modalSnapshot = useSnapshot(modal);
  const [fields, setFields] = useState<DefaultValueProps>([defaultValue]);
  const [showNextForm, setShowNextForm] = useState<boolean>(false);

  const isOpen =
    modalSnapshot.isOpen && modalSnapshot.target === "modal-add-gangguan";

  const formMethods = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: initialValues,
    mode: "onSubmit",
  });

  const jenisPeralatan = formMethods.watch("jenis_peralatan");

  const onSubmit = (event?: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();

    formMethods.handleSubmit(async (values) => {
      //  TODO: handle submit
    })();
  };

  const onCloseModal = () => {
    closeModal();
    setFields([defaultValue]);
    setShowNextForm(false);
    // formMethods.reset({ ...initialValues });
  };

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
