// ** React Imports
import { useEffect, useState, useContext } from "react";
import { useForm, FormProvider } from "react-hook-form";
import {
  Card,
  CardContent,
  Grid,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import { useSnapshot } from "valtio";
import { DataGrid } from "@mui/x-data-grid";
import { StyledForm } from "src/components/form";
import PageHeader from "src/@core/components/page-header";
import { SelectInput } from "src/components/select-input";
import { defaultColumns, tipeLaporanOptions } from "./UnggahLaporan.constant";
import { WrapperFilter } from "src/components/filter";
import { AbilityContext } from "src/layouts/components/acl/Can";
import { unggahLaporanApi } from "src/api/unggah-laporan";
import { openModal, closeModal, modal } from "src/state/modal";
import { useDebounce } from "src/hooks/useDebounce";
import { ModalUnggahLaporan } from "./modal";

const UnggahLaporan = () => {
  const ability = useContext(AbilityContext);

  const modalSnapshot = useSnapshot(modal);
  const formMethods = useForm({});
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

  useEffect(() => {
    if (modalSnapshot.isReloadData) {
      getUnggahLaporan();
    }
  }, [modalSnapshot.isReloadData]);

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

                {ability?.can("create", "beban-page") ? (
                  <Button
                    sx={{ mb: 2 }}
                    onClick={() => openModal()}
                    variant="contained"
                  >
                    Unggah Laporan
                  </Button>
                ) : null}
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
