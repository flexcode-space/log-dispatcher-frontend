// ** React Imports
import { useContext, useEffect, useState } from "react";
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

import { defaultColumns } from "./Busbar.constant";
import { CellType } from "./types";

import { ModalAddBusbar } from "./modal";
import { WrapperFilter } from "src/components/filter";

import { busbarApi } from "src/api/busbar";
import { openModal, closeModal, modal, reloadPage } from "src/state/modal";
import { useDebounce } from "src/hooks/useDebounce";
import { ModalDelete } from "src/components/modal";
import { MenuMore } from "src/components/menu-more";
import { ModalKoefisien } from "./modal/modal-koefisien";
import { AbilityContext } from "src/layouts/components/acl/Can";

const Busbar = () => {
  const ability = useContext(AbilityContext);

  const modalSnapshot = useSnapshot(modal);

  const router = useRouter();
  const [limit, setLimit] = useState<number>(10);
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");

  const debouncedSearch = useDebounce(search, 500);

  const { getBusbarList, busbarList, loading, totalData, deleteBusbar } =
    busbarApi();

  const onClickDelete = async (id: string) => {
    if (id) {
      await deleteBusbar({ id });
      closeModal();
      reloadPage();
    }
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
            {ability?.can("update", "busbar-page") ? (
              <IconButton onClick={() => openModal("modal-busbar", id)}>
                <PencilOutline />
              </IconButton>
            ) : null}
            {ability?.can("delete", "busbar-page") ? (
              <IconButton>
                <DeleteOutline
                  onClick={() => openModal("modal-delete", row.id)}
                />
              </IconButton>
            ) : null}
            {ability?.can("update", "busbar-page") ? (
              <MenuMore
                onClickKoefisien={() => openModal("modal-koefisien", row.id)}
              />
            ) : null}
          </Box>
        );
      },
    },
  ];

  const handleClose = () => {
    closeModal();
  };

  const getBusbar = () => {
    if (debouncedSearch) {
      getBusbarList(id, { search, limit, page, path });
    } else {
      getBusbarList(id, { limit, page, path });
    }
  };

  useEffect(() => {
    getBusbar();
  }, [debouncedSearch, id, limit, page]);

  useEffect(() => {
    if (modalSnapshot.isReloadData) {
      getBusbar();
    }
  }, [modalSnapshot.isReloadData]);

  return (
    <>
      <ModalKoefisien />
      <ModalDelete onClickDelete={onClickDelete} />
      <ModalAddBusbar handleClose={handleClose} />
      <Grid container spacing={6}>
        {!id && (
          <Grid item xs={12}>
            <PageHeader title={<Typography variant="h5">Busbar</Typography>} />
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

                {ability?.can("create", "busbar-page") ? (
                  <Button
                    sx={{ mb: 2 }}
                    onClick={() => openModal("modal-busbar")}
                    variant="contained"
                  >
                    Tambah Busbar
                  </Button>
                ) : null}
              </WrapperFilter>
              <DataGrid
                autoHeight
                rowsPerPageOptions={[10, 20, 25, 50]}
                rows={busbarList}
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

export default Busbar;
