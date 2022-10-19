import { forwardRef, useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import InputAdornment from "@mui/material/InputAdornment";
import Divider from "@mui/material/Divider";
import format from "date-fns/format";
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

import { DatePicker } from "src/components/date-picker";
// import DatePicker from "react-datepicker";

import CustomChip from "src/@core/components/mui/chip";
import ArrowUp from "mdi-material-ui/ArrowUp";
import Circle from "mdi-material-ui/Circle";
import BellOutline from "mdi-material-ui/BellOutline";
import ChevronDown from "mdi-material-ui/ChevronDown";

interface Props {
  direction: "ltr" | "rtl";
}

export type DateType = Date | null | undefined;

interface PickerProps {
  start: Date | number;
  end: Date | number;
}

const Grafik = () => {
  const [endDate, setEndDate] = useState<DateType>(null);
  const [startDate, setStartDate] = useState<DateType>(new Date());

  const formMethods = useForm({
    // resolver: yupResolver(validationSchema),
    // defaultValues: initialValues,
    mode: "onChange",
  });

  const data = [
    {
      name: "7/12",
      Sales: 20,
      Clicks: 60,
      Visits: 100,
    },
    {
      name: "8/12",
      Sales: 40,
      Clicks: 80,
      Visits: 120,
    },
    {
      name: "9/12",
      Sales: 30,
      Clicks: 70,
      Visits: 90,
    },
    {
      name: "10/12",
      Sales: 70,
      Clicks: 110,
      Visits: 170,
    },
    {
      name: "11/12",
      Sales: 40,
      Clicks: 80,
      Visits: 130,
    },
    {
      name: "12/12",
      Sales: 60,
      Clicks: 80,
      Visits: 160,
    },
    {
      name: "13/12",
      Sales: 50,
      Clicks: 100,
      Visits: 140,
    },
    {
      name: "14/12",
      Sales: 140,
      Clicks: 90,
      Visits: 240,
    },
    {
      name: "15/12",
      Sales: 120,
      Clicks: 180,
      Visits: 220,
    },
    {
      name: "16/12",
      Sales: 100,
      Clicks: 160,
      Visits: 180,
    },
    {
      name: "17/12",
      Sales: 140,
      Clicks: 140,
      Visits: 270,
    },
    {
      name: "18/12",
      Sales: 180,
      Clicks: 200,
      Visits: 280,
    },
    {
      name: "19/12",
      Sales: 220,
      Clicks: 220,
      Visits: 375,
    },
  ];

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

  const handleOnChange = (dates: any) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const CustomInput = forwardRef((props: PickerProps, ref) => {
    const startDate = format(props.start, "MM/dd/yyyy");
    const endDate =
      props.end !== null ? ` - ${format(props.end, "MM/dd/yyyy")}` : null;

    const value = `${startDate}${endDate !== null ? endDate : ""}`;

    return (
      <TextField
        {...props}
        size="small"
        value={value}
        inputRef={ref}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <BellOutline />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <ChevronDown />
            </InputAdornment>
          ),
        }}
      />
    );
  });

  const direction = "ltr";
  return (
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
        <CardContent>
          <Box sx={{ height: 350 }}>
            <ResponsiveContainer>
              <LineChart
                height={350}
                data={data}
                style={{ direction }}
                margin={{ left: -20 }}
              >
                <CartesianGrid />
                <XAxis dataKey="name" reversed={false} />
                <YAxis orientation="left" />
                <Tooltip content={CustomTooltip} />
                <Line dataKey="Sales" stroke="#4AA1B9" strokeWidth={3} />
                <Line dataKey="Visits" stroke="#ff9f43" strokeWidth={3} />
                <Line dataKey="Clicks" stroke="#ff9f43" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </Box>
        </CardContent>
      </Card>
    </RechartsWrapper>
  );
};

export default Grafik;
