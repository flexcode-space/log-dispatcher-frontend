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
import { useSnapshot } from "valtio";

import PageHeader from "src/@core/components/page-header";

import { defaultColumns } from "./IBT.constant";
import { CellType } from "./types";

import { ModalAddIBT } from "./modal";
import { WrapperFilter } from "src/components/filter";
import { ibtApi } from "src/api/ibt";
import { openModal, closeModal, modal, reloadPage } from "src/state/modal";

const IBT = () => {
  const modalSnapshot = useSnapshot(modal);
  const router = useRouter();
  const [pageSize, setPageSize] = useState<number>(10);
  const [open, setOpen] = useState<boolean>(false);

  const { getIbtList, ibtList, getIbtBySubsistemId } = ibtApi();

  const subsistemId = router.query.id as string;

  const handleClickOpen = () => setOpen(true);

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

  const getIbt = () => {
    if (subsistemId) {
      getIbtBySubsistemId(subsistemId);
    } else {
      getIbtList();
    }
  };

  useEffect(() => {
    getIbt();
  }, []);

  useEffect(() => {
    if (modalSnapshot.isReloadData) {
      getIbt();
    }
  }, [modalSnapshot.isReloadData]);

  return (
    <>
      <ModalAddIBT open={open} handleClose={() => setOpen(!open)} />
      <Grid container spacing={6}>
        {!subsistemId && (
          <Grid item xs={12}>
            <PageHeader title={<Typography variant="h5">IBT</Typography>} />
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
                  Tambah IBT
                </Button>
              </WrapperFilter>
              <DataGrid
                autoHeight
                rows={ibtList}
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

export default IBT;
