import {
  Box,
  Card,
  CardContent,
  Grid,
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  Typography,
  TextField,
  Button,
  IconButton,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline, EyeOutline, Download } from "mdi-material-ui";

import PageHeader from "src/@core/components/page-header";
import { CardHeader } from "src/components/card";

import { defaultColumns, datamock, listTable } from "./Document.constant";

export interface CellType {
  row: any;
}

const Document = () => {
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
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <PageHeader
          title={
            <Typography variant="h5">Informasi Dokumen Terkendali</Typography>
          }
        />
      </Grid>
      <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end'}}>
        <Button sx={{ mb: 2 }} onClick={() => null} variant="contained">
          Unggah Dokumen
        </Button>
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
  );
};

export default Document;
