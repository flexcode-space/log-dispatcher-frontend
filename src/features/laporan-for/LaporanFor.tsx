import { useState } from "react";
import { useRouter } from "next/router";
import { Grid, Typography, TextField, Button, IconButton } from "@mui/material";
import DatePickerMui from "@mui/lab/DatePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import PageHeader from "src/@core/components/page-header";
import { WrapperFilter } from "src/components/filter";
import { openModal } from "src/state/modal";
import { TablePiket, TableGangguan } from "./table-laporan";
import { TableList } from "../catatan-pembangkitan/table-list";
import { ArrowRight } from "mdi-material-ui";

const LaporanPekerjaan = () => {
  const router = useRouter();

  const [search, setSearch] = useState<string>("");

  const ButtonEdit = () => (
    <Button
      variant="outlined"
      size="small"
      sx={{ height: "40px" }}
      onClick={() => router.push("/catatan-pembangkitan")}
    >
      Edit Data
      <IconButton>
        <ArrowRight color="primary" />
      </IconButton>
    </Button>
  );

  return (
    <>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <WrapperFilter>
            <Grid item xs={4}>
              <PageHeader
                title={<Typography variant="h5">Laporan FOR</Typography>}
              />
            </Grid>
            <div style={{ display: "flex", gap: "10px" }}>
              <TextField
                size="small"
                value={search}
                sx={{ mb: 2 }}
                placeholder="Cari"
                onChange={(e) => setSearch(e.target.value)}
              />
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
                onClick={() => openModal()}
                variant="contained"
              >
                Generate Laporan
              </Button>
            </div>
          </WrapperFilter>
        </Grid>
        <TablePiket />
        <TableList
          title="Pembangkit Derating"
          type="derating"
          showAction={false}
          actionCard={<ButtonEdit />}
        />
        <TableList
          title="Pembangkit Outage"
          type="outage"
          showAction={false}
          actionCard={<ButtonEdit />}
        />
        <TableGangguan />
      </Grid>
    </>
  );
};

export default LaporanPekerjaan;
