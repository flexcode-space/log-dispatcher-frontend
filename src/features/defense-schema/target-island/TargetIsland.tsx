import { useState, ChangeEvent } from "react";
import { Card, CardContent, Grid, TextField, Button } from "@mui/material";
import { DataGrid } from "src/components/table";
import Plus from "mdi-material-ui/Plus";
import DatePicker from "@mui/lab/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { openModal } from "src/state/modal";
import DownloadIcon from "src/assets/icons/download-icon.svg";
import { defaultColumns, dataMock } from "./TargetIsland.constant";
import ModalAddTargetIsland from "../modal/ModalAddTargetIsland";

import { WrapperFilter } from "src/components/filter";

const TargetIsland = () => {
  const [limit, setLimit] = useState<number>(10);
  const [page, setPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
      <ModalAddTargetIsland />
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <WrapperFilter sx={{ alignItems: "baseline" }}>
                <TextField
                  size="small"
                  value=""
                  sx={{ mr: 6, mb: 2 }}
                  placeholder="Cari"
                  // onChange={(e) => setSearch(e.target.value)}
                />

                <div style={{ display: "flex", gap: "10px" }}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      value={null}
                      label="Tanggal"
                      onChange={() => null}
                      renderInput={(params) => (
                        <TextField
                          size="small"
                          {...params}
                          sx={{ width: "160px" }}
                        />
                      )}
                    />
                  </LocalizationProvider>
                  <Button sx={{ mb: 2 }} variant="outlined">
                    <DownloadIcon />
                    Download Laporan
                  </Button>
                  <Button
                    sx={{ mb: 2 }}
                    variant="contained"
                    onClick={() => openModal()}
                  >
                    <Plus />
                    Tambah Target Island
                  </Button>
                </div>
              </WrapperFilter>
              <DataGrid
                autoHeight
                rowsPerPageOptions={[10, 20, 25, 50]}
                pageSize={limit}
                // loading={loading}
                rows={dataMock()}
                columns={defaultColumns}
                rowCount={10}
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

export default TargetIsland;
