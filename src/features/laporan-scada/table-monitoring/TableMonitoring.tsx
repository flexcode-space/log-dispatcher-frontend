import { Card, CardContent, IconButton } from "@mui/material";
import { Pencil, TrashCanOutline } from "mdi-material-ui";
import { CardHeader } from "src/components/card";
import { useEffect } from "react";
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

type TableMonitoringProps = {
  title: string;
  type: string;
};

const TableMonitoring = ({ title, type }: TableMonitoringProps) => {
  const reloadPageSnap = useSnapshot(reloadPage);
  const { getLaporanScadaList, laporanScadaList } = laporanScadaApi();

  useEffect(() => {
    getLaporanScadaList({ tipe: type });
  }, []);

  useEffect(() => {
    if (reloadPageSnap.target === "laporan-scada") {
      getLaporanScadaList({ tipe: type });
    }
  }, [reloadPage.target]);

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
                    <TableCell>
                      {dayjs(list.tanggal).format("DD MMMM YYYY")}
                    </TableCell>
                    <TableCell>{list.gardu_induk.nama}</TableCell>
                    <TableCell>{list.bay}</TableCell>
                    <TableCell>{list.keterangan}</TableCell>
                    <TableCell>{list.tanggal_konfirmasi}</TableCell>
                    <TableCell>{list.aksi}</TableCell>
                    <TableCell>{list.aset}</TableCell>
                    <TableCell>{list.status}</TableCell>
                    <TableCell>
                      <IconButton
                        onClick={() => {
                          openModal("modal-laporan-scada", list.id);
                          selectData(list as LaporanScadaList);
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
  );
};

export default TableMonitoring;
