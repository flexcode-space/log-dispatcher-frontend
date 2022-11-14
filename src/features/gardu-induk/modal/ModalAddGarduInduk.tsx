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
import { StyledForm } from "../GarduInduk.styled";
import { OutlinedInputField } from "src/components/input-field";
import { modal, reloadPage } from "src/state/modal";
import { SelectInput } from "src/components/select-input";
import { garduIndukApi } from "src/api/gardu-induk";
import { uptApi } from "src/api/upt";

import IconButton from "@mui/material/IconButton";
import Close from "mdi-material-ui/Close";
import { validationSchema, initialValues } from "./ModalAddGarduInduk.constant";
import { AutoComplete } from "src/components/autocomplete";

type ModalAddGarduIndukProps = {
  handleClose: () => void;
};

const defaultValue = {
  nama: "",
};

type DefaultValueProps = {
  nama: string;
}[];

const ModalAddGarduInduk = ({ handleClose }: ModalAddGarduIndukProps) => {
  const modalSnapshot = useSnapshot(modal);

  const { createGarduInduk, updateGarduInduk, getGarduIndukDetail } =
    garduIndukApi();
  const { getUPTList, uptList } = uptApi();

  const uptOptions = uptList.map(({ id, nama }) => ({
    value: id,
    label: nama,
  }));

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
      const payload: Array<{ upt_id: string; nama: string }> = [];
      values.gardu_induk.forEach((value) => {
        if (value.nama) {
          payload.push({
            nama: value.nama,
            upt_id: values.upt_id,
          });
        }
      });

      if (modalSnapshot.id) {
        await updateGarduInduk({
          ...payload[0],
          id: modalSnapshot.id,
        });
      } else {
        await createGarduInduk(payload);
      }

      reloadPage();
      onResetModal();
    })();
  };

  useEffect(() => {
    if (modal.isOpen) {
      getUPTList();
    }
  }, [modal.isOpen]);

  useEffect(() => {
    if (modalSnapshot.id) {
      getGarduIndukDetail(modalSnapshot.id).then((data: any) => {
        const { nama, upt } = data;

        formMethods.reset({
          upt_id: upt.id,
          gardu_induk: [
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
            Tambah Gardu Induk
          </DialogTitle>
          <DialogContent>
            <Grid container spacing={1} mt={1}>
              <Grid item xs={12} sm={12}>
                <SelectInput label="UPT" name="upt_id" options={uptOptions} />
              </Grid>
              {fields.map((value, index: number) => {
                return (
                  <Grid key={`gardu_induk_${index}`} item xs={12} sm={12}>
                    <OutlinedInputField
                      name={`gardu_induk[${index}].nama`}
                      label={`Gardu Induk ${index + 1}`}
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
                    Tambah Gardu Induk Lain
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

export default ModalAddGarduInduk;
