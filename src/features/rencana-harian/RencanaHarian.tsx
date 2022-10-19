// ** React Imports
import { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import {
  Card,
  CardContent,
  Grid,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { StyledForm } from "src/components/form";
import PageHeader from "src/@core/components/page-header";
import { defaultColumns } from "./RencanaHarian.constant";
import { WrapperFilter } from "src/components/filter";
import { DatePicker } from "src/components/date-picker";
import { openModal, closeModal } from "src/state/modal";
import { ModalUpload } from "./modal";

const RencanaHarian = () => {
  const formMethods = useForm({
    // resolver: yupResolver(validationSchema),
    // defaultValues: initialValues,
    mode: "onChange",
  });

  const [pageSize, setPageSize] = useState<number>(10);

  const handleClose = () => {
    closeModal();
  };

  return (
    <>
      <ModalUpload handleClose={handleClose} />
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <PageHeader
            title={<Typography variant="h5">Rencana Harian</Typography>}
          />
        </Grid>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <WrapperFilter>
                <div style={{ display: "flex" }}>
                  <TextField
                    value=""
                    sx={{ mr: 6, mb: 2, width: "300px" }}
                    placeholder="Cari File"
                    onChange={(e) => null}
                  />

                  <FormProvider {...formMethods}>
                    <StyledForm noValidate>
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker label="Tanggal" name="tanggal" />
                      </LocalizationProvider>
                    </StyledForm>
                  </FormProvider>
                </div>

                <Button
                  sx={{ mb: 2 }}
                  onClick={() => openModal()}
                  variant="contained"
                >
                  Unggah Rencana Harian
                </Button>
              </WrapperFilter>
              <DataGrid
                autoHeight
                rows={[]}
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

export default RencanaHarian;
