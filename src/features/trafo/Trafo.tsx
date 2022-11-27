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
import { DataGrid } from "src/components/table";
import { PencilOutline, DeleteOutline } from "mdi-material-ui";
import { useSnapshot } from "valtio";

// ** Custom Components Imports
import PageHeader from "src/@core/components/page-header";

import { defaultColumns } from "./Trafo.constant";
import { CellType } from "./types";

import { ModalAddTrafo } from "./modal";
import { WrapperFilter } from "src/components/filter";

import { trafoApi } from "src/api/trafo";
import { openModal, closeModal, modal, reloadPage } from "src/state/modal";
import { useDebounce } from "src/hooks/useDebounce";

const Trafo = () => {
  const modalSnapshot = useSnapshot(modal);

  const router = useRouter();
  const [limit, setLimit] = useState<number>(10);
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");

  const debouncedSearch = useDebounce(search, 500);

  const { getTrafoList, trafoList, totalData, loading, deleteTrafo } =
    trafoApi();

  const onClickDelete = async (id: string) => {
    await deleteTrafo({ id });
    reloadPage();
  };

  const id = router.query.id as string;
  const path = router.pathname.split("/")[2];

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

  const getTrafo = () => {
    if (debouncedSearch) {
      getTrafoList(id, { search, limit, page, path });
    } else {
      getTrafoList(id, { limit, page, path });
    }
  };

  useEffect(() => {
    getTrafo();
  }, [debouncedSearch, id, limit, page]);

  useEffect(() => {
    if (modalSnapshot.isReloadData) {
      getTrafo();
    }
  }, [modalSnapshot.isReloadData]);

  return (
    <>
      <ModalAddTrafo handleClose={handleClose} />
      <Grid container spacing={6}>
        {!id && (
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
                  value={search}
                  sx={{ mr: 6, mb: 2 }}
                  placeholder="Cari"
                  onChange={(e) => setSearch(e.target.value)}
                />

                <Button
                  sx={{ mb: 2 }}
                  onClick={() => openModal()}
                  variant="contained"
                >
                  Tambah Trafo
                </Button>
              </WrapperFilter>
              <DataGrid
                autoHeight
                rowsPerPageOptions={[10, 20, 25, 50]}
                rows={trafoList}
                columns={columns}
                pageSize={limit}
                rowCount={totalData}
                onPageSizeChange={(newPageSize) => setLimit(newPageSize)}
                onPageChange={(currentPage) => setPage(currentPage + 1)}
                paginationMode="server"
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default Trafo;
