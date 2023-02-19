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
import { useDebounce } from "src/hooks/useDebounce";
import PageHeader from "src/@core/components/page-header";
import FilterIcon from "src/assets/icons/filter-green-icon.svg";
import DownloadIcon from "src/assets/icons/download-green-icon.svg";

import { CardHeader } from "src/components/card";
import { openModal } from "src/state/modal";
import { ModalAdd, ModalDetail, ModalFilter } from "./modal";
import { defaultColumns } from "./EnergizePeralatan.constant";
import { energizePeralatanApi } from "src/api/energize-peralatan";
import { CellType } from "src/types";
import { EnergizeList, FilterProps } from "./types";
import { selectData } from "src/state/energizePeralatan";
import dayjs, { Dayjs } from "dayjs";
import { reloadPage } from "src/state/reloadPage";
import ModalDownload from "./modal/ModalDownload";

const EnergizePeralatan = () => {
  const reloadPageSnap = useSnapshot(reloadPage);
  const [date, setDate] = useState<Dayjs | null>(null);
  const [search, setSearch] = useState<string>("");
  const [filter, setFilter] = useState<FilterProps>({
    gardu_induk_id: "",
    jenis_peralatan: "",
    jurusan: "",
    tanggal_mulai: null,
    tanggal_akhir: null,
  });

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
    const { tanggal_mulai, tanggal_akhir, ...rest } = filter;

    const params = {
      ...rest,
      tanggal: date ? dayjs(date).format("YYYY-MM-DD") : "",
      tanggal_mulai: tanggal_mulai
        ? dayjs(tanggal_mulai).format("YYYY-MM-DD")
        : "",
      tanggal_akhir: tanggal_akhir
        ? dayjs(tanggal_akhir).format("YYYY-MM-DD")
        : "",
    };

    if (debouncedSearch) {
      getEnergizePeralatanList({ ...params, search });
    } else {
      getEnergizePeralatanList({ ...params });
    }
  };

  useEffect(() => {
    getEnergize();
  }, [debouncedSearch, date, filter]);

  useEffect(() => {
    if (reloadPageSnap.target === "energize-peralatan") {
      getEnergize();
    }
  }, [reloadPageSnap.id]);

  return (
    <>
      <ModalDownload />
      <ModalAdd />
      <ModalFilter filter={filter} onChange={(filter) => setFilter(filter)} />
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
                  sx={{ mr: 6, mb: 2 }}
                  placeholder="Cari"
                  onChange={(e) => setSearch(e.target.value)}
                />
              }
              action={
                <div style={{ display: "flex", gap: "10px" }}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicketMui
                      value={date}
                      label="Pilih Tanggal"
                      inputFormat="dd/M/yyyy"
                      onChange={(e) => setDate(e)}
                      renderInput={(params) => (
                        <TextField size="small" {...params} />
                      )}
                    />
                  </LocalizationProvider>
                  <Button
                    sx={{ mb: 2 }}
                    variant="outlined"
                    onClick={() => openModal("modal-filter")}
                  >
                    <IconButton>
                      <FilterIcon />
                    </IconButton>
                    Filter
                  </Button>
                  <Button
                    size="small"
                    sx={{ mb: 2 }}
                    variant="outlined"
                    onClick={() => openModal("modal-download")}
                  >
                    <IconButton>
                      <DownloadIcon />
                    </IconButton>
                    Download laporan
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
