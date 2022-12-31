import {
  CardHeader,
  Card,
  CardContent,
  Grid,
  Typography,
  TextField,
} from "@mui/material";
import ReactApexcharts from "src/@core/components/react-apexcharts";
import { ApexOptions } from "apexcharts";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";

const options: ApexOptions = {
  legend: { show: false },
  colors: ["#6D788D", "#4AA1B9", "#FDBE42"],
  labels: [
    `${new Date().getFullYear()}`,
    `${new Date().getFullYear() - 1}`,
    `${new Date().getFullYear() - 2}`,
  ],
  tooltip: {
    y: { formatter: (val: number) => `${val}%` },
  },
  dataLabels: {
    enabled: false,
  },
  states: {
    hover: {
      filter: { type: "none" },
    },
    active: {
      filter: { type: "none" },
    },
  },
  plotOptions: {
    pie: {
      donut: {
        size: "70%",
        labels: {
          show: true,
          name: { show: false },
          total: {
            label: "",
            show: true,
            formatter(val) {
              return typeof val === "string" ? `${val}%` : "12%";
            },
          },
          value: {
            offsetY: 6,
            formatter(val) {
              return `${val}%`;
            },
          },
        },
      },
    },
  },
};

export const Chart = () => {
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
              value={new Date()}
              onChange={() => null}
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
              type="donut"
              height={250}
              options={options}
              series={[35, 30, 23]}
            />
          </Grid>
          <Grid item xs={6}>
            <Typography textAlign="center" variant="h6" mb="24px">
              Beban Subsistem
            </Typography>
            <ReactApexcharts
              type="donut"
              height={250}
              options={options}
              series={[35, 30, 23]}
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
