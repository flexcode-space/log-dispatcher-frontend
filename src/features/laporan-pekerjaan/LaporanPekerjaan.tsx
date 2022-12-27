import { useEffect, useState } from "react";
import { Grid, Typography, TextField, Button } from "@mui/material";
// import { DataGrid, gridClasses } from "@mui/x-data-grid";
import DatePickerMui from "@mui/lab/DatePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import PageHeader from "src/@core/components/page-header";
import { WrapperFilter } from "src/components/filter";
import { openModal } from "src/state/modal";
import { TableLaporan, TableLain } from "./table-laporan";

import { laporanPekerjaanList } from "./LaporanPekerjaan.constant";
import { ModalAdd } from "./modal";
import dayjs, { Dayjs } from "dayjs";

const LaporanPekerjaan = () => {
  const [search, setSearch] = useState<string>("");
  const [date, setDate] = useState<Dayjs | null>(null);

  const filterDate = date ? dayjs(date).format("YYYY-MM-DD") : "";

  return (
    <>
      <ModalAdd />
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <WrapperFilter>
            <Grid item xs={4}>
              <PageHeader
                title={<Typography variant="h5">Laporan Pekerjaan</Typography>}
              />
            </Grid>
            <div style={{ display: "flex", gap: "10px" }}>
              <TextField
                size="small"
                value={search}
                sx={{ mb: 2 }}
                placeholder="Cari"
                onChange={(e) => setSearch(e.target.value)}
              />
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePickerMui
                  value={date}
                  label="Pilih Tanggal"
                  inputFormat="dd/M/yyyy"
                  onChange={setDate}
                  renderInput={(params) => (
                    <TextField
                      size="small"
                      {...params}
                      sx={{ width: "200px" }}
                    />
                  )}
                />
              </LocalizationProvider>
              <Button
                sx={{ mb: 2 }}
                onClick={() => openModal("modal-laporan-pekerjaan")}
                variant="outlined"
              >
                Tambah Data
              </Button>
              <Button
                sx={{ mb: 2 }}
                onClick={() => openModal()}
                variant="contained"
              >
                Generate Laporan
              </Button>
            </div>
          </WrapperFilter>
        </Grid>
        {laporanPekerjaanList.map((value, index) =>
          value.type !== "lain" ? (
            <TableLaporan
              key={`table-${index}`}
              title={value.title}
              type={value.type}
              filter={{ date: filterDate }}
            />
          ) : (
            <TableLain filter={{ date: filterDate }} />
          )
        )}
      </Grid>
    </>
  );
};

export default LaporanPekerjaan;
