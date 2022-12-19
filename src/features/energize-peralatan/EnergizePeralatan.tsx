import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Grid,
  Typography,
  TextField,
  Button,
  IconButton,
  Box,
} from "@mui/material";
import { useSnapshot } from "valtio";
import { DataGrid } from "@mui/x-data-grid";
import { PencilOutline, EyeOutline } from "mdi-material-ui";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicketMui from "@mui/lab/DatePicker";
import { modal } from "src/state/modal";
import { useDebounce } from "src/hooks/useDebounce";
import PageHeader from "src/@core/components/page-header";
import FilterIcon from "src/assets/icons/filter-green-icon.svg";

import { CardHeader } from "src/components/card";
import { openModal } from "src/state/modal";
import { ModalAdd, ModalDetail } from "./modal";
import { defaultColumns } from "./EnergizePeralatan.constant";
import { energizePeralatanApi } from "src/api/energize-peralatan";
import { CellType } from "src/types";
import { EnergizeList } from "./types";
import { selectData } from "src/state/energizePeralatan";

const EnergizePeralatan = () => {
  const modalSnapshot = useSnapshot(modal);
  const [search, setSearch] = useState<string>("");

  const debouncedSearch = useDebounce(search, 500);

  const { getEnergizePeralatanList, energizePeralatanList } =
    energizePeralatanApi();

  const columns = [
    ...defaultColumns,
    {
      flex: 0.15,
      minWidth: 100,
      sortable: false,
      field: "actions",
      headerName: "Aksi",
      renderCell: ({ row }: CellType) => {
        return (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton
              onClick={() => {
                openModal("modal-energize-peralatan", row?.id);
                selectData(row as EnergizeList);
              }}
            >
              <PencilOutline />
            </IconButton>
            <IconButton
              onClick={() => {
                openModal("modal-energize-peralatan-detail");
                selectData(row as EnergizeList);
              }}
            >
              <EyeOutline />
            </IconButton>
          </Box>
        );
      },
    },
  ];

  const getEnergize = () => {
    if (debouncedSearch) {
      getEnergizePeralatanList({ search });
    } else {
      getEnergizePeralatanList({ search });
    }
  };

  useEffect(() => {
    getEnergize();
  }, [debouncedSearch]);

  useEffect(() => {
    if (modalSnapshot.isReloadData) {
      getEnergize();
    }
  }, [modalSnapshot.isReloadData]);

  return (
    <>
      <ModalAdd />
      <ModalDetail />
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <PageHeader
            title={<Typography variant="h5">Energize Peralatan</Typography>}
          />
        </Grid>
        <Grid item xs={12}>
          <Card>
            <CardHeader
              title={
                <TextField
                  size="small"
                  value={search}
                  sx={{ mr: 6, mb: 2, bgcolor: "#ffffff" }}
                  placeholder="Cari"
                  onChange={(e) => setSearch(e.target.value)}
                />
              }
              action={
                <div style={{ display: "flex", gap: "10px" }}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicketMui
                      value={new Date()}
                      label="Pilih Tanggal"
                      onChange={() => null}
                      renderInput={(params) => (
                        <TextField
                          size="small"
                          {...params}
                          sx={{ bgcolor: "#ffffff" }}
                        />
                      )}
                    />
                  </LocalizationProvider>
                  <Button sx={{ mb: 2 }} variant="outlined">
                    <IconButton>
                      <FilterIcon />
                    </IconButton>
                    Filter
                  </Button>
                  <Button
                    sx={{ mb: 2 }}
                    variant="contained"
                    onClick={() => openModal("modal-energize-peralatan")}
                  >
                    Tambah Data
                  </Button>
                </div>
              }
            ></CardHeader>
            <CardContent>
              <DataGrid
                autoHeight
                rows={energizePeralatanList}
                columns={columns}
                hideFooter
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default EnergizePeralatan;
