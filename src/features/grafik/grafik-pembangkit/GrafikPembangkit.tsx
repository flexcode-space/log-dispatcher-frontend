import { useEffect, useState } from "react";
import { TextField } from "@mui/material";
import DatePickerMui from "@mui/lab/DatePicker";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
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
} from "recharts";
import RechartsWrapper from "src/@core/styles/libs/recharts";
import { CardHeader } from "src/components/card";
import { grafikApi } from "src/api/grafik";
import { convertDate } from "src/utils/date";
import CustomTooltip from "../components/CustomTooltips";
import { TIME } from "src/constants/time";

type GrafikPembangkitProps = {
  id?: string;
  name?: string;
};

type DataGrafikPembangkit = {
  nama: string;
  data: any[];
};

const GrafikPembangkit = ({ id, name }: GrafikPembangkitProps): JSX.Element => {
  const [date, setDate] = useState<any>(new Date());
  const { getGrafikPembangkit, grafikPembangkit } = grafikApi();

  const direction = "ltr";

  const getAllDataGrafik = () => {
    getGrafikPembangkit(id, { tanggal: convertDate(date) });
  };

  const generateData = () => {
    const result = Object.values(TIME).map((time) => {
      const mw = "mw_" + time.replace(".", "");

      const dataGrafik = grafikPembangkit?.map(
        (value: DataGrafikPembangkit, index) => ({
          [value?.nama]: (value?.data as any)[mw]! || 0,
        })
      );

      return {
        time,
        ...Object.assign({}, ...dataGrafik),
      };
    });

    return result;
  };

  const colorGrafik = grafikPembangkit?.map(
    (value: DataGrafikPembangkit, index) => ({
      nama: value.nama,
      color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
    })
  );

  useEffect(() => {
    if (id && date) {
      getAllDataGrafik();
    }
  }, [id, date]);

  return (
    <RechartsWrapper>
      <Card>
        <CardHeader
          title={`Grafik Beban ${name}`}
          action={
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePickerMui
                value={date}
                inputFormat="dd/M/yyyy"
                onChange={(e) => setDate(e)}
                renderInput={(params) => (
                  <TextField size="small" {...params} sx={{ width: "250px" }} />
                )}
              />
            </LocalizationProvider>
          }
        />
        <Divider />
        <CardContent>
          <Box sx={{ height: 350 }}>
            <ResponsiveContainer>
              <LineChart
                height={350}
                data={generateData()}
                style={{ direction }}
              >
                <CartesianGrid />
                <XAxis dataKey="time" reversed={false} />
                <YAxis orientation="left" />
                <Tooltip content={CustomTooltip} />
                {colorGrafik?.map((value) => (
                  <Line
                    dataKey={value.nama}
                    stroke={value?.color}
                    strokeWidth={3}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </Box>
        </CardContent>
      </Card>
    </RechartsWrapper>
  );
};

export default GrafikPembangkit;
