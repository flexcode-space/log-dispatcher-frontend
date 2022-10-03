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

import { defaultColumns } from "./Reaktor.constant";
import { CellType } from "./types";

import { ModalAddReaktor } from "./modal";
import { WrapperFilter } from "src/components/filter";

import { reaktorApi } from "src/api/reaktor";
import { openModal, closeModal, modal, reloadPage } from "src/state/modal";

const Reaktor = () => {
  const modalSnapshot = useSnapshot(modal);

  const router = useRouter();
  const [pageSize, setPageSize] = useState<number>(10);

  const {
    getReaktorList,
    reaktorList,
    getReaktorBySubsistemId,
    deleteReaktor,
  } = reaktorApi();

  const subsistemId = router.query.id as string;

  const onClickDelete = async (id: string) => {
    await deleteReaktor({ id });
    reloadPage();
  };

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
          <IconButton onClick={() => openModal(row.id)}>
            <PencilOutline />
          </IconButton>
          <IconButton>
            <DeleteOutline onClick={() => onClickDelete(row.id)} />
          </IconButton>
        </Box>
      ),
    },
  ];

  const handleClose = () => {
    closeModal();
  };

  const getReaktor = () => {
    if (subsistemId) {
      getReaktorBySubsistemId(subsistemId);
    } else {
      getReaktorList();
    }
  };

  useEffect(() => {
    getReaktor();
  }, []);

  useEffect(() => {
    if (modalSnapshot.isReloadData) {
      getReaktor();
    }
  }, [modalSnapshot.isReloadData]);

  return (
    <>
      <ModalAddReaktor handleClose={handleClose} />
      <Grid container spacing={6}>
        {!subsistemId && (
          <Grid item xs={12}>
            <PageHeader title={<Typography variant="h5">Reaktor</Typography>} />
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
                  onClick={() => openModal()}
                  variant="contained"
                >
                  Tambah Reaktor
                </Button>
              </WrapperFilter>
              <DataGrid
                autoHeight
                rows={reaktorList}
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

export default Reaktor;
