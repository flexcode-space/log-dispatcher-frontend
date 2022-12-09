import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Grid,
  Typography,
  TextField,
  Button,
  IconButton,
  Box,
} from "@mui/material";
import { DataGrid } from "src/components/table";
import { PencilOutline, EyeOutline } from "mdi-material-ui";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicketMui from "@mui/lab/DatePicker";
import PageHeader from "src/@core/components/page-header";
import FilterIcon from "src/assets/icons/filter-green-icon.svg";

import { CardHeader } from "src/components/card";
import { openModal, closeModal } from "src/state/modal";
import { ModalEdit } from "./modal";
import { defaultColumns } from "./EnergizePeralatan.constant";
import { energizePeralatanApi } from "src/api/energize-peralatan";

const EnergizePeralatan = () => {
  const { getEnergizePeralatanList, energizePeralatanList } =
    energizePeralatanApi();

  const columns = [
    ...defaultColumns,
    {
      flex: 0.15,
      minWidth: 100,
      sortable: false,
      field: "actions",
      headerName: "Aksi",
      renderCell: () => {
        return (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton onClick={() => openModal("modal-energize-peralatan")}>
              <PencilOutline />
            </IconButton>
            <IconButton onClick={() => null}>
              <EyeOutline />
            </IconButton>
          </Box>
        );
      },
    },
  ];

  useEffect(() => {
    getEnergizePeralatanList();
  }, []);

  return (
    <>
      <ModalEdit />
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <PageHeader
            title={<Typography variant="h5">Energize Peralatan</Typography>}
          />
        </Grid>
        <Grid item xs={12}>
          <Card>
            <CardHeader
              title={
                <TextField
                  size="small"
                  value=""
                  sx={{ mr: 6, mb: 2, bgcolor: "#ffffff" }}
                  placeholder="Cari"
                  // onChange={(e) => setSearch(e.target.value)}
                />
              }
              action={
                <>
                  <div style={{ display: "flex", gap: "10px" }}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicketMui
                        value={new Date()}
                        label="Pilih Tanggal"
                        onChange={() => null}
                        renderInput={(params) => (
                          <TextField
                            size="small"
                            {...params}
                            sx={{ bgcolor: "#ffffff" }}
                          />
                        )}
                      />
                    </LocalizationProvider>
                    <Button sx={{ mb: 2 }} variant="outlined">
                      <FilterIcon />
                      Filter
                    </Button>
                    <Button
                      sx={{ mb: 2 }}
                      variant="contained"
                      onClick={() => openModal("modal-energize-peralatan")}
                    >
                      Tambah Data
                    </Button>
                  </div>
                </>
              }
            ></CardHeader>
            <CardContent>
              <DataGrid
                autoHeight
                rows={energizePeralatanList}
                columns={columns}
                hideFooter
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default EnergizePeralatan;
