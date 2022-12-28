import { useState, ChangeEvent, useEffect } from "react";
import {
  Card,
  CardContent,
  Grid,
  TextField,
  Button,
  IconButton,
  Box,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Plus from "mdi-material-ui/Plus";
import DatePicker from "@mui/lab/DatePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import dayjs, { Dayjs } from "dayjs";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { openModal } from "src/state/modal";
import DownloadIcon from "src/assets/icons/download-green-icon.svg";
import { defaultColumns } from "./TargetIsland.constant";
import { ModalAddTargetIsland } from "../modal";

import { WrapperFilter } from "src/components/filter";
import { defenseApi } from "src/api/defense";
import { useSnapshot } from "valtio";
import { reloadPage } from "src/state/reloadPage";
import { Pencil } from "mdi-material-ui";
import { CellType } from "src/types";
import { selectData } from "./state/targetIsland";
import { TargetIslandList } from "./types";

const TargetIsland = () => {
  const reloadPageSnap = useSnapshot(reloadPage);

  const [date, setDate] = useState<Dayjs | null>(null);
  const [limit, setLimit] = useState<number>(10);
  const [page, setPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);

  const filterDate = date ? dayjs(date).format("YYYY-MM-DD") : "";

  const { getDefenseList, defenseList } = defenseApi();

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
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
          <IconButton
            onClick={() => {
              openModal("modal-add-target-island", row.id);
              selectData(row as TargetIslandList);
            }}
          >
            <Pencil />
          </IconButton>
        </Box>
      ),
    },
  ];

  useEffect(() => {
    getDefenseList("target-island", { date: filterDate });
  }, [date]);

  useEffect(() => {
    if (reloadPage.target === "target-island") {
      getDefenseList("target-island", { date: filterDate });
    }
  }, [reloadPageSnap.id, date]);

  return (
    <>
      <ModalAddTargetIsland />
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <WrapperFilter sx={{ alignItems: "baseline" }}>
                <TextField
                  size="small"
                  value=""
                  sx={{ mr: 6, mb: 2 }}
                  placeholder="Cari"
                  // onChange={(e) => setSearch(e.target.value)}
                />

                <div style={{ display: "flex", gap: "10px" }}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      value={date}
                      label="Tanggal"
                      inputFormat="dd/M/yyyy"
                      onChange={setDate}
                      renderInput={(params) => (
                        <TextField
                          size="small"
                          {...params}
                          sx={{ width: "160px" }}
                        />
                      )}
                    />
                  </LocalizationProvider>
                  <Button sx={{ mb: 2 }} size="small" variant="outlined">
                    <IconButton>
                      <DownloadIcon />
                    </IconButton>
                    Download Laporan
                  </Button>
                  <Button
                    sx={{ mb: 2 }}
                    size="small"
                    variant="contained"
                    onClick={() => openModal("modal-add-target-island")}
                  >
                    <IconButton>
                      <Plus />
                    </IconButton>
                    Tambah Target Island
                  </Button>
                </div>
              </WrapperFilter>
              <DataGrid
                autoHeight
                rowsPerPageOptions={[10, 20, 25, 50]}
                pageSize={limit}
                // loading={loading}
                rows={defenseList}
                columns={columns}
                rowCount={10}
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

export default TargetIsland;
