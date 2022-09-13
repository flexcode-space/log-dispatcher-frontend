// ** React Imports
import { useState } from "react";

// ** MUI Imports
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import { DataGrid } from "@mui/x-data-grid";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

// ** Icons Imports
import PencilOutline from "mdi-material-ui/PencilOutline";
import DeleteOutline from "mdi-material-ui/DeleteOutline";

// ** Custom Components Imports
import PageHeader from "src/@core/components/page-header";

// ** Types
import { ThemeColor } from "src/@core/layouts/types";

interface Colors {
  [key: string]: ThemeColor;
}

interface CellType {
  row: any;
}

const defaultColumns = [
  {
    flex: 0.25,
    field: "name",
    minWidth: 240,
    headerName: "Id Subsistem",
    renderCell: ({ row }: CellType) => <Typography>{row.name}</Typography>,
  },
  {
    flex: 0.35,
    minWidth: 280,
    field: "assignedTo",
    headerName: "Nama Subsistem",
    renderCell: ({ row }: CellType) => (
      <Typography>{row.assignedTo}</Typography>
    ),
  },
  {
    flex: 0.25,
    minWidth: 215,
    field: "createdDate",
    headerName: "Jumlah Gardu Induk",
    renderCell: ({ row }: CellType) => (
      <Typography variant="body2">{row.createdDate}</Typography>
    ),
  },
];

const PermissionsTable = () => {
  const [pageSize, setPageSize] = useState<number>(10);

  const columns = [
    ...defaultColumns,
    {
      flex: 0.15,
      minWidth: 115,
      sortable: false,
      field: "actions",
      headerName: "Aksi",
      renderCell: ({ row }: CellType) => (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton onClick={() => null}>
            <PencilOutline />
          </IconButton>
          <IconButton>
            <DeleteOutline />
          </IconButton>
        </Box>
      ),
    },
  ];

  const DATA = [
    {
      id: 1,
      name: "231423423",
      assignedTo: "Ungaran",
      createdDate: "8",
    },
  ];

  return (
    <>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <PageHeader title={<Typography variant="h5">Subsistem</Typography>} />
        </Grid>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <TextField
                  size="small"
                  value=""
                  sx={{ mr: 6, mb: 2 }}
                  placeholder="Cari"
                  onChange={(e) => null}
                />

                <Button sx={{ mb: 2 }} onClick={() => null} variant="contained">
                  Tambah Subsistem
                </Button>
              </Box>
              <DataGrid
                checkboxSelection
                autoHeight
                rows={DATA}
                columns={columns}
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

export default PermissionsTable;
