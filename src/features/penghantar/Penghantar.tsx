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
import { useSnapshot } from "valtio";
import { PencilOutline, DeleteOutline } from "mdi-material-ui";

// ** Custom Components Imports
import PageHeader from "src/@core/components/page-header";

import { defaultColumns } from "./Penghantar.constant";
import { CellType } from "./types";

import { ModalAddPenghantar } from "./modal";
import { WrapperFilter } from "src/components/filter";
import { penghantarApi } from "src/api/penghantar";
import { openModal, closeModal, modal, reloadPage } from "src/state/modal";

const Penghantar = () => {
  const modalSnapshot = useSnapshot(modal);
  const router = useRouter();
  const [pageSize, setPageSize] = useState<number>(10);
  const [open, setOpen] = useState<boolean>(false);

  const {
    getPenghantarList,
    penghantarList,
    getPenghantarBySubsistemId,
    deletePenghantar,
  } = penghantarApi();

  const subsistemId = router.query.id as string;

  const onClickDelete = async (id: string) => {
    await deletePenghantar({ id });
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
      renderCell: ({ row }: CellType) => {
        const { id } = row;
        return (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton onClick={() => openModal(id)}>
              <PencilOutline />
            </IconButton>
            <IconButton>
              <DeleteOutline onClick={() => onClickDelete(id)} />
            </IconButton>
          </Box>
        );
      },
    },
  ];

  const handleClose = () => {
    closeModal();
  };

  const getPenghantar = () => {
    if (subsistemId) {
      getPenghantarBySubsistemId(subsistemId);
    } else {
      getPenghantarList();
    }
  };

  useEffect(() => {
    getPenghantar();
  }, []);

  useEffect(() => {
    if (modalSnapshot.isReloadData) {
      getPenghantar();
    }
  }, [modalSnapshot.isReloadData]);

  return (
    <>
      <ModalAddPenghantar handleClose={handleClose} />
      <Grid container spacing={6}>
        {!subsistemId && (
          <Grid item xs={12}>
            <PageHeader
              title={<Typography variant="h5">Penghantar</Typography>}
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
                  onClick={() => openModal()}
                  variant="contained"
                >
                  Tambah Penghantar
                </Button>
              </WrapperFilter>
              <DataGrid
                autoHeight
                rows={penghantarList}
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

export default Penghantar;
