import { useEffect, useState } from "react";
import { Typography, Card, CardContent, Grid, TextField } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { CardHeader } from "src/components/card";
import { columns } from "./NeracaDaya.constant";
import { berandaApi } from "src/api/beranda";
import dayjs, { Dayjs } from "dayjs";
import { NeracaDayaList } from "./NeracaDaya.types";

const NeracaDaya = () => {
  const [date, setDate] = useState<Dayjs | null>(dayjs());

  const { getNeracaDaya, neracaDayaList } = berandaApi();

  useEffect(() => {
    getNeracaDaya({
      tanggal: dayjs(date).format("YYYY-MM-DD"),
      jam: dayjs(date).format("HH:mm"),
    });
  }, [date]);

  return (
    <Card sx={{ minHeight: "500px" }}>
      <CardHeader
        title="Neraca Daya"
        action={
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <TimePicker
              label="Pilih Jam"
              ampm={false}
              value={date}
              onChange={(e) => setDate(e)}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        }
      />
      <CardContent>
        <Grid container spacing={6}>
          {neracaDayaList?.length > 0 ? (
            neracaDayaList?.map((list: NeracaDayaList, index: number) => {
              const data =
                list?.pasokan?.length > 0
                  ? [
                      ...list?.pasokan,
                      { nama: "Rencana", value: list?.rencana },
                      { nama: "Margin", value: list?.margin },
                    ]
                  : [];

              const rows = data?.map((value, index) => ({
                ...value,
                id: index,
              }));

              if (data.length > 0) {
                return (
                  <Grid key={`neraca-list-${index}`} item xs={3}>
                    <Typography
                      variant="subtitle1"
                      sx={{ mb: "5px", fontWeight: 700 }}
                    >
                      {list?.subsistem}
                    </Typography>
                    <DataGrid
                      autoHeight
                      hideFooter
                      rows={rows}
                      columns={columns(dayjs(date).format("HH:mm"))}
                    />
                  </Grid>
                );
              }
              return null;
            })
          ) : (
            <Grid
              item
              xs={12}
              display="flex"
              alignContent="center"
              alignItems="center"
              justifyContent="center"
              height="500px"
            >
              <Typography variant="h5">
                Tidak ada data yang di tampilkan
              </Typography>
            </Grid>
          )}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default NeracaDaya;
