import { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  TextField,
  Button,
  IconButton,
} from "@mui/material";
import { Pencil } from "mdi-material-ui";
import DatePickerMui from "@mui/lab/DatePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import PageHeader from "src/@core/components/page-header";
import { CardHeader } from "src/components/card";
import { WrapperFilter } from "src/components/filter";
import { DataGrid } from "src/components/table";
import { openModal } from "src/state/modal";

import {
  defaultColumns,
  datamock,
  listTable,
} from "./LaporanPekerjaan.constant";

export interface CellType {
  row: any;
}

const LaporanPekerjaan = () => {
  const [search, setSearch] = useState<string>("");

  const columns = [
    ...defaultColumns,
    {
      flex: 0.15,
      minWidth: 100,
      sortable: false,
      field: "actions",
      headerName: "Aksi",
      renderCell: ({ row }: CellType) => (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton onClick={() => null}>
            <Pencil />
          </IconButton>
        </Box>
      ),
    },
  ];

  return (
    <>
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
                  value={null}
                  label="Pilih Tanggal"
                  onChange={() => null}
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
                onClick={() => openModal()}
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
        {listTable.map((value) => (
          <Grid item xs={12} key={`document-${value.title}`}>
            <Card>
              <CardHeader title={value.title} />
              <CardContent>
                <DataGrid
                  hideFooter
                  autoHeight
                  columns={columns}
                  rows={datamock}
                />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default LaporanPekerjaan;
