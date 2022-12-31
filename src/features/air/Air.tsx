import { useState, useMemo } from "react";
import { GridColumns } from "@mui/x-data-grid";
import {
  Card,
  CardContent,
  Grid,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import DatePickerMui from "@mui/lab/DatePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import PageHeader from "src/@core/components/page-header";
import { CardHeader } from "src/components/card";
import { WrapperFilter } from "src/components/filter";
import { DataGrid } from "@mui/x-data-grid";
import { TIME } from "src/constants/time";

import { defaultColumns, datamock } from "./Air.constant";
import dayjs, { Dayjs } from "dayjs";
import { TableInflow } from "./table-list";

const Air = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <PageHeader title={<Typography variant="h5">Air</Typography>} />
      </Grid>
      <Grid item xs={12}>
        <TableInflow />
      </Grid>
    </Grid>
  );
};

export default Air;
