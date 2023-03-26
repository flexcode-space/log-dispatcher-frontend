import { useCallback, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import dayjs, { Dayjs } from "dayjs";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import "dayjs/locale/id";
import RechartsWrapper from "src/@core/styles/libs/recharts";
import { CardHeader } from "src/components/card";
import { grafikApi } from "src/api/grafik";
import { convertDate } from "src/utils/date";
import CustomTooltip from "../components/CustomTooltips";
import { MenuGrafikDistribusi } from "../components/menu-grafik-distribusi";
import { TIME } from "src/constants/time";

dayjs.locale("id");

type GrafikBebanDistribusiProps = {
  title?: string;
};

const GrafikBebanDistribusi = ({
  title = "Grafik Beban Distribusi",
}: GrafikBebanDistribusiProps): JSX.Element => {
  const [dateList, setDateList] = useState<string[]>([
    dayjs().format("YYYY-MM-DD"),
  ]);
  const [grafikBebanList, setGrafikBebanList] = useState<Array<{}>>([]);
  const { getGrafik } = grafikApi();

  const direction = "ltr";

  const handleSelectDate = (value: Dayjs | null) => {
    if (value !== null) {
      const date = dayjs(value).format("YYYY-MM-DD");
      const isHasDate = dateList.includes(date);
      if (!isHasDate) {
        setDateList((prevState) => [...prevState, date]);
      }
    }
  };

  const removeSelectDate = (value: string) => {
    // @ts-ignore
    const filterData = grafikBebanList.filter((grafik) => grafik?.[value])[0];
    const indexGrafik = grafikBebanList.indexOf(filterData);

    // remove old grafik data
    const newGrafikList = [...grafikBebanList];
    newGrafikList.splice(indexGrafik, 1);
    setGrafikBebanList(newGrafikList);

    // remove date list
    const index = dateList.indexOf(value);
    const newDateList = [...dateList];
    newDateList.splice(index, 1);
    setDateList(newDateList);
  };

  const getAllGrafikBeban = () => {
    dateList.map((value) => {
      getGrafik({ tanggal: value }).then((result: Object) => {
        const isHasDate = grafikBebanList.find((date) => {
          const name = Object.keys(date)[0];
          return name === value;
        });

        const newGrafikBebanList = [...grafikBebanList];
        if (isHasDate === undefined) {
          newGrafikBebanList.push({ [value]: result });
        }

        setGrafikBebanList([...newGrafikBebanList]);
      });
    });
  };

  const generateData = useCallback(() => {
    const result = Object.values(TIME).map((time) => {
      const mw = "mw_" + time.replace(".", "");

      const dataGrafik = grafikBebanList?.map((value: any) => {
        const name = Object.keys(value)[0];
        const data = Object.values(value)[0];
        return {
          [name]: (data as any)[mw]! || 0,
        };
      });

      return {
        time,
        ...Object.assign({}, ...dataGrafik),
      };
    });

    return result;
  }, [grafikBebanList]);

  const colorGrafik = grafikBebanList?.map((value: any) => {
    const name = Object.keys(value)[0];
    return {
      name,
      color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
    };
  });

  useEffect(() => {
    getAllGrafikBeban();
  }, [dateList]);

  return (
    <RechartsWrapper>
      <Card>
        <CardHeader
          title={title}
          action={
            <MenuGrafikDistribusi
              dateList={dateList}
              handleSelectDate={handleSelectDate}
              removeSelectDate={removeSelectDate}
            />
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
                    key={value.name}
                    dataKey={value?.name}
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

export default GrafikBebanDistribusi;
