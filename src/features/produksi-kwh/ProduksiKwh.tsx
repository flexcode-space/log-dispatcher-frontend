import { useEffect, useState } from "react";
import { Grid, Typography, TextField, IconButton, Button } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import DatePickerMui from "@mui/lab/DatePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import PageHeader from "src/@core/components/page-header";
import { WrapperFilter } from "src/components/filter";
import { produksiKwhApi } from "src/api/produksi-kwh";
import Card from "./components/Card";
import { TableProduksi } from "./table-produksi/TableProduksi";
import { ProduksiKWHList, Detail } from "./types";
import DownloadIcon from "src/assets/icons/download-green-icon.svg";
import { openModal } from "src/state/modal";
import ModalDownload from "./modal/ModalDownload";

const ProduksiKwh = () => {
  const [date, setDate] = useState<Dayjs | null>(dayjs());

  const { getProduksiKwhList, produksiKwhList } = produksiKwhApi();

  const { summary, detail, transfer } = produksiKwhList as ProduksiKWHList;

  useEffect(() => {
    getProduksiKwhList({ tanggal: dayjs(date).format("YYYY-MM-DD") });
  }, [date]);

  const imageUrl = {
    PLTU: "/images/pltu.png",
    PLTA: "/images/plta.png",
    PLTG: "/images/pltg.png",
    PLTGU: "/images/pltgu.png",
    PLTP: "/images/pltp.png",
  };

  const resultTransfer = transfer?.detail?.map((list, index) => ({
    ...list,
    id: index,
  }));

  return (
    <>
      <ModalDownload />
      <Grid container spacing={6} height="auto">
        <Grid item xs={12}>
          <WrapperFilter>
            <Grid item>
              <PageHeader
                title={<Typography variant="h5">Produksi kWh</Typography>}
              />
            </Grid>
            <Grid item>
              <div style={{ display: "flex", gap: "10px" }}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePickerMui
                    value={date}
                    inputFormat="dd/M/yyyy"
                    label="Tanggal"
                    onChange={(e) => setDate(e)}
                    renderInput={(params) => (
                      <TextField size="small" {...params} fullWidth />
                    )}
                  />
                </LocalizationProvider>
                <Button
                  size="small"
                  sx={{ mb: 2, width: "350px" }}
                  variant="outlined"
                  onClick={() => openModal("modal-download")}
                >
                  <IconButton>
                    <DownloadIcon />
                  </IconButton>
                  Download laporan
                </Button>
              </div>
            </Grid>
          </WrapperFilter>
        </Grid>
        <Grid item xs={6} md={3}>
          <Card title="Konsumsi Jateng & DIY" value={summary?.total?.kwh} />
        </Grid>
        <Grid item xs={6} md={3}>
          <Card title="Thermis" value={summary?.thermis?.kwh} />
        </Grid>
        <Grid item xs={6} md={3}>
          <Card title="Pembangkitan" value={summary?.pembangkit?.kwh} />
        </Grid>
        <Grid item xs={6} md={3}>
          <Card title="Transfer" value={summary?.transfer?.kwh} />
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={6}>
            {summary?.jenis_pembangkit &&
              summary?.jenis_pembangkit.map((value: Detail) => (
                <Grid key={value.nama} item xs={6} md={2.4}>
                  <Card
                    title={value.nama}
                    value={value.kwh}
                    imageUrl={(imageUrl as any)[value?.nama]! || ""}
                  />
                </Grid>
              ))}
          </Grid>
        </Grid>

        {detail &&
          detail.map((value, index) => {
            const result = value?.detail.map((list, i) => ({
              ...list,
              id: `${index}${i}`,
            }));

            return (
              <Grid key={`table-${index}`} item xl={4} md={6}>
                <TableProduksi
                  title={value.nama}
                  data={[
                    ...result,
                    {
                      id: index,
                      nama: "Total",
                      mw: value.mw,
                      kwh: value.kwh,
                    },
                  ]}
                />
              </Grid>
            );
          })}

        {transfer?.detail?.length > 0 && (
          <Grid item xl={4} md={6}>
            <TableProduksi
              title={transfer.nama}
              data={[
                ...resultTransfer,
                {
                  id: "total",
                  nama: "Total",
                  mw: transfer.mw,
                  kwh: transfer.kwh,
                },
              ]}
            />
          </Grid>
        )}
      </Grid>
    </>
  );
};

export default ProduksiKwh;
