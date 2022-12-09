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

import PageHeader from "src/@core/components/page-header";

import { defaultColumns } from "./Reaktor.constant";
import { CellType } from "./types";

import { ModalAddReaktor } from "./modal";
import { WrapperFilter } from "src/components/filter";

import { reaktorApi } from "src/api/reaktor";
import { openModal, closeModal, modal, reloadPage } from "src/state/modal";
import { useDebounce } from "src/hooks/useDebounce";

const Reaktor = () => {
  const modalSnapshot = useSnapshot(modal);

  const router = useRouter();
  const [limit, setLimit] = useState<number>(10);
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");

  const debouncedSearch = useDebounce(search, 500);

  const { getReaktorList, reaktorList, totalData, loading, deleteReaktor } =
    reaktorApi();

  const id = router.query.id as string;
  const path = router.pathname.split("/")[2];

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
          <IconButton onClick={() => openModal("modal-reaktor", row.id)}>
            <PencilOutline />
          </IconButton>
          <IconButton>
            <DeleteOutline onClick={() => onClickDelete(row.id)} />
          </IconButton>
        </Box>
      ),
    },
  ];

  const getReaktor = () => {
    if (debouncedSearch) {
      getReaktorList(id, { search, limit, page, path });
    } else {
      getReaktorList(id, { limit, page, path });
    }
  };

  useEffect(() => {
    getReaktor();
  }, [debouncedSearch, id, limit, page]);

  useEffect(() => {
    if (modalSnapshot.isReloadData) {
      getReaktor();
    }
  }, [modalSnapshot.isReloadData]);

  return (
    <>
      <ModalAddReaktor />
      <Grid container spacing={6}>
        {!id && (
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
                  value={search}
                  sx={{ mr: 6, mb: 2 }}
                  placeholder="Cari"
                  onChange={(e) => setSearch(e.target.value)}
                />

                <Button
                  sx={{ mb: 2 }}
                  onClick={() => openModal("modal-reaktor")}
                  variant="contained"
                >
                  Tambah Reaktor
                </Button>
              </WrapperFilter>
              <DataGrid
                autoHeight
                rowsPerPageOptions={[10, 20, 25, 50]}
                rows={reaktorList}
                columns={columns}
                pageSize={limit}
                loading={loading}
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

export default Reaktor;
