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
import { DeleteOutline, EyeOutline, Download } from "mdi-material-ui";
import DatePickerMui from "@mui/lab/DatePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import PageHeader from "src/@core/components/page-header";
import { CardHeader } from "src/components/card";
import { WrapperFilter } from "src/components/filter";
import { DataGrid } from "src/components/table";
import { openModal } from "src/state/modal";

import { defaultColumns, datamock, listTable } from "./Document.constant";
import ModalAddDocument from "./modal/ModalAddDocument";

export interface CellType {
  row: any;
}

const Document = () => {
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
            <EyeOutline />
          </IconButton>
          <IconButton onClick={() => null}>
            <Download />
          </IconButton>
          <IconButton>
            <DeleteOutline onClick={() => null} />
          </IconButton>
        </Box>
      ),
    },
  ];

  return (
    <>
      <ModalAddDocument />
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <PageHeader
            title={
              <Typography variant="h5">Informasi Dokumen Terkendali</Typography>
            }
          />
        </Grid>
        <Grid item xs={12}>
          <WrapperFilter>
            <TextField
              size="small"
              value={search}
              sx={{ mr: 6, mb: 2, bgcolor: "#fff" }}
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
                variant="contained"
              >
                Unggah Dokumen
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

export default Document;
