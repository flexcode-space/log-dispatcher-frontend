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
import { subsistemApi } from "src/api/subsistem";
import { grafikApi } from "src/api/grafik";

const Grafik: React.FC<{ title: string }> = ({ title }) => {
  const [date, setDate] = useState<Dayjs | null>(dayjs());
  const [subsitemId, setSubsistemId] = useState<string>("");

  const { getSubsistemList, subsistemList } = subsistemApi();
  const { getGrafikSubsistem, grafikSubsistem } = grafikApi();

  const subsitemOptions = subsistemList.map(({ id, nama }) => ({
    value: id,
    label: nama,
  }));

  const direction = "ltr";

  useEffect(() => {
    getSubsistemList().then();
  }, []);

  const getAllDataGrafik = () => {
    getGrafikSubsistem(subsitemId, {
      tanggal: dayjs(date).format("YYYY-MM-DD"),
    });
  };

  useEffect(() => {
    if (subsitemId && date) {
      getAllDataGrafik();
    }
  }, [subsitemId, date]);

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
              <Select
                name="subsistem_id"
                value={subsitemId}
                onChange={(e) => setSubsistemId(e.target.value as string)}
                size="small"
                sx={{ marginRight: "10px", width: 200 }}
              >
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
          <Box sx={{ height: 350 }}>
            <ResponsiveContainer>
              <LineChart
                height={350}
                data={grafikSubsistem}
                style={{ direction }}
                margin={{ left: -20 }}
              >
                <CartesianGrid />
                <XAxis dataKey="name" reversed={false} />
                <YAxis orientation="left" />
                <Tooltip content={CustomTooltip} />
                <Line dataKey="beban" stroke="#4AA1B9" strokeWidth={3} />
                <Line dataKey="rencana" stroke="#ff9f43" strokeWidth={3} />
                <Line dataKey="selisih" stroke="none" />
              </LineChart>
            </ResponsiveContainer>
          </Box>
        </CardContent>
      </Card>
    </RechartsWrapper>
  );
};

export default Grafik;
