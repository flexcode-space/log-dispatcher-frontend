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
import {
  TableHead,
  TableCellHead,
  TableContainer,
  TableCell,
  TableRow,
  Table,
  TableBody,
} from "src/components/table";

const Gas = () => {
  const [search, setSearch] = useState<string>("");

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <PageHeader title={<Typography variant="h5">Gas</Typography>} />
      </Grid>
      <Grid item xs={12}>
        <Card>
          <CardHeader
            title="Monitoring Gas"
            action={
              <WrapperFilter>
                <TextField
                  size="small"
                  value={search}
                  sx={{ mr: 6, mb: 2 }}
                  placeholder="Cari"
                  onChange={(e) => setSearch(e.target.value)}
                />
                <div style={{ display: "flex", gap: "10px" }}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePickerMui
                      value={null}
                      label="Pilih Tanggal"
                      onChange={() => null}
                      renderInput={(params) => (
                        <TextField
                          size="small"
                          {...params}
                          sx={{ width: "200px" }}
                        />
                      )}
                    />
                  </LocalizationProvider>
                  <Button
                    sx={{ mb: 2 }}
                    onClick={() => null}
                    variant="outlined"
                  >
                    Edit Data
                  </Button>
                </div>
              </WrapperFilter>
            }
          />
          <CardContent>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCellHead rowSpan={2}>Jam</TableCellHead>
                    <TableCellHead align="center" colSpan={2}>
                      SPP
                    </TableCellHead>
                    <TableCellHead align="center" colSpan={4}>
                      KJG
                    </TableCellHead>
                    <TableCellHead align="center" colSpan={4}>
                      JTB
                    </TableCellHead>
                    <TableCellHead rowSpan={2}>Stock CNG</TableCellHead>
                    <TableCellHead rowSpan={2}>Compressor</TableCellHead>
                    <TableCellHead rowSpan={2}>Flow Decanting</TableCellHead>
                    <TableCellHead align="center" colSpan={2}>
                      estimasi cng decanting
                    </TableCellHead>
                  </TableRow>
                  <TableRow>
                    <TableCellHead>Tekanan (PSI)</TableCellHead>
                    <TableCellHead>Flow Sumur</TableCellHead>
                    <TableCellHead>Tekanan (PSI)</TableCellHead>
                    <TableCellHead>Flow Sumur</TableCellHead>
                    <TableCellHead>Flow Serap</TableCellHead>
                    <TableCellHead>Akumulasi</TableCellHead>
                    <TableCellHead>Tekanan (PSI)</TableCellHead>
                    <TableCellHead>Flow Sumur</TableCellHead>
                    <TableCellHead>Flow Serap</TableCellHead>
                    <TableCellHead>Akumulasi</TableCellHead>
                    <TableCellHead>Habis (Jam)</TableCellHead>
                    <TableCellHead>Daily Rate (Jam)</TableCellHead>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {[0, 1, 2, 3, 4, 5].map(() => (
                    <TableRow hover>
                      <TableCell>06.00</TableCell>
                      <TableCell>324</TableCell>
                      <TableCell>324</TableCell>
                      <TableCell>324</TableCell>
                      <TableCell>324</TableCell>
                      <TableCell>324</TableCell>
                      <TableCell>324</TableCell>
                      <TableCell>324</TableCell>
                      <TableCell>324</TableCell>
                      <TableCell>324</TableCell>
                      <TableCell>324</TableCell>
                      <TableCell>324</TableCell>
                      <TableCell>324</TableCell>
                      <TableCell>324</TableCell>
                      <TableCell>324</TableCell>
                      <TableCell>324</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Gas;
