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

import { defaultColumns } from "./Pembangkit.constant";
import { CellType } from "./types";

import { ModalAddPembangkit } from "./modal";
import { WrapperFilter } from "src/components/filter";
import { pembangkitApi } from "src/api/pembangkit";
import { openModal, closeModal, modal, reloadPage } from "src/state/modal";
import { useDebounce } from "src/hooks/useDebounce";
import { ModalDelete } from "src/components/modal";
import { MenuMore } from "src/components/menu-more";
import { ModalKoefisien } from "./modal/modal-koefisien";

const Pembangkit = () => {
  const modalSnapshot = useSnapshot(modal);

  const router = useRouter();
  const [limit, setLimit] = useState<number>(10);
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");

  const debouncedSearch = useDebounce(search, 500);

  const {
    pembangkitList,
    loading,
    totalData,
    getPembangkitList,
    deletePembangkit,
  } = pembangkitApi();

  const onClickDelete = async () => {
    await deletePembangkit({ id: modalSnapshot.id });
    reloadPage();
  };

  const id = router.query.id as string;
  const path = router.pathname.split("/")[2];

  const columns = [
    ...defaultColumns,
    {
      flex: 0.15,
      minWidth: 130,
      sortable: false,
      field: "actions",
      headerName: "Aksi",
      renderCell: ({ row }: CellType) => {
        const { id } = row;
        return (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton onClick={() => openModal("modal-pembangkit", id)}>
              <PencilOutline />
            </IconButton>
            <IconButton>
              <DeleteOutline
                onClick={() => openModal("modal-delete", row.id)}
              />
            </IconButton>
            <MenuMore
              onClickKoefisien={() => openModal("modal-koefisien", row.id)}
            />
          </Box>
        );
      },
    },
  ];

  const getPembangkit = () => {
    if (debouncedSearch) {
      getPembangkitList(id, { search, limit, page, path });
    } else {
      getPembangkitList(id, { limit, page, path });
    }
  };

  useEffect(() => {
    getPembangkit();
  }, [debouncedSearch, id, limit, page]);

  useEffect(() => {
    if (modalSnapshot.isReloadData) {
      getPembangkit();
    }
  }, [modalSnapshot.isReloadData]);

  return (
    <>
      <ModalKoefisien />
      <ModalDelete onClickDelete={onClickDelete} />
      <ModalAddPembangkit />
      <Grid container spacing={6}>
        {!id && (
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
                  value={search}
                  sx={{ mr: 6, mb: 2 }}
                  placeholder="Cari"
                  onChange={(e) => setSearch(e.target.value)}
                />

                <Button
                  sx={{ mb: 2 }}
                  onClick={() => openModal("modal-pembangkit")}
                  variant="contained"
                >
                  Tambah Pembangkit
                </Button>
              </WrapperFilter>
              <DataGrid
                autoHeight
                rowsPerPageOptions={[10, 20, 25, 50]}
                rows={pembangkitList}
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

export default Pembangkit;
