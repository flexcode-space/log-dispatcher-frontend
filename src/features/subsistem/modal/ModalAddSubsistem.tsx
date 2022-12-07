import { useState, useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  Grid,
} from "@mui/material";
import Plus from "mdi-material-ui/Plus";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSnapshot } from "valtio";
import { StyledForm } from "../Subsistem.styled";
import { OutlinedInputField } from "src/components/input-field";
import { modal, reloadPage } from "src/state/modal";
import { subsistemApi } from "src/api/subsistem";

import IconButton from "@mui/material/IconButton";
import Close from "mdi-material-ui/Close";
import { validationSchema, initialValues } from "./ModalAddSubsistem.constant";

type ModalAddSubsistemProps = {
  handleClose: () => void;
};

const defaultValue = {
  nama: "",
};

type DefaultValueProps = {
  nama: string;
}[];

const ModalAddSubsistem = ({ handleClose }: ModalAddSubsistemProps) => {
  const modalSnapshot = useSnapshot(modal);

  const { createSubsistem, updateSubsistem, getSubsistemDetail } =
    subsistemApi();

  const [fields, setFields] = useState<DefaultValueProps>([defaultValue]);

  const formMethods = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: initialValues,
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const onResetModal = () => {
    handleClose();
    setFields([defaultValue]);
    formMethods.reset({ ...initialValues });
  };

  const onClickCloseModal = () => {
    onResetModal();
  };

  const onClickRemove = (index: number) => {
    let newState = [...fields];
    newState.splice(index, 1);
    setFields(newState);
  };

  const onSubmit = (event?: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();

    formMethods.handleSubmit(async (values) => {
      const data: Array<string> = [];
      values.subsistem.forEach((value) => {
        if (value.nama) {
          data.push(value.nama);
        }
      });

      if (modalSnapshot.id) {
        await updateSubsistem({ nama: data[0], id: modalSnapshot.id });
      } else {
        await createSubsistem({ nama: data });
      }

      reloadPage();
      onResetModal();
    })();
  };

  useEffect(() => {
    if (modalSnapshot.id) {
      getSubsistemDetail(modalSnapshot.id).then((data: any) => {
        const { nama } = data;
        formMethods.reset({
          subsistem: [
            {
              nama,
            },
          ],
        });
      });
    }
  }, [modalSnapshot.id]);

  return (
    <Dialog
      open={modalSnapshot.isOpen}
      fullWidth
      onClose={onClickCloseModal}
      maxWidth="sm"
      scroll="body"
    >
      <FormProvider {...formMethods}>
        <StyledForm noValidate onSubmit={onSubmit}>
          <DialogTitle id="max-width-dialog-title">
            Tambah Subsistem
          </DialogTitle>
          <DialogContent>
            <Grid container spacing={1} mt={1}>
              {fields.map((value, index) => {
                return (
                  <Grid key={`subsistem_${index}`} item xs={12} sm={12}>
                    <OutlinedInputField
                      name={`subsistem[${index}].nama`}
                      label={`Nama Subsistem ${index + 1}`}
                      Icon={
                        !modalSnapshot.id &&
                        fields.length > 1 && (
                          <IconButton
                            edge="end"
                            onMouseDown={(e) => e.preventDefault()}
                            onClick={() => onClickRemove(index)}
                          >
                            <Close />
                          </IconButton>
                        )
                      }
                    />
                  </Grid>
                );
              })}
              <Grid item xs={12} sm={12}>
                {!modalSnapshot.id && (
                  <Button
                    style={{ height: "30px" }}
                    sx={{ mb: 2 }}
                    onClick={() =>
                      setFields((prevState) => [...prevState, defaultValue])
                    }
                    variant="outlined"
                  >
                    <Plus sx={{ mr: 1 }} />
                    Tambah Subsistem
                  </Button>
                )}
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

export default ModalAddSubsistem;
