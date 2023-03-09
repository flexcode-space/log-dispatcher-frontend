import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Grid,
  Typography,
  TextField,
  Button,
  IconButton,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { PencilOutline } from "mdi-material-ui";
import { useSnapshot } from "valtio";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicketMui from "@mui/lab/DatePicker";
import PageHeader from "src/@core/components/page-header";
import FilterIcon from "src/assets/icons/filter-green-icon.svg";
import DownloadIcon from "src/assets/icons/download-green-icon.svg";

import { WrapperFilter } from "src/components/filter";
import { catatanPenyaluranApi } from "src/api/catatan-penyaluran";
import { selectData } from "src/state/catatanPenyaluran";
import { AddData } from "./add-data";
import { openModal, closeModal } from "src/state/modal";
import { ModalEdit, ModalDownload, ModalFilter } from "./modal";
import { defaultColumns } from "./CatatanPenyaluran.constant";
import { CellType } from "src/types";
import { CatatanPenyaluranList, FilterProps } from "./types";
import { reloadPage } from "src/state/reloadPage";
import dayjs, { Dayjs } from "dayjs";
import { useDebounce } from "src/hooks/useDebounce";

const CatatanPembangkitan = () => {
  const reloadPageSnap = useSnapshot(reloadPage);
  const [search, setSearch] = useState<string>("");
  const [date, setDate] = useState<Dayjs | null>(dayjs());
  const [filter, setFilter] = useState<FilterProps>({
    gardu_induk_id: "",
    jurusan: "",
    tanggal_mulai: null,
    tanggal_akhir: null,
  });

  const debouncedSearch = useDebounce(search, 500);

  const { getCatatanPenyaluranList, catatanPenyaluranList } =
    catatanPenyaluranApi();

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
          <IconButton
            onClick={() => {
              openModal("modal-catatan-penyaluran");
              selectData(row as CatatanPenyaluranList);
            }}
          >
            <PencilOutline />
          </IconButton>
        );
      },
    },
  ];

  const handleClose = () => {
    closeModal();
  };

  const getCatatanPenyaluran = () => {
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
      getCatatanPenyaluranList({ ...params, search });
    } else {
      getCatatanPenyaluranList({ ...params });
    }
  };

  useEffect(() => {
    getCatatanPenyaluran();
  }, [filter, date, debouncedSearch]);

  useEffect(() => {
    if (reloadPageSnap.target === "catatan-penyaluran") {
      getCatatanPenyaluran();
    }
  }, [reloadPageSnap.id]);

  return (
    <>
      <ModalFilter filter={filter} onChange={(value) => setFilter(value)} />
      <ModalDownload />
      <ModalEdit handleClose={handleClose} />
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <PageHeader
            title={<Typography variant="h5">Catatan Penyaluran</Typography>}
          />
        </Grid>
        <Grid item xs={12}>
          <AddData />
        </Grid>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <WrapperFilter sx={{ alignItems: "baseline" }}>
                <TextField
                  size="small"
                  value={search}
                  sx={{ mr: 6, mb: 2 }}
                  placeholder="Cari"
                  onChange={(e) => setSearch(e.target.value)}
                />

                <div style={{ display: "flex", gap: "10px" }}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicketMui
                      value={date}
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
                </div>
              </WrapperFilter>
              <DataGrid
                autoHeight
                rows={catatanPenyaluranList}
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

export default CatatanPembangkitan;
