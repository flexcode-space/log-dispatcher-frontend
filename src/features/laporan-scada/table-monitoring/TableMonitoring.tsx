import { Card, CardContent, IconButton } from "@mui/material";
import { Pencil, TrashCanOutline } from "mdi-material-ui";
import { CardHeader } from "src/components/card";
import { useContext, useEffect } from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableCellHead,
  TableContainer,
} from "src/components/table";
import { selectData } from "../state/laporanScada";
import { laporanScadaApi } from "src/api/laporan-scada";
import { LaporanScadaList } from "../types";
import { openModal } from "src/state/modal";
import dayjs from "dayjs";
import { useSnapshot } from "valtio";
import { reloadPage } from "src/state/reloadPage";
import { AbilityContext } from "src/layouts/components/acl/Can";

type TableMonitoringProps = {
  title: string;
  type: string;
};

const TableMonitoring = ({ title, type }: TableMonitoringProps) => {
  const ability = useContext(AbilityContext);

  const reloadPageSnap = useSnapshot(reloadPage);
  const { getLaporanScadaList, laporanScadaList } = laporanScadaApi();

  useEffect(() => {
    getLaporanScadaList({ tipe: type });
  }, []);

  useEffect(() => {
    if (reloadPageSnap.target === "laporan-scada") {
      getLaporanScadaList({ tipe: type });
    }
  }, [reloadPage.id]);

  return (
    <Card>
      <CardHeader title={title} />
      <CardContent>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCellHead>Tanggal</TableCellHead>
                <TableCellHead minWidth="150px">Gardu Induk</TableCellHead>
                <TableCellHead>Bay</TableCellHead>
                <TableCellHead minWidth="300px">Keterangan</TableCellHead>
                <TableCellHead>Tanggal Konfirmasi</TableCellHead>
                <TableCellHead>Aksi scada</TableCellHead>
                <TableCellHead>Aset</TableCellHead>
                <TableCellHead>Status</TableCellHead>
                <TableCellHead>Aksi</TableCellHead>
              </TableRow>
            </TableHead>
            <TableBody>
              {laporanScadaList.length > 0 &&
                laporanScadaList.map((list: LaporanScadaList) => (
                  <TableRow hover key={list.id}>
                    <TableCell size="small">
                      {dayjs(list.tanggal).format("DD MMMM YYYY")}
                    </TableCell>
                    <TableCell size="small">{list.gardu_induk.nama}</TableCell>
                    <TableCell size="small">{list.bay}</TableCell>
                    <TableCell size="small">{list.keterangan}</TableCell>
                    <TableCell size="small">
                      {list.tanggal_konfirmasi}
                    </TableCell>
                    <TableCell size="small">{list.aksi}</TableCell>
                    <TableCell size="small">{list.aset}</TableCell>
                    <TableCell size="small">{list.status}</TableCell>
                    <TableCell size="small">
                      {ability?.can("update", "laporan-scada-page") ? (
                        <IconButton
                          onClick={() => {
                            openModal("modal-laporan-scada", list.id);
                            selectData(list as LaporanScadaList);
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
  );
};

export default TableMonitoring;
