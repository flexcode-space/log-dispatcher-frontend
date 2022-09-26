// ** React Imports
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

// ** Custom Components Imports
import PageHeader from "src/@core/components/page-header";

import { defaultColumns } from "./subsistem.constant";
import { CellType } from "./types";

import { ModalAddSubsistem } from "./modal";
import { WrapperFilter } from "src/components/filter";

import { subsistemApi } from "src/api/subsistem";
import { useDebounce } from "src/hooks/useDebounce";

const Subsistem = () => {
  const [pageSize, setPageSize] = useState<number>(10);
  const [open, setOpen] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");

  const debouncedSearch = useDebounce(search, 500);

  const { subsistemList, getSubsistemList, loading } = subsistemApi();

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

  useEffect(() => {
    if (debouncedSearch) {
      getSubsistemList({ search });
    } else {
      getSubsistemList();
    }
  }, [debouncedSearch]);

  return (
    <>
      <ModalAddSubsistem open={open} handleClose={() => setOpen(!open)} />
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
                  onClick={handleClickOpen}
                  variant="contained"
                >
                  Tambah Subsistem
                </Button>
              </WrapperFilter>
              <Box>
                <DataGrid
                  autoHeight
                  loading={loading}
                  rows={subsistemList}
                  columns={columns}
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
