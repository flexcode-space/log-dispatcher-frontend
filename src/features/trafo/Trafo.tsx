// ** React Imports
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
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

import { defaultColumns } from "./Trafo.constant";
import { CellType } from "./types";

import { ModalAdd } from "./modal";
import { WrapperFilter } from "src/components/filter";

import { trafoApi } from "src/api/trafo";

const Trafo = () => {
  const router = useRouter();
  const [pageSize, setPageSize] = useState<number>(10);
  const [open, setOpen] = useState<boolean>(false);

  const { getTrafoList, trafoList } = trafoApi();

  const handleClickOpen = () => setOpen(true);

  const isSubsistemPath = router.pathname === "/master-data/subsistem/[detail]";

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
            <PencilOutline />
          </IconButton>
          <IconButton>
            <DeleteOutline />
          </IconButton>
        </Box>
      ),
    },
  ];

  useEffect(() => {
    getTrafoList();
  }, []);

  return (
    <>
      <ModalAdd open={open} handleClose={() => setOpen(!open)} />
      <Grid container spacing={6}>
        {!isSubsistemPath && (
          <Grid item xs={12}>
            <PageHeader title={<Typography variant="h5">Trafo</Typography>} />
          </Grid>
        )}
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
                  Tambah Trafo
                </Button>
              </WrapperFilter>
              <DataGrid
                autoHeight
                rows={trafoList}
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

export default Trafo;
