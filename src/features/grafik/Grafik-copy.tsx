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
import SelectIcon from "src/assets/icons/select-icon.svg";
import CloseIcon from "src/assets/icons/close-icon.svg";

import { DATA } from "./Grafik.constant";
import { convertDate } from "src/utils/date";

export type DateType = Date | null | undefined;

interface PickerProps {
  start: Date | number;
  end: Date | number;
}

type Data = {
  time: any;
  value: any;
};

// @ts-ignore
// const initialDate = convertDate(new Date());
const initialDate = "2022-10-13";

const Grafik = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openDatePicker, setOpenDatePicker] = useState<boolean>(false);
  const [dates, setDates] = useState<string[]>([initialDate]);
  const [grafikSubsistem, setGrafikSubsistem] = useState<[]>([]);
  // const [dataSubsistem, setDataSubsistem] = useState<[]>([]);
  const { getGrafik } = grafikApi();

  const direction = "ltr";

  const formMethods = useForm({
    // resolver: yupResolver(validationSchema),
    // defaultValues: initialValues,
    mode: "onChange",
  });

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAddDate = (date: any) => {
    const tanggal = convertDate(date);
    setDates((prevState) => {
      return [...prevState, tanggal];
    });
  };

  const getAllDataGrafik = useCallback(() => {
    dates.map((date, index) => {
      const tempArray = [];
      getGrafik({ tanggal: date }).then((response) => {
        const keyTanggal = `tanggal_${index + 1}`;
        response.map((value) => {
          tempArray.push({
            time: value.time,
            [keyTanggal]: value.value,
          });
        });

        setGrafikSubsistem(tempArray);
      });
    });
  }, [dates]);

  console.log("grafikSubsistem", grafikSubsistem);

  // const GetData = useCallback(() => {
  //   // @ts-ignore
  //   return Object.values(grafikSubsistem).map((value: Data[], index) => {
  //     return value.map((el) => {
  //       const key = `tanggal_${index + 1}`;
  //       return {
  //         time: el.time,
  //         [key]: el.value,
  //       };
  //     });
  //   });
  // }, [grafikSubsistem]);

  // console.log("GetData", GetData());

  useEffect(() => {
    getAllDataGrafik();
  }, [dates]);

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
                    {i.dataKey} : {formatDecimalNumber(i.payload[i.dataKey])}
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
              action={
                <>
                  <Button
                    variant="outlined"
                    sx={{ borderColor: "#4c4e6461", color: "#4c4e6461" }}
                    aria-haspopup="true"
                    onClick={handleClick}
                  >
                    <span style={{ marginRight: "10px" }}>Tanggal Laporan</span>
                    <SelectIcon />
                  </Button>
                  <Menu
                    keepMounted
                    id="simple-menu"
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    open={Boolean(anchorEl)}
                  >
                    {dates?.map((date) => {
                      return (
                        <MenuItem onClick={() => null}>
                          <ListItemText>{date}</ListItemText>
                        </MenuItem>
                      );
                    })}
                    <Divider />
                    <MenuItem onClick={() => null}>
                      <ListItemText>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                          <DatePickerMui
                            value={new Date()}
                            inputFormat="dd/M/yyyy"
                            onChange={handleAddDate}
                            renderInput={(params) => (
                              <TextField
                                size="small"
                                {...params}
                                // sx={{ width: "250px" }}
                              />
                            )}
                          />
                        </LocalizationProvider>
                      </ListItemText>
                    </MenuItem>
                    {/* <MenuItem onClick={() => null}>22 September 2022</MenuItem>
                    <MenuItem onClick={() => null}>22 September 2022</MenuItem> */}
                  </Menu>
                </>
                // <FormProvider {...formMethods}>
                //   <StyledForm noValidate onSubmit={() => null}>
                //     <LocalizationProvider dateAdapter={AdapterDateFns}>
                //       <DatePicker
                //         size="small"
                //         label="Tanggal Laporan"
                //         name="tanggal"
                //       />
                //     </LocalizationProvider>
                //   </StyledForm>
                // </FormProvider>
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
                    <Line
                      dataKey="tanggal_1"
                      stroke="#4AA1B9"
                      strokeWidth={3}
                    />
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
      </Grid>

      <Grid item xs={12} sm={6}>
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
      </Grid>
    </Grid>
  );
};

export default Grafik;
