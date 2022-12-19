import { useState, useCallback, useMemo } from "react";
import { GridColumns } from "@mui/x-data-grid";
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
import { WrapperFilter } from "src/components/filter";
import { DataGrid } from "@mui/x-data-grid";
import { openModal } from "src/state/modal";
import ModalAddData from "./modal/ModalAddData";

import { defaultColumns, datamock } from "./Batubara.constant";

const Batubara = () => {
  const [search, setSearch] = useState<string>("");

  const columns = [
    ...defaultColumns,
    {
      flex: 0.15,
      minWidth: 100,
      sortable: false,
      field: "actions",
      headerName: "Aksi",
      renderCell: () => (
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
      <ModalAddData />
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <PageHeader title={<Typography variant="h5">Batubara</Typography>} />
        </Grid>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <WrapperFilter>
                <TextField
                  size="small"
                  value={search}
                  sx={{ mr: 6, mb: 2 }}
                  placeholder="Cari"
                  onChange={(e) => setSearch(e.target.value)}
                />
                <div style={{ display: "flex", gap: "10px" }}>
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
                </div>
              </WrapperFilter>
              <DataGrid
                hideFooter
                autoHeight
                columns={columns}
                rows={datamock}
              />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <PageHeader title={<Typography variant="h5">HSD - MFO</Typography>} />
        </Grid>

        <Grid item xs={12}>
          <Card>
            <CardContent>
              <WrapperFilter>
                <TextField
                  size="small"
                  value={search}
                  sx={{ mr: 6, mb: 2 }}
                  placeholder="Cari"
                  onChange={(e) => setSearch(e.target.value)}
                />
                <div style={{ display: "flex", gap: "10px" }}>
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
                    onClick={() => null}
                    variant="outlined"
                  >
                    Tambah Data
                  </Button>
                </div>
              </WrapperFilter>
              <DataGrid
                hideFooter
                autoHeight
                columns={columns}
                rows={datamock}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default Batubara;
