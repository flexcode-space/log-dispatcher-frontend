import { useEffect, useState } from "react";
import { useRouter } from "next/router";
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
import { useSnapshot } from "valtio";
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
import { manuverApi } from "src/api/manuver";
import { ManuverList } from "./types";
import { selectData } from "./state/manuver";
import { reloadPage } from "src/state/reloadPage";

const Manuver = () => {
  const router = useRouter();
  const gangguanId = router.query.id as string;

  const reloadPageSnap = useSnapshot(reloadPage);

  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);

  const { getManuverList, manuverList } = manuverApi();

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    getManuverList({ gangguan_id: gangguanId });
  }, [gangguanId]);

  useEffect(() => {
    if (reloadPageSnap.target === "manuver") {
      getManuverList({ gangguan_id: gangguanId });
    }
  }, [reloadPageSnap.id]);

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
              title=""
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
                    onClick={() => openModal("modal-add-manuver")}
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
                    {manuverList.length > 0 &&
                      manuverList.map((list: ManuverList, index: number) => (
                        <TableRow key={list.id} hover>
                          <TableCell size="small">{index + 1}</TableCell>
                          <TableCell size="small">
                            {list.gardu_induk.nama}
                          </TableCell>
                          <TableCell size="small">{list.jurusan}</TableCell>
                          <TableCell size="small">{list.buka}</TableCell>
                          <TableCell size="small">{list.tutup}</TableCell>
                          <TableCell size="small">{list.keterangan}</TableCell>
                          <TableCell size="small">
                            <Box display="flex">
                              <IconButton
                                onClick={() => {
                                  openModal("modal-add-manuver", list.id);
                                  selectData(list);
                                }}
                              >
                                <Pencil />
                              </IconButton>
                            </Box>
                          </TableCell>
                        </TableRow>
                      ))}
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
