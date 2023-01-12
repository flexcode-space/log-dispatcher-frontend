import { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  CardContent,
  Grid,
  Card,
  Typography,
  Box,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Plus from "mdi-material-ui/Plus";
import { useSnapshot } from "valtio";
import { yupResolver } from "@hookform/resolvers/yup";
import { StyledForm } from "src/components/form";
import { closeModal, modal, reloadPage } from "src/state/modal";
import { InputField } from "src/components/input-field";
import { SelectInput } from "src/components/select-input";
import { jenisPembangkitColumns, datajenisPembangkit } from "./ModalPengaturanPembangkit.constant"
import { ibtApi } from "src/api/ibt";

import { pembangkitApi } from "src/api/pembangkit";
import { flip } from "@popperjs/core";
import { Centos } from "mdi-material-ui";
const defaultValue = {
  manuver: "",
};

type DefaultValueProps = {
  manuver: string;
}[];

const ModalPengaturanPembangkit = () => {
  const [fields, setFields] = useState<DefaultValueProps>([]);

  const modalSnapshot = useSnapshot(modal);

  const isOpen =
    modalSnapshot.isOpen && modalSnapshot.target === "modal-pengaturan-pembangkit";

  const JenisPembangkit = [
    ...jenisPembangkitColumns,
    {
      flex: 0.15,
      minWidth: 5,
      sortable: false,
      field: "",
    },
  ];

  const formMethods = useForm({

  });

  const onSubmit = (event?: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();


  };

  const onClickCloseModal = () => {
    closeModal();
    setFields([defaultValue]);
  };



  return (
    <Dialog
      open={isOpen}
      fullWidth
      onClose={onClickCloseModal}
      maxWidth="lg"
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
            <Box sx={{ mb: 8, width: 1000 }}>
              <Typography variant="h5" sx={{ mb: 3, lineHeight: "2rem" }}>
                Jenis Pembangkit
              </Typography>
              <DataGrid
                hideFooter
                autoHeight
                columns={JenisPembangkit}
                rows={datajenisPembangkit}
              />
            </Box>

            <Grid container spacing={1} mt={1} sx={{
              display: "flex", alignItems: "center",
            }}>
              {fields.map((value, index) => {
                return (
                  <>

                    <Grid item xs={12}>

                      <Typography
                        variant="subtitle1"
                        sx={{ fontWeight: "500", fontSize: "14px", pb: "8px" }}
                      >
                        {`Tambah Jenis Pembangkit`}
                      </Typography>
                    </Grid>

                    <Grid item xs={6}>
                      <InputField
                        label="Nama Jenis Pembangkit"
                        name={`manuver[${index}].value`}
                      />
                    </Grid>
                  </>
                );
              })}

              <Grid item xs={6}>
                {fields.map((value,) => {
                  return (
                    <>

                      <Button
                        variant="outlined"
                        sx={{ height: "40px", mb: 5, mr: 3, }}
                        onClick={() =>
                          setFields([])
                        }
                      >
                        batal
                      </Button>

                    </>
                  );
                })}
                <Button
                  variant="outlined"
                  sx={{ height: "40px", mb: 5, }}
                  onClick={() =>
                    setFields((prevState) => [...prevState, defaultValue])
                  }
                >
                  <Plus />
                  Tambah
                </Button>
              </Grid>
            </Grid>

          </DialogContent>
          <DialogActions className="dialog-actions-dense">
            <Button variant="contained" type="submit">
              Tutup
            </Button>
          </DialogActions>
        </StyledForm>
      </FormProvider>
    </Dialog>
  );
};

export default ModalPengaturanPembangkit;
