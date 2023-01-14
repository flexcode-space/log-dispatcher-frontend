import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
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
import { CardHeader } from "src/components/card";
import DatePickerMui from "@mui/lab/DatePicker";

import Circle from "mdi-material-ui/Circle";

import { useEffect, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { MenuItem, Select, TextField } from "@mui/material";
import { DATA } from "../Home.constant";
import { subsistemApi } from "src/api/subsistem";

const Grafik: React.FC<{ title: string }> = ({ title }) => {
  const [date, setDate] = useState<Dayjs | null>(dayjs());

  const { getSubsistemList, subsistemList } = subsistemApi();

  const subsitemOptions = subsistemList.map(({ id, nama }) => ({
    value: id,
    label: nama,
  }));

  const direction = "ltr";

  useEffect(() => {
    getSubsistemList();
  }, []);

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
    <RechartsWrapper>
      <Card>
        <CardHeader
          title={title}
          action={
            <>
              <Select size="small" sx={{ marginRight: "10px", width: 200 }}>
                {subsitemOptions?.map(({ value, label }) => (
                  <MenuItem key={value} value={value}>
                    {label}
                  </MenuItem>
                ))}
              </Select>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePickerMui
                  value={date}
                  inputFormat="dd/M/yyyy"
                  onChange={(e) => setDate(e)}
                  renderInput={(params) => (
                    <TextField
                      size="small"
                      {...params}
                      sx={{ width: "250px" }}
                    />
                  )}
                />
              </LocalizationProvider>
            </>
          }
        />
        <Divider />
        <CardContent>
          <Box sx={{ height: 300 }}>
            <ResponsiveContainer>
              <LineChart
                height={300}
                data={DATA}
                style={{ direction }}
                margin={{ left: -20 }}
              >
                <CartesianGrid />
                <XAxis dataKey="name" reversed={false} />
                <YAxis orientation="left" />
                <Tooltip content={CustomTooltip} />
                <Line dataKey="tanggal_1" stroke="#4AA1B9" strokeWidth={3} />
                <Line dataKey="tanggal_2" stroke="#ff9f43" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </Box>
        </CardContent>
      </Card>
    </RechartsWrapper>
  );
};

export default Grafik;
