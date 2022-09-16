// ** React Imports
import { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Grid,
  IconButton,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { PencilOutline, DeleteOutline } from "mdi-material-ui";

// ** Custom Components Imports
import PageHeader from "src/@core/components/page-header";

import { defaultColumns, DATA } from "./subsistem.constant";
import { CellType } from "./types";

import { ModalAddSubsistem } from "./modal";
import { WrapperFilter } from "src/components/filter";

const PermissionsTable = () => {
  const [pageSize, setPageSize] = useState<number>(10);
  const [open, setOpen] = useState<boolean>(false);

  const handleClickOpen = () => setOpen(true);

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

  return (
    <>
      <ModalAddSubsistem open={open} />
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <PageHeader title={<Typography variant="h5">Subsistem</Typography>} />
        </Grid>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <WrapperFilter>
                <TextField
                  size="small"
                  value=""
                  sx={{ mr: 6, mb: 2 }}
                  placeholder="Cari"
                  onChange={(e) => null}
                />

                <Button
                  sx={{ mb: 2 }}
                  onClick={handleClickOpen}
                  variant="contained"
                >
                  Tambah Subsistem
                </Button>
              </WrapperFilter>
              <DataGrid
                // checkboxSelection
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
