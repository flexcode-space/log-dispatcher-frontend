import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
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
import { MenuGrafikDistribusi } from "../components/menu-grafik-distribusi";

type GrafikBebanDistribusiProps = {
  title?: string;
  path?: string;
};

const GrafikBebanDistribusi = ({
  title = "Grafik Beban Distribusi",
  path,
}: GrafikBebanDistribusiProps): JSX.Element => {
  const [date, setDate] = useState<any>(new Date());
  const { getGrafik, grafikBeban } = grafikApi();

  const direction = "ltr";

  useEffect(() => {
    getGrafik({ tanggal: convertDate(date) }, path);
  }, [date]);

  return (
    <RechartsWrapper>
      <Card>
        <CardHeader title={title} action={<MenuGrafikDistribusi />} />
        <Divider />
        <CardContent>
          <Box sx={{ height: 350 }}>
            <ResponsiveContainer>
              <LineChart
                height={350}
                data={grafikBeban}
                style={{ direction }}
                // margin={{ left: -20 }}
              >
                <CartesianGrid />
                <XAxis dataKey="time" reversed={false} />
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

export default GrafikBebanDistribusi;
