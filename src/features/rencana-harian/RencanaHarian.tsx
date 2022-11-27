// ** React Imports
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Grid,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import { DataGrid } from "src/components/table";
import { useSnapshot } from "valtio";
// import AdapterDateFns from "@mui/lab/AdapterDateFns";
// import LocalizationProvider from "@mui/lab/LocalizationProvider";
// import DatePicketMui from "@mui/lab/DatePicker";
import PageHeader from "src/@core/components/page-header";
import { defaultColumns } from "./RencanaHarian.constant";
import { WrapperFilter } from "src/components/filter";
import { rencanaHarianApi } from "src/api/rencana-harian";
import { openModal, closeModal, modal } from "src/state/modal";
import { useDebounce } from "src/hooks/useDebounce";
import { ModalUpload } from "./modal";

const RencanaHarian = () => {
  const modalSnapshot = useSnapshot(modal);
  
  const [limit, setLimit] = useState<number>(10);
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");

  const debouncedSearch = useDebounce(search, 500);

  const { getRencanaHarianList, rencanaHarianList, loading, totalData } =
    rencanaHarianApi();

  const handleClose = () => {
    closeModal();
  };

  const getRencanaHarian = () => {
    if (debouncedSearch) {
      getRencanaHarianList({ search, limit, page });
    } else {
      getRencanaHarianList({ limit, page });
    }
  };

  useEffect(() => {
    getRencanaHarian();
  }, [debouncedSearch, limit, page]);

  useEffect(() => {
    if (modalSnapshot.isReloadData) {
      getRencanaHarian();
    }
  }, [modalSnapshot.isReloadData]);

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
                    value={search}
                    size="small"
                    sx={{ mr: 6, mb: 2, width: "300px" }}
                    placeholder="Cari File"
                    onChange={(e) => setSearch(e.target.value)}
                  />

                  {/* <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicketMui
                      value={date}
                      inputFormat="dd/M/yyyy"
                      label="Pilih Tanggal"
                      onChange={(e) => setDate(e)}
                      renderInput={(params) => (
                        <TextField size="small" {...params} />
                      )}
                    />
                  </LocalizationProvider> */}
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
                rowsPerPageOptions={[10, 20, 25, 50]}
                pageSize={limit}
                loading={loading}
                rows={rencanaHarianList}
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

export default RencanaHarian;
