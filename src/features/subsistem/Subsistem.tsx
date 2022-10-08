import { useEffect, useState } from "react";
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

// ** Custom Components Imports
import PageHeader from "src/@core/components/page-header";

import { defaultColumns } from "./subsistem.constant";
import { CellType } from "./types";

import { ModalAddSubsistem } from "./modal";
import { WrapperFilter } from "src/components/filter";

import { subsistemApi } from "src/api/subsistem";
import { useDebounce } from "src/hooks/useDebounce";
import { openModal, closeModal, modal, reloadPage } from "src/state/modal";

const Subsistem = () => {
  const modalSnapshot = useSnapshot(modal);
  const [limit, setLimit] = useState<number>(10);
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");

  const debouncedSearch = useDebounce(search, 500);

  const { subsistemList, getSubsistemList, loading, deleteSubsistem, total } =
    subsistemApi();

  const onClickDelete = async (id: string) => {
    await deleteSubsistem({ id });
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

  const getSubsistem = () => {
    if (debouncedSearch) {
      getSubsistemList({ search, limit, page });
    } else {
      getSubsistemList({ limit, page });
    }
  };

  useEffect(() => {
    getSubsistem();
  }, [debouncedSearch, limit, page]);

  useEffect(() => {
    if (modalSnapshot.isReloadData) {
      getSubsistem();
    }
  }, [modalSnapshot.isReloadData]);

  return (
    <>
      <ModalAddSubsistem handleClose={handleClose} />
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
                  Tambah Subsistem
                </Button>
              </WrapperFilter>
              <Box>
                <DataGrid
                  autoHeight
                  rowsPerPageOptions={[10, 20, 25, 50]}
                  pageSize={limit}
                  loading={loading}
                  rows={subsistemList}
                  columns={columns}
                  rowCount={total}
                  onPageSizeChange={(newPageSize) => setLimit(newPageSize)}
                  onPageChange={(currentPage) => setPage(currentPage + 1)}
                  paginationMode="server"
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default Subsistem;
