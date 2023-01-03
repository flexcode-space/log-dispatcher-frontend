import { useState, useEffect, useMemo } from "react";
import { GridColumns } from "@mui/x-data-grid";
import {
  Grid,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  IconButton,
} from "@mui/material";
import DatePickerMui from "@mui/lab/DatePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import PageHeader from "src/@core/components/page-header";
import { WrapperFilter } from "src/components/filter";
import { CardHeader } from "src/components/card";
import { DataGrid } from "@mui/x-data-grid";
import { openModal } from "src/state/modal";
import { TIME } from "src/constants/time";
import { TableVerifikasi } from "./table-verifikasi";
import { ModalAddCatatan, ModalGenerateLaporan } from "./modal";
import { laporanFreegovApi } from "src/api/laporan-freegov";
import dayjs, { Dayjs } from "dayjs";
import { CellType } from "src/types";
import { useSnapshot } from "valtio";
import { reloadPage } from "src/state/reloadPage";

const LaporanFreeGov = () => {
  const reloadPageSnap = useSnapshot(reloadPage);

  const [date, setDate] = useState<Dayjs | null>(dayjs());

  const formatDate = dayjs(date).format("YYYY-MM-DD");

  const { getLaporanFreegovList, laporanFreegovList } = laporanFreegovApi();

  const generateColumsTime = () => {
    const arrayTime: GridColumns<any> = [];

    TIME.map((value: string) => {
      const mw = "mw_" + value.replace(".", "");

      arrayTime.push({
        flex: 0.25,
        minWidth: 80,
        field: mw,
        headerName: value,
        renderCell: ({ row }: CellType) => {
          return (
            <Typography
              variant="subtitle2"
              noWrap
              sx={{ textTransform: "capitalize" }}
            >
              {row[mw] ? "ON" : "OFF"}
            </Typography>
          );
        },
      });
    });
    return arrayTime;
  };

  const columns = useMemo(
    () => [
      {
        flex: 0.25,
        minWidth: 200,
        field: "nama",
        headerName: "Pembangkit",
      },
      ...generateColumsTime(),
    ],
    []
  );

  useEffect(() => {
    getLaporanFreegovList({ tanggal: formatDate });
  }, [date]);

  useEffect(() => {
    if (reloadPageSnap.target === "laporan-freegov") {
      getLaporanFreegovList({ tanggal: formatDate });
    }
  }, [date, reloadPageSnap.id]);

  return (
    <>
      <ModalAddCatatan date={formatDate} />
      <ModalGenerateLaporan />
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <WrapperFilter>
            <Grid item xs={4}>
              <PageHeader
                title={<Typography variant="h5">Laporan FreeGov</Typography>}
              />
            </Grid>
            <div style={{ display: "flex", gap: "10px" }}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePickerMui
                  value={date}
                  label="Pilih Tanggal"
                  inputFormat="dd/M/yyyy"
                  onChange={(e) => setDate(e)}
                  renderInput={(params) => (
                    <TextField
                      size="small"
                      {...params}
                      sx={{ width: "200px" }}
                    />
                  )}
                />
              </LocalizationProvider>
              <Button
                sx={{ mb: 2 }}
                onClick={() => openModal("modal-generate-laporan")}
                variant="contained"
              >
                Generate Laporan
              </Button>
            </div>
          </WrapperFilter>
        </Grid>

        <Grid item xs={12}>
          <Card>
            <CardHeader title="Combo" />
            <CardContent>
              <DataGrid
                hideFooter
                autoHeight
                columns={columns}
                rows={laporanFreegovList?.combo || []}
              />
            </CardContent>
          </Card>
        </Grid>

        <TableVerifikasi
          combo={laporanFreegovList?.combo || []}
          catatan={laporanFreegovList.catatan || []}
        />
      </Grid>
    </>
  );
};

export default LaporanFreeGov;
