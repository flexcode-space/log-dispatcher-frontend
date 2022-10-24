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
  Select,
  MenuItem,
  InputLabel,
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
import { useDebounce } from "src/hooks/useDebounce";
import { ModalUnggahLaporan } from "./modal";

const UnggahLaporan = () => {
  const modalSnapshot = useSnapshot(modal);

  const formMethods = useForm({});

  const router = useRouter();
  const [limit, setLimit] = useState<number>(10);
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");

  const debouncedSearch = useDebounce(search, 500);

  const tipe = formMethods.watch("tipe");

  const { getUnggahLaporanList, unggahLaporanList, loading, totalData } =
    unggahLaporanApi();

  const handleClose = () => {
    closeModal();
  };

  const getUnggahLaporan = () => {
    if (debouncedSearch) {
      getUnggahLaporanList({ search, tipe, limit, page });
    } else {
      getUnggahLaporanList({ limit, tipe, page });
    }
  };

  useEffect(() => {
    getUnggahLaporan();
  }, [debouncedSearch, limit, page, tipe]);

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
                    value={search}
                    sx={{ mr: 6, mb: 2 }}
                    placeholder="Cari File"
                    onChange={(e) => setSearch(e.target.value)}
                  />

                  <FormProvider {...formMethods}>
                    <StyledForm noValidate>
                      <SelectInput
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
                rowsPerPageOptions={[10, 20, 25, 50]}
                pageSize={limit}
                loading={loading}
                rows={unggahLaporanList}
                columns={defaultColumns}
                rowCount={totalData}
                onPageSizeChange={(newPageSize) => setLimit(newPageSize)}
                onPageChange={(currentPage) => setPage(currentPage + 1)}
                paginationMode="server"
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default UnggahLaporan;
