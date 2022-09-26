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

import { defaultColumns } from "./Pembangkit.constant";
import { CellType } from "./types";

import { ModalAdd } from "./modal";
import { WrapperFilter } from "src/components/filter";
import { pembangkitApi } from "src/api/pembangkit";

const Pembangkit = () => {
  const router = useRouter();
  const [pageSize, setPageSize] = useState<number>(10);
  const [open, setOpen] = useState<boolean>(false);

  const { pembangkitList, getPembangkitList, getPembangkitBySubsistemId } =
    pembangkitApi();

  const handleClickOpen = () => setOpen(true);

  const subsistemId = router.query.id as string;

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
    if (subsistemId) {
      getPembangkitBySubsistemId(subsistemId);
    } else {
      getPembangkitList();
    }
  }, []);

  return (
    <>
      <ModalAdd open={open} handleClose={() => setOpen(!open)} />
      <Grid container spacing={6}>
        {!subsistemId && (
          <Grid item xs={12}>
            <PageHeader
              title={<Typography variant="h5">Pembangkit</Typography>}
            />
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
                  Tambah Pembangkit
                </Button>
              </WrapperFilter>
              <DataGrid
                autoHeight
                rows={pembangkitList}
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

export default Pembangkit;
