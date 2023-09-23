import { useState, useEffect, useContext } from "react";
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
import { reloadPage, setReloadPage } from "src/state/reloadPage";
import { Pencil } from "mdi-material-ui";
import { CellType } from "src/types";
import { selectData, targetIsland } from "./state/targetIsland";
import { TargetIslandList } from "./types";
import { useDebounce } from "src/hooks/useDebounce";
import { pencatatanDefenseApi } from "src/api/pencatatan-defense";
import { ModalChangeStatus } from "../modal/modal-change-status";
import { AbilityContext } from "src/layouts/components/acl/Can";

const TargetIsland = () => {
  const ability = useContext(AbilityContext);

  const reloadPageSnap = useSnapshot(reloadPage);
  const { data } = useSnapshot(targetIsland);

  const [date, setDate] = useState<Dayjs | null>(null);
  const [search, setSearch] = useState<string>("");
  const [limit, setLimit] = useState<number>(20);
  const [page, setPage] = useState<number>(1);

  const debouncedSearch = useDebounce(search, 500);

  const filterDate = date ? dayjs(date).format("YYYY-MM-DD") : "";

  const { getDefenseList, updateDefense, defenseList, loading, countData } =
    defenseApi();
  const { createPencatanDefense } = pencatatanDefenseApi();

  const columns = [
    ...defaultColumns,
    {
      flex: 0.25,
      minWidth: 200,
      field: "status",
      headerName: "Status",
      renderCell: ({ row }: CellType) => {
        return (
          <Button
            variant="contained"
            onClick={() => {
              if (ability?.cannot("update", "defense-schema-page")) return;
              selectData(data);
              openModal(
                "modal-change-status",
                data.status ? "Nonaktifkan" : "Aktifkan"
              );
            }}
            sx={{
              color: "white !important",
              bgcolor: row?.status ? "#72E128" : "#FF4D49",
            }}
          >
            {row?.status ? "ON" : "OFF"}
          </Button>
        );
      },
    },
    {
      flex: 0.15,
      minWidth: 100,
      sortable: false,
      field: "actions",
      headerName: "Aksi",
      renderCell: ({ row }: CellType) => (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {ability?.can("update", "defense-schema-page") ? (
            <IconButton
              onClick={() => {
                openModal("modal-add-target-island", row.id);
                selectData(row as TargetIslandList);
              }}
            >
              <Pencil />
            </IconButton>
          ) : null}
        </Box>
      ),
    },
  ];

  // @ts-ignore
  const rowData = defenseList.map((value, index) => ({ id: index, ...value }));

  const onClickStatus = async (keterangan: string) => {
    await updateDefense("target-island", {
      ...data,
      status: !data?.status,
      tanggal: dayjs(data?.tanggal).format("YYYY-MM-DD"),
    }).then(async () => {
      await createPencatanDefense("target-island", {
        frekuensi: data?.frekuensi,
        gardu_induk: data?.gardu_induk.nama,
        island: data?.island,
        status: !data?.status,
        tahap: data?.tahap.value,
        upt: data?.upt,
        keterangan: keterangan,
      });
    });
    setReloadPage("target-island");
  };

  const getTargetIslandList = () => {
    if (debouncedSearch) {
      getDefenseList("target-island", {
        search,
        page,
        limit,
        tanggal: filterDate,
      });
    } else {
      getDefenseList("target-island", { page, limit, tanggal: filterDate });
    }
  };

  useEffect(() => {
    getTargetIslandList();
  }, [date, page, limit, debouncedSearch]);

  useEffect(() => {
    if (reloadPage.target === "target-island") {
      getTargetIslandList();
    }
  }, [reloadPageSnap.id]);

  return (
    <>
      <ModalAddTargetIsland />
      <ModalChangeStatus onSubmitStatus={onClickStatus} />
      <Grid container spacing={6}>
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
                  {ability?.can("create", "defense-schema-page") ? (
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
                  ) : null}
                </div>
              </WrapperFilter>
              <DataGrid
                autoHeight
                rowsPerPageOptions={[10, 20, 25, 50]}
                pageSize={limit}
                loading={loading}
                rows={rowData}
                columns={columns}
                rowCount={countData}
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
