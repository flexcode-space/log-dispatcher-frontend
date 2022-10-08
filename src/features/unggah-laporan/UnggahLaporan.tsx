// ** React Imports
import { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useRouter } from "next/router";
import {
  Card,
  CardContent,
  Grid,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useSnapshot } from "valtio";
import { StyledForm } from "src/components/form";
import PageHeader from "src/@core/components/page-header";
import { SelectInput } from "src/components/select-input";
import { defaultColumns, tipeLaporanOptions } from "./UnggahLaporan.constant";
import { WrapperFilter } from "src/components/filter";

import { unggahLaporanApi } from "src/api/unggah-laporan";
import { openModal, closeModal, modal, reloadPage } from "src/state/modal";
import { ModalUnggahLaporan } from "./modal";

const UnggahLaporan = () => {
  const modalSnapshot = useSnapshot(modal);

  const formMethods = useForm({
    // resolver: yupResolver(validationSchema),
    // defaultValues: initialValues,
    mode: "onChange",
  });

  const router = useRouter();
  const [pageSize, setPageSize] = useState<number>(10);

  const { getUnggahLaporanList, unggahLaporanList } = unggahLaporanApi();

  const handleClose = () => {
    closeModal();
  };

  useEffect(() => {
    getUnggahLaporanList();
  }, []);

  return (
    <>
      <ModalUnggahLaporan handleClose={handleClose} />
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <PageHeader
            title={
              <Typography variant="h5">Unggah Data Scada & AMR</Typography>
            }
          />
        </Grid>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <WrapperFilter>
                <div style={{ display: "flex" }}>
                  <TextField
                    size="small"
                    value=""
                    sx={{ mr: 6, mb: 2 }}
                    placeholder="Cari File"
                    onChange={(e) => null}
                  />

                  <FormProvider {...formMethods}>
                    <StyledForm noValidate>
                      <SelectInput
                        size="small"
                        label="Tipe laporan"
                        name="tipe"
                        options={tipeLaporanOptions}
                      />
                    </StyledForm>
                  </FormProvider>
                </div>

                <Button
                  sx={{ mb: 2 }}
                  onClick={() => openModal()}
                  variant="contained"
                >
                  Unggah Laporan
                </Button>
              </WrapperFilter>
              <DataGrid
                autoHeight
                rows={unggahLaporanList}
                columns={defaultColumns}
                pageSize={pageSize}
                disableSelectionOnClick
                rowsPerPageOptions={[10, 25, 50]}
                onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                sx={{ "& .MuiDataGrid-columnHeaders": { borderRadius: 0 } }}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default UnggahLaporan;
