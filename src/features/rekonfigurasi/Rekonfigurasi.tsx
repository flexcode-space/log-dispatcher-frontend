import { useContext, useEffect } from "react";
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
import { AbilityContext } from "src/layouts/components/acl/Can";

const Rekonfigurasi = () => {
  const ability = useContext(AbilityContext);

  const reloadPageSnap = useSnapshot(reloadPage);

  const { getRekonfigurasiList, rekonfigurasiList } = rekonfigurasiApi();

  useEffect(() => {
    getRekonfigurasiList();
  }, []);

  useEffect(() => {
    if (reloadPageSnap.target === "rekonfigurasi") {
      getRekonfigurasiList();
    }
  }, [reloadPageSnap.id]);

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
                  {/* <Button
                    variant="outlined"
                    size="small"
                    sx={{ height: "40px" }}
                  >
                    <IconButton>
                      <FilterGreenIcon />
                    </IconButton>
                    Filter
                  </Button> */}
                  {ability?.can("create", "rekonfigurasi-page") ? (
                    <Button
                      variant="contained"
                      size="small"
                      sx={{ height: "40px" }}
                      onClick={() => openModal("modal-rekonfigurasi")}
                    >
                      Tambah Data
                    </Button>
                  ) : null}
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
                          <TableCell size="small">{list.gi}</TableCell>
                          <TableCell size="small">{list.waktu}</TableCell>
                          <TableCell size="small">
                            {list.sub_sistem_awal.nama}
                          </TableCell>
                          <TableCell size="small">
                            {list.sub_sistem_akhir.nama}
                          </TableCell>
                          <TableCell size="small">
                            {list.alasan_rekonfigurasi}
                          </TableCell>
                          <TableCell size="small">{list.keterangan}</TableCell>
                          <TableCell size="small">
                            {ability?.can("update", "rekonfigurasi-page") ? (
                              <IconButton
                                onClick={() => {
                                  openModal("modal-rekonfigurasi", list.id);
                                  selectData(list);
                                }}
                              >
                                <Pencil />
                              </IconButton>
                            ) : null}
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
