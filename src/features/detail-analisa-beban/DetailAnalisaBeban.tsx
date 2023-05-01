import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Breadcrumbs,
  Link,
} from "@mui/material";
import { useRouter } from "next/router";
import DatePickerMui from "@mui/lab/DatePicker";
import Grid from "@mui/material/Grid";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { DataGrid } from "@mui/x-data-grid";
import { WrapperFilter } from "src/components/filter";
import { defaultColumns } from "./DetailAnalisaBeban.constant";
import PageHeader from "src/@core/components/page-header";
import dayjs, { Dayjs } from "dayjs";
import { analisaBebanApi } from "src/api/analisa-beban";

const AnalisaBeban = () => {
  const router = useRouter();

  const id = router.query.id as string;
  const name = router.query.nama as string;
  const tanggal = router.query.tanggal as string;

  const [date, setDate] = useState<Dayjs | null>(dayjs(tanggal, "YYYY-MM-DD"));
  const [limit, setLimit] = useState<number>(100);
  const [page, setPage] = useState<number>(1);
  // const [search, setSearch] = useState<string>("");

  const { getBebanSubsistemDetailList, bebanSubsistemDetail } =
    analisaBebanApi();

  console.log("bebanSubsistemDetail", bebanSubsistemDetail);

  useEffect(() => {
    getBebanSubsistemDetailList(id, {
      tanggal: dayjs(date).format("YYYY-MM-DD"),
    });
  }, [date]);

  return (
    <>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <WrapperFilter sx={{ alignItems: "center" }}>
            <Grid item>
              <Breadcrumbs aria-label="breadcrumb" sx={{ mb: "20px" }}>
                <Link
                  underline="hover"
                  color="inherit"
                  href="/beban/analisa-beban"
                >
                  Analisa Beban
                </Link>
                <Typography color="text.primary">{name}</Typography>
              </Breadcrumbs>
              <PageHeader
                title={
                  <Typography variant="h5">{`Monitoring ${name}`}</Typography>
                }
              />
            </Grid>
            <Grid item xs={2}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePickerMui
                  value={date}
                  inputFormat="dd/M/yyyy"
                  label="Tanggal"
                  onChange={(e) => setDate(e)}
                  renderInput={(params) => (
                    <TextField size="small" {...params} fullWidth />
                  )}
                />
              </LocalizationProvider>
            </Grid>
          </WrapperFilter>
        </Grid>
        <Grid item xl={12}>
          <Card>
            <CardContent>
              <WrapperFilter sx={{ alignItems: "baseline" }}>
                <Typography variant="h6">Monitoring Peralatan</Typography>
              </WrapperFilter>
              <DataGrid
                getRowId={(row) =>
                  `${row.gardu_induk}_${(Math.random() + 1)
                    .toString(36)
                    .substring(7)}`
                }
                autoHeight
                rowsPerPageOptions={[10, 20, 25, 50, 100]}
                rows={bebanSubsistemDetail}
                columns={defaultColumns}
                pageSize={limit}
                rowCount={bebanSubsistemDetail.length}
                onPageSizeChange={(newPageSize) => setLimit(newPageSize)}
                onPageChange={(currentPage) => setPage(currentPage + 1)}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default AnalisaBeban;
