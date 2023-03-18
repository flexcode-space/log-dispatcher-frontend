import { useEffect, useState } from "react";
import {
  CardHeader,
  Card,
  CardContent,
  Grid,
  Typography,
  TextField,
} from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import ReactApexcharts from "src/@core/components/react-apexcharts";
import { ApexOptions } from "apexcharts";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { berandaApi } from "src/api/beranda";

type KomposisiProps = {
  color: string;
  nama: string;
  percentage: number;
  value: number;
};

const initialOptionsChart: ApexOptions = {
  chart: {
    width: 380,
    type: "pie",
  },
  legend: { show: false },
  responsive: [
    {
      breakpoint: 480,
      options: {
        chart: {
          width: 200,
        },
        legend: {
          position: "bottom",
        },
      },
    },
  ],
};

export const Chart = () => {
  const { getPieChart } = berandaApi();

  const [komposisi, setKomposisi] = useState<{
    options: ApexOptions;
    series: number[];
  }>({
    options: initialOptionsChart,
    series: [],
  });

  const [beban, setBeban] = useState<{
    options: ApexOptions;
    series: number[];
  }>({
    options: initialOptionsChart,
    series: [],
  });

  const [date, setDate] = useState<Dayjs | null>(dayjs());

  useEffect(() => {
    getPieChart({ tanggal: dayjs(date).format("YYYY-MM-DD") }).then(
      (result) => {
        if (result?.komposisi) {
          let komposisiLabel: string[] = [];
          let komposisiSeries: number[] = [];

          result?.komposisi?.forEach((value: KomposisiProps) => {
            komposisiLabel.push(value.nama);
            komposisiSeries.push(value.value);
          });

          setKomposisi((prevState) => ({
            series: komposisiSeries,
            options: {
              ...prevState.options,
              labels: komposisiLabel,
            },
          }));
        }

        if (result?.beban) {
          let bebanLabel: string[] = [];
          let bebanSeries: number[] = [];

          result?.beban.forEach((value: KomposisiProps) => {
            bebanLabel.push(value.nama);
            bebanSeries.push(value.value);
          });

          setBeban((prevState) => ({
            series: bebanSeries,
            options: {
              ...prevState.options,
              labels: bebanLabel,
            },
          }));
        }
      }
    );
  }, [date]);

  return (
    <Card sx={{ height: 390 }}>
      <CardHeader
        titleTypographyProps={{ variant: "h6" }}
        subheaderTypographyProps={{
          variant: "caption",
          sx: { color: "text.disabled" },
        }}
        sx={{
          flexDirection: ["column", "row"],
          alignItems: ["flex-start", "center"],
          "& .MuiCardHeader-action": { mb: 0 },
          "& .MuiCardHeader-content": { mb: [2, 0] },
        }}
        action={
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Tanggal"
              inputFormat="dd/M/yyyy"
              value={date}
              onChange={(e) => setDate(e)}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        }
      />
      <CardContent>
        <Grid container>
          <Grid item xs={6}>
            <Typography textAlign="center" variant="h6" mb="24px">
              Komposisi Pembebanan
            </Typography>
            <ReactApexcharts
              type="pie"
              height={250}
              options={komposisi.options}
              series={komposisi.series}
            />
          </Grid>
          <Grid item xs={6}>
            <Typography textAlign="center" variant="h6" mb="24px">
              Beban Subsistem
            </Typography>
            <ReactApexcharts
              type="pie"
              height={250}
              options={beban.options}
              series={beban.series}
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
