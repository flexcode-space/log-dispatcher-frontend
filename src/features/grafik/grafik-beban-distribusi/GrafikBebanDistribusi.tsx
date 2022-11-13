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

const GrafikBebanDistribusi = (): JSX.Element => {
  const [date, setDate] = useState<any>(new Date());
  const [grafikSubsistem, setGrafikSubsistem] = useState<[]>([]);
  const { getGrafik } = grafikApi();

  const direction = "ltr";

  const getAllDataGrafik = () => {
    getGrafik({ tanggal: convertDate(date) }).then((response) => {
      // const keyTanggal = `tanggal_${index + 1}`;
      // @ts-ignore
      const tempArray = [];
      response.map((value) => {
        tempArray.push({
          time: value.time,
          tanggal: value.value,
        });
      });

      // @ts-ignore
      setGrafikSubsistem(tempArray);
    });
  };

  useEffect(() => {
    getAllDataGrafik();
  }, [date]);

  return (
    <RechartsWrapper>
      <Card>
        <CardHeader
          title="Grafik Beban Distribusi"
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
                data={grafikSubsistem}
                style={{ direction }}
                // margin={{ left: -20 }}
              >
                <CartesianGrid />
                <XAxis dataKey="time" reversed={false} />
                <YAxis orientation="left" />
                <Tooltip content={CustomTooltip} />
                <Line dataKey="tanggal" stroke="#4AA1B9" strokeWidth={3} />
                {/* <Line
                      dataKey="tanggal_2"
                      stroke="#ff9f43"
                      strokeWidth={3}
                    /> */}
              </LineChart>
            </ResponsiveContainer>
          </Box>
        </CardContent>
      </Card>
    </RechartsWrapper>
  );
};

export default GrafikBebanDistribusi;
