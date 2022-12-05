import { useState } from "react";
import {
  Grid,
  Typography,
  Button,
  Card,
  CardContent,
  IconButton,
  Breadcrumbs,
  Box,
  Link,
} from "@mui/material";
import TablePagination from "@mui/material/TablePagination";
import { Pencil } from "mdi-material-ui";
import PageHeader from "src/@core/components/page-header";
import { WrapperFilter } from "src/components/filter";
import { openModal } from "src/state/modal";
import { CardHeader } from "src/components/card";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableCellHead,
  TableContainer,
} from "src/components/table";
import FilterGreenIcon from "src/assets/icons/filter-green-icon.svg";
import DownloadGreenIcon from "src/assets/icons/download-green-icon.svg";
import { ModalAddManuver } from "./modal";

const Manuver = () => {
  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
      <ModalAddManuver />
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Breadcrumbs aria-label="breadcrumb" sx={{ mb: "20px" }}>
            <Link underline="hover" color="inherit" href="/gangguan">
              Laporan Gangguan dan Tindakan
            </Link>
            <Typography color="text.primary">Manuver</Typography>
          </Breadcrumbs>
          <PageHeader title={<Typography variant="h5">Manuver</Typography>} />
        </Grid>
        <Grid item xs={12}>
          <Card>
            <WrapperFilter></WrapperFilter>
            <CardHeader
              title="KSGHN - 23 Oktober 2022"
              action={
                <div style={{ display: "flex", gap: "10px" }}>
                  <Button
                    variant="outlined"
                    size="small"
                    sx={{ height: "40px" }}
                  >
                    <IconButton>
                      <FilterGreenIcon />
                    </IconButton>
                    Filter
                  </Button>
                  <Button
                    variant="outlined"
                    size="small"
                    sx={{ height: "40px" }}
                  >
                    <IconButton>
                      <DownloadGreenIcon />
                    </IconButton>
                    Download laporan
                  </Button>
                  <Button
                    variant="contained"
                    size="small"
                    sx={{ height: "40px" }}
                    onClick={() => openModal("", "modal-add-manuver")}
                  >
                    Tambah Manuver
                  </Button>
                </div>
              }
            />
            <CardContent>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCellHead rowSpan={2}>No</TableCellHead>
                      <TableCellHead rowSpan={2}>Lokasi</TableCellHead>
                      <TableCellHead rowSpan={2}>Jurusan</TableCellHead>
                      <TableCellHead colSpan={2} align="center">
                        Jam
                      </TableCellHead>
                      <TableCellHead minWidth="250px" rowSpan={2}>
                        Keterangan
                      </TableCellHead>
                      <TableCellHead rowSpan={2}>Aksi</TableCellHead>
                    </TableRow>
                    <TableRow>
                      <TableCellHead>Buka</TableCellHead>
                      <TableCellHead>Tutup</TableCellHead>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow hover>
                      <TableCell size="small">1</TableCell>
                      <TableCell size="small">KSGHN</TableCell>
                      <TableCell size="small">Bagoes - Chiba</TableCell>
                      <TableCell size="small">07:02</TableCell>
                      <TableCell size="small">07:02</TableCell>
                      <TableCell size="small">200 MW</TableCell>
                      <TableCell size="small">
                        <Box display="flex">
                          <IconButton>
                            <Pencil />
                          </IconButton>
                        </Box>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={12}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default Manuver;
