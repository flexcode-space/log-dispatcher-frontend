import { useEffect } from "react";
import { Card, CardContent } from "@mui/material";
import { Typography, TextField } from "@mui/material";
import {
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  TableCellHead,
  TableContainer,
} from "src/components/table";
import { WrapperFilter } from "src/components/filter";
import { analisaBebanApi } from "src/api/analisa-beban";
import { formatDecimalNumber } from "src/utils/number";

export const TableBebanSubsistem: React.FC<{ tanggal: string }> = ({
  tanggal,
}) => {
  const {
    getBebanSubsistemList,
    getMonitorBusbar,
    bebanSubsistemList,
    monitorBusbarList,
  } = analisaBebanApi();

  const total = bebanSubsistemList?.total || {};
  const total_tertinggi = monitorBusbarList.total_tertinggi || {};
  const total_terendah = monitorBusbarList.total_terendah || {};

  useEffect(() => {
    getBebanSubsistemList({ tanggal });
    getMonitorBusbar({ tanggal });
  }, [tanggal]);

  return (
    <Card>
      <CardContent>
        <WrapperFilter sx={{ alignItems: "baseline" }}>
          <Typography variant="h6">Beban Subsistem</Typography>

          <TextField
            size="small"
            value=""
            sx={{ mr: 6, mb: 2 }}
            placeholder="Cari"
            // onChange={(e) => setSearch(e.target.value)}
          />
        </WrapperFilter>
        <TableContainer>
          <Table style={{ width: "100%", tableLayout: "auto" }}>
            <TableHead>
              <TableRow>
                <TableCellHead size="small" rowSpan={2} minWidth="300px">
                  Subsistem
                </TableCellHead>
                <TableCellHead
                  size="small"
                  align="center"
                  colSpan={2}
                  minWidth="200px"
                >
                  Total Beban
                </TableCellHead>
                <TableCellHead
                  size="small"
                  align="center"
                  colSpan={3}
                  minWidth="250px"
                >
                  Beban Puncak Siang
                </TableCellHead>
                <TableCellHead
                  size="small"
                  align="center"
                  colSpan={3}
                  minWidth="200px"
                >
                  Beban Puncak Malam
                </TableCellHead>
                <TableCellHead
                  size="small"
                  align="center"
                  colSpan={4}
                  minWidth="200px"
                >
                  Tegangan Tertinggi
                </TableCellHead>
                <TableCellHead
                  size="small"
                  align="center"
                  colSpan={4}
                  minWidth="100px"
                >
                  Tegangan Terendah
                </TableCellHead>
              </TableRow>
              <TableRow>
                <TableCellHead size="small">MW</TableCellHead>
                <TableCellHead size="small">MVAR</TableCellHead>
                <TableCellHead size="small">JAM</TableCellHead>
                <TableCellHead size="small">MW</TableCellHead>
                <TableCellHead size="small">MVAR</TableCellHead>
                <TableCellHead size="small">JAM</TableCellHead>
                <TableCellHead size="small">MW</TableCellHead>
                <TableCellHead size="small">MVAR</TableCellHead>
                <TableCellHead size="small">JAM</TableCellHead>
                <TableCellHead
                  size="small"
                  // align="center"
                  style={{ minWidth: "250px" }}
                >
                  Gardu Induk
                </TableCellHead>
                <TableCellHead size="small" style={{ minWidth: "250px" }}>
                  Busbar
                </TableCellHead>
                <TableCellHead size="small">Tegangan</TableCellHead>
                <TableCellHead size="small">JAM</TableCellHead>
                <TableCellHead size="small" style={{ minWidth: "250px" }}>
                  Gardu Induk
                </TableCellHead>
                <TableCellHead size="small" style={{ minWidth: "250px" }}>
                  Busbar
                </TableCellHead>
                <TableCellHead size="small">Tegangan</TableCellHead>
              </TableRow>
            </TableHead>
            <TableBody>
              {bebanSubsistemList?.subsistem?.map((value, index) => {
                const tertinggi = monitorBusbarList.tertinggi || [];
                const terendah = monitorBusbarList.terendah || [];

                return (
                  <TableRow>
                    <TableCell>{value?.nama}</TableCell>
                    <TableCell>
                      {formatDecimalNumber(value?.total.mw)}
                    </TableCell>
                    <TableCell>
                      {formatDecimalNumber(value?.total.mvar)}
                    </TableCell>
                    <TableCell>{value?.siang.jam}</TableCell>
                    <TableCell>
                      {formatDecimalNumber(value?.siang.mw)}
                    </TableCell>
                    <TableCell>
                      {formatDecimalNumber(value?.siang.mvar)}
                    </TableCell>
                    <TableCell>{value?.malam.jam}</TableCell>
                    <TableCell>
                      {formatDecimalNumber(value?.malam.mw)}
                    </TableCell>
                    <TableCell>
                      {formatDecimalNumber(value?.malam.mvar)}
                    </TableCell>
                    <TableCell>{tertinggi[index]?.jam}</TableCell>
                    <TableCell>{tertinggi[index]?.gardu_induk}</TableCell>
                    <TableCell>{tertinggi[index]?.peralatan}</TableCell>
                    <TableCell>{tertinggi[index]?.tegangan}</TableCell>
                    <TableCell>{terendah[index]?.jam}</TableCell>
                    <TableCell>{terendah[index]?.gardu_induk}</TableCell>
                    <TableCell>{terendah[index]?.peralatan}</TableCell>
                    <TableCell>
                      {terendah[index]?.tegangan
                        ? formatDecimalNumber(terendah[index]?.tegangan)
                        : ""}
                    </TableCell>
                  </TableRow>
                );
              })}
              <TableRow>
                <TableCell>{total?.nama}</TableCell>
                <TableCell>
                  {total?.total?.mw
                    ? formatDecimalNumber(total?.total?.mw)
                    : ""}
                </TableCell>
                <TableCell>
                  {total?.total?.mvar
                    ? formatDecimalNumber(total?.total?.mvar)
                    : ""}
                </TableCell>
                <TableCell>{total?.siang?.jam}</TableCell>
                <TableCell>{formatDecimalNumber(total?.siang?.mw)}</TableCell>
                <TableCell>{formatDecimalNumber(total?.siang?.mvar)}</TableCell>
                <TableCell>{total?.malam?.jam}</TableCell>
                <TableCell>{formatDecimalNumber(total?.malam?.mw)}</TableCell>
                <TableCell>{formatDecimalNumber(total?.malam?.mvar)}</TableCell>
                <TableCell>{total_tertinggi?.jam}</TableCell>
                <TableCell>{total_tertinggi?.gardu_induk}</TableCell>
                <TableCell>{total_tertinggi?.peralatan}</TableCell>
                <TableCell>{total_tertinggi?.tegangan}</TableCell>
                <TableCell>{total_terendah?.jam}</TableCell>
                <TableCell>{total_terendah?.gardu_induk}</TableCell>
                <TableCell>{total_terendah?.peralatan}</TableCell>
                <TableCell>
                  {total_terendah?.tegangan
                    ? formatDecimalNumber(total_terendah?.tegangan)
                    : ""}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
};
