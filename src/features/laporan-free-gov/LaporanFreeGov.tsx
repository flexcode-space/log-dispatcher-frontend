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
import { ModalGenerateLaporan } from "./modal";

const LaporanFreeGov = () => {
  const generateColumsTime = () => {
    const arrayTime: GridColumns<any> = [];

    TIME.map((value, index) => {
      arrayTime.push({
        flex: 0.25,
        minWidth: 80,
        field: `mw_${value}`,
        headerName: value,
      });
    });
    return arrayTime;
  };

  const columns = [
    {
      flex: 0.25,
      minWidth: 200,
      field: "pembangkit",
      headerName: "Pembangkit",
    },
    ...generateColumsTime(),
  ];

  const dataMock = [
    {
      id: 1,
      pembangkit: "PLTU Tambalorok U1",
    },
  ];

  return (
    <>
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
                  value={null}
                  label="Pilih Tanggal"
                  onChange={() => null}
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
                rows={dataMock}
              />
            </CardContent>
          </Card>
        </Grid>

        <TableVerifikasi />
      </Grid>
    </>
  );
};

export default LaporanFreeGov;
