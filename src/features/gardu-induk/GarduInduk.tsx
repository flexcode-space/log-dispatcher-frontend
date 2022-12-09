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
import { DataGrid } from "src/components/table";
import { PencilOutline, DeleteOutline } from "mdi-material-ui";
import { useSnapshot } from "valtio";

// ** Custom Components Imports
import PageHeader from "src/@core/components/page-header";

import { defaultColumns } from "./GarduInduk.constant";
import { CellType } from "./types";

import { ModalAddGarduInduk } from "./modal";
import ModallAddUPT from "./modal/ModalAddUPT";
import { WrapperFilter } from "src/components/filter";

import { garduIndukApi } from "src/api/gardu-induk";
import { useDebounce } from "src/hooks/useDebounce";
import { openModal, closeModal, modal, reloadPage } from "src/state/modal";

const GarduInduk = () => {
  const modalSnapshot = useSnapshot(modal);
  const [limit, setLimit] = useState<number>(10);
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");

  const debouncedSearch = useDebounce(search, 500);

  const {
    garduIndukList,
    getGarduIndukList,
    loading,
    deleteGarduInduk,
    totalData,
  } = garduIndukApi();

  const onClickDelete = async (id: string) => {
    await deleteGarduInduk({ id });
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
          <IconButton onClick={() => openModal("modal-gardu-induk", row.id)}>
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
      getGarduIndukList({ search, limit, page });
    } else {
      getGarduIndukList({ limit, page });
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
      <ModalAddGarduInduk handleClose={handleClose} />
      <ModallAddUPT />
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <PageHeader
            title={<Typography variant="h5">Gardu Induk</Typography>}
          />
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

                <div style={{ display: "flex", gap: "10px" }}>
                  <Button
                    sx={{ mb: 2 }}
                    onClick={() => openModal("modal-upt")}
                    variant="outlined"
                  >
                    Tambah UPT
                  </Button>
                  <Button
                    sx={{ mb: 2 }}
                    onClick={() => openModal("modal-add-gardu-induk")}
                    variant="contained"
                  >
                    Tambah Gardu Induk
                  </Button>
                </div>
              </WrapperFilter>
              <Box>
                <DataGrid
                  autoHeight
                  rowsPerPageOptions={[10, 20, 25, 50]}
                  pageSize={limit}
                  loading={loading}
                  rows={garduIndukList}
                  columns={columns}
                  rowCount={totalData}
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

export default GarduInduk;
