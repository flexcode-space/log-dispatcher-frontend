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
import { useSnapshot } from "valtio";
import { PencilOutline, DeleteOutline } from "mdi-material-ui";

import PageHeader from "src/@core/components/page-header";

import { defaultColumns } from "./Penghantar.constant";
import { CellType } from "./types";

import { ModalAddPenghantar } from "./modal";
import { WrapperFilter } from "src/components/filter";
import { penghantarApi } from "src/api/penghantar";
import { openModal, closeModal, modal, reloadPage } from "src/state/modal";
import { useDebounce } from "src/hooks/useDebounce";

const Penghantar = () => {
  const modalSnapshot = useSnapshot(modal);
  const router = useRouter();
  const [limit, setLimit] = useState<number>(10);
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");

  const debouncedSearch = useDebounce(search, 500);

  const {
    getPenghantarList,
    penghantarList,
    deletePenghantar,
    totalData,
    loading,
  } = penghantarApi();

  const id = router.query.id as string;
  const path = router.pathname.split("/")[2];

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
            <IconButton onClick={() => openModal("modal-penghantar", id)}>
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

  const getPenghantar = () => {
    if (debouncedSearch) {
      getPenghantarList(id, { search, limit, page, path });
    } else {
      getPenghantarList(id, { limit, page, path });
    }
  };

  useEffect(() => {
    getPenghantar();
  }, [debouncedSearch, id, limit, page]);

  useEffect(() => {
    if (modalSnapshot.isReloadData) {
      getPenghantar();
    }
  }, [modalSnapshot.isReloadData]);

  return (
    <>
      <ModalAddPenghantar />
      <Grid container spacing={6}>
        {!id && (
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
                  value={search}
                  sx={{ mr: 6, mb: 2 }}
                  placeholder="Cari"
                  onChange={(e) => setSearch(e.target.value)}
                />

                <Button
                  sx={{ mb: 2 }}
                  onClick={() => openModal("modal-penghantar")}
                  variant="contained"
                >
                  Tambah Penghantar
                </Button>
              </WrapperFilter>
              <DataGrid
                autoHeight
                rowsPerPageOptions={[10, 20, 25, 50]}
                rows={penghantarList}
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

export default Penghantar;
