import { useEffect } from "react";
import {
  Grid,
  Typography,
  Button,
  Card,
  CardContent,
  IconButton,
} from "@mui/material";
import { Pencil } from "mdi-material-ui";
import PageHeader from "src/@core/components/page-header";
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
import { ModalAdd } from "./modal";
import { openModal } from "src/state/modal";
import { rekonfigurasiApi } from "src/api/rekonfigurasi";
import { RekonfigurasiList } from "./types";
import { selectData } from "./state/rekonfigurasi";
import { useSnapshot } from "valtio";
import { reloadPage } from "src/state/reloadPage";

const Rekonfigurasi = () => {
  const reloadPageSnap = useSnapshot(reloadPage);

  const { getRekonfigurasiList, rekonfigurasiList } = rekonfigurasiApi();

  useEffect(() => {
    getRekonfigurasiList();
  }, []);

  useEffect(() => {
    if (reloadPageSnap.target === "rekonfigurasi") {
      getRekonfigurasiList();
    }
  }, [reloadPageSnap.target]);

  return (
    <>
      <ModalAdd />
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <PageHeader
            title={<Typography variant="h5">Rekonfigurasi</Typography>}
          />
        </Grid>
        <Grid item xs={12}>
          <Card>
            <CardHeader
              title="Catatan Rekonfigurasi Antar Area & Antar Subsistem"
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
                    variant="contained"
                    size="small"
                    sx={{ height: "40px" }}
                    onClick={() => openModal("modal-rekonfigurasi")}
                  >
                    Tambah Data
                  </Button>
                </div>
              }
            />
            <CardContent>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCellHead>GI/Peralatan</TableCellHead>
                      <TableCellHead>Waktu</TableCellHead>
                      <TableCellHead>Subsistem Awal</TableCellHead>
                      <TableCellHead>Subsistem Akhir</TableCellHead>
                      <TableCellHead minWidth="300px">
                        Alasan Rekonfigurasi
                      </TableCellHead>
                      <TableCellHead minWidth="300px">Keterangan</TableCellHead>
                      <TableCellHead>Aksi</TableCellHead>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rekonfigurasiList.length > 0 &&
                      rekonfigurasiList.map((list: RekonfigurasiList) => (
                        <TableRow hover key={list.id}>
                          <TableCell>{list.gi}</TableCell>
                          <TableCell>{list.waktu}</TableCell>
                          <TableCell>{list.sub_sistem_awal.nama}</TableCell>
                          <TableCell>{list.sub_sistem_akhir.nama}</TableCell>
                          <TableCell>{list.alasan_rekonfigurasi}</TableCell>
                          <TableCell>{list.keterangan}</TableCell>
                          <TableCell>
                            <IconButton
                              onClick={() => {
                                openModal("modal-rekonfigurasi", list.id);
                                selectData(list);
                              }}
                            >
                              <Pencil />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default Rekonfigurasi;
