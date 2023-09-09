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
import { laporanPoskoApdApi } from "src/api/laporan-posko";
import { LaporanPoskoList } from "./types";
import dayjs from "dayjs";
import { selectData } from "./state/laporanPosko";
import { ModalAdd } from "./modal";
import { useSnapshot } from "valtio";
import { reloadPage } from "src/state/reloadPage";
import { AbilityContext } from "src/layouts/components/acl/Can";

const LaporanPoskoApd = () => {
  const ability = useContext(AbilityContext);

  const reloadPageSnap = useSnapshot(reloadPage);
  const { getLaporanPoskoList, laporanPoskoList } = laporanPoskoApdApi();

  useEffect(() => {
    getLaporanPoskoList();
  }, []);

  useEffect(() => {
    if (reloadPageSnap.target === "laporan-posko") {
      getLaporanPoskoList();
    }
  }, [reloadPageSnap]);

  return (
    <>
      <ModalAdd />
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <WrapperFilter>
            <Grid item xs={12}>
              <PageHeader
                title={<Typography variant="h5">Posko APD</Typography>}
              />
            </Grid>
          </WrapperFilter>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <CardHeader
              title="Kondisi Sistem Kelistrikan"
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
                  {ability?.can("create", "laporan-posko-page") ? (
                    <Button
                      variant="contained"
                      size="small"
                      sx={{ height: "40px" }}
                      onClick={() => openModal("modal-laporan-posko")}
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
                      <TableCellHead>Tanggal</TableCellHead>
                      <TableCellHead>Periode</TableCellHead>
                      <TableCellHead>Pasokan IBT & Transfer</TableCellHead>
                      <TableCellHead>Pasokan Kit</TableCellHead>
                      <TableCellHead>Beban Puncak</TableCellHead>
                      <TableCellHead>Cadangan kit</TableCellHead>
                      <TableCellHead>Status</TableCellHead>
                      <TableCellHead minWidth="400px">Keterangan</TableCellHead>
                      <TableCellHead>Aksi</TableCellHead>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {laporanPoskoList.length > 0 &&
                      laporanPoskoList.map((list: LaporanPoskoList) => (
                        <TableRow key={list.id} hover>
                          <TableCell size="small">
                            {dayjs(list.tanggal).format("DD-MM-YYYY")}
                          </TableCell>
                          <TableCell size="small">{list.periode}</TableCell>
                          <TableCell size="small">{list.pasokan_ibt}</TableCell>
                          <TableCell size="small">{list.pasokan_kit}</TableCell>
                          <TableCell size="small">
                            {list.beban_puncak}
                          </TableCell>
                          <TableCell size="small">
                            {list.cadangan_kit}
                          </TableCell>
                          <TableCell size="small">{list.status}</TableCell>
                          <TableCell size="small">{list.keterangan}</TableCell>
                          <TableCell size="small">
                            {ability?.can("update", "laporan-posko-page") ? (
                              <IconButton
                                onClick={() => {
                                  openModal("modal-laporan-posko", list.id);
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

export default LaporanPoskoApd;
