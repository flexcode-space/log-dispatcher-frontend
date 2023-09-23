import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { Grid, Typography, TextField, Button, IconButton } from "@mui/material";
import DatePickerMui from "@mui/lab/DatePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import PageHeader from "src/@core/components/page-header";
import { WrapperFilter } from "src/components/filter";
import { modal, openModal } from "src/state/modal";
import { TableGangguan } from "./table-laporan";
import { TableList } from "../catatan-pembangkitan/table-list";
import { ArrowRight } from "mdi-material-ui";
import { ModalGenerateLaporan } from "src/components/modal";
import { laporanForGenerate } from "src/api/laporan-for-generate";
import dayjs, { Dayjs } from "dayjs";
import { useSnapshot } from "valtio";
import { AbilityContext } from "src/layouts/components/acl/Can";

const LaporanPekerjaan = () => {
  const ability = useContext(AbilityContext);

  const modalSnapshot = useSnapshot(modal);
  const router = useRouter();
  const [date, setDate] = useState<Dayjs | null>(null);
  const filterDate = date ? dayjs(date).format("YYYY-MM-DD") : "";
  const [search, setSearch] = useState<string>("");
  const { laporanForGenerateList, loading, getLaporanForGenerate } =
    laporanForGenerate();

  const ButtonEdit = () =>
    ability?.can("create", "laporan-for-page") ? (
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
    ) : null;

  useEffect(() => {
    if (modalSnapshot.target === "modal-generate-laporan") {
      getLaporanForGenerate({
        tanggal: filterDate || dayjs().format("YYYY-MM-DD"),
      });
    }
  }, [modalSnapshot.isOpen]);

  return (
    <>
      <ModalGenerateLaporan
        value={laporanForGenerateList}
        title="Laporan FOR"
      />
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
        {/* <TablePiket /> */}
        <TableList
          title="Pembangkit Derating"
          type="derating"
          showAction={false}
          actionCard={<ButtonEdit />}
          date={filterDate}
        />
        <TableList
          title="Pembangkit Outage"
          type="outage"
          showAction={false}
          actionCard={<ButtonEdit />}
          date={filterDate}
        />
        <TableGangguan date={filterDate} />
      </Grid>
    </>
  );
};

export default LaporanPekerjaan;
