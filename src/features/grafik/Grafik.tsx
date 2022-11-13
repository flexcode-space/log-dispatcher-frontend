import { useCallback, useEffect, useState } from "react";
import {
  Button,
  Hidden,
  ListItemIcon,
  ListItemText,
  TextField,
} from "@mui/material";
import DatePickerMui from "@mui/lab/DatePicker";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
// import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useForm, FormProvider } from "react-hook-form";
import { StyledForm } from "src/components/form";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  TooltipProps,
} from "recharts";
import RechartsWrapper from "src/@core/styles/libs/recharts";
import PageHeader from "src/@core/components/page-header";
import { CardHeader } from "src/components/card";

import { DatePicker } from "src/components/date-picker";
// import DatePicker from "react-datepicker";
import { grafikApi } from "src/api/grafik";
import Circle from "mdi-material-ui/Circle";
import { formatDecimalNumber } from "src/utils/number";
import CustomTooltips from "./components/CustomTooltips";
import SelectIcon from "src/assets/icons/select-icon.svg";
import CloseIcon from "src/assets/icons/close-icon.svg";

// import { DATA } from "./Grafik.constant";
import { GrafikBebanDistribusi } from "./grafik-beban-distribusi";

export type DateType = Date | null | undefined;

const Grafik = () => {
  const direction = "ltr";

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <PageHeader title={<Typography variant="h5">Grafik</Typography>} />
      </Grid>
      <Grid item xs={12} sm={12}>
        <GrafikBebanDistribusi />
      </Grid>

      {/* <Grid item xs={12} sm={6}>
        <RechartsWrapper>
          <Card>
            <CardHeader
              title="Grafik Beban Distribusi"
              action={
                <FormProvider {...formMethods}>
                  <StyledForm noValidate onSubmit={() => null}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker label="Tanggal Laporan" name="tanggal" />
                    </LocalizationProvider>
                  </StyledForm>
                </FormProvider>
              }
            />
            <Divider />
            <CardContent>
              <Box sx={{ height: 350 }}>
                <ResponsiveContainer>
                  <LineChart
                    height={350}
                    data={DATA}
                    style={{ direction }}
                    margin={{ left: -20 }}
                  >
                    <CartesianGrid />
                    <XAxis dataKey="name" reversed={false} />
                    <YAxis orientation="left" />
                    <Tooltip content={CustomTooltip} />
                    <Line
                      dataKey="tanggal_1"
                      stroke="#4AA1B9"
                      strokeWidth={3}
                    />
                    <Line
                      dataKey="tanggal_2"
                      stroke="#ff9f43"
                      strokeWidth={3}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </RechartsWrapper>
      </Grid>

      <Grid item xs={12} sm={6}>
        <RechartsWrapper>
          <Card>
            <CardHeader
              title="Grafik Beban Subsistem"
              action={
                <FormProvider {...formMethods}>
                  <StyledForm noValidate onSubmit={() => null}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker label="Tanggal Laporan" name="tanggal" />
                    </LocalizationProvider>
                  </StyledForm>
                </FormProvider>
              }
            />
            <Divider />
            <CardContent>
              <Box sx={{ height: 350 }}>
                <ResponsiveContainer>
                  <LineChart
                    height={350}
                    data={DATA}
                    style={{ direction }}
                    margin={{ left: -20 }}
                  >
                    <CartesianGrid />
                    <XAxis dataKey="name" reversed={false} />
                    <YAxis orientation="left" />
                    <Tooltip content={CustomTooltip} />
                    <Line
                      dataKey="tanggal_1"
                      stroke="#4AA1B9"
                      strokeWidth={3}
                    />
                    <Line
                      dataKey="tanggal_2"
                      stroke="#ff9f43"
                      strokeWidth={3}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </RechartsWrapper>
      </Grid> */}
    </Grid>
  );
};

export default Grafik;
