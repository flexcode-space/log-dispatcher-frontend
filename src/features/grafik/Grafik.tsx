import { useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
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

import { DatePicker } from "src/components/date-picker";
// import DatePicker from "react-datepicker";

import Circle from "mdi-material-ui/Circle";

import { DATA } from "./Grafik.constant";

export type DateType = Date | null | undefined;

interface PickerProps {
  start: Date | number;
  end: Date | number;
}

const Grafik = () => {
  const direction = "ltr";

  const formMethods = useForm({
    // resolver: yupResolver(validationSchema),
    // defaultValues: initialValues,
    mode: "onChange",
  });

  const CustomTooltip = (data: TooltipProps<any, any>) => {
    // ** Props
    const { active, payload } = data;

    if (active && payload) {
      return (
        <div className="recharts-custom-tooltip">
          <Typography>{data.label}</Typography>
          <Divider />
          {data &&
            data.payload &&
            data.payload.map((i: any) => {
              return (
                <Box
                  sx={{ display: "flex", alignItems: "center" }}
                  key={i.dataKey}
                >
                  <Circle sx={{ color: i.fill, mr: 2.5, fontSize: "0.6rem" }} />
                  <span>
                    {i.dataKey} : {i.payload[i.dataKey]}
                  </span>
                </Box>
              );
            })}
        </div>
      );
    }

    return null;
  };

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <PageHeader title={<Typography variant="h5">Grafik</Typography>} />
      </Grid>
      <Grid item xs={12} sm={12}>
        <RechartsWrapper>
          <Card>
            <CardHeader
              title="Grafik Beban Distribusi"
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
                <FormProvider {...formMethods}>
                  <StyledForm noValidate onSubmit={() => null}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        size="small"
                        label="Tanggal Laporan"
                        name="tanggal"
                      />
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
              title="Grafik Beban Distribusi"
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
    </Grid>
  );
};

export default Grafik;
