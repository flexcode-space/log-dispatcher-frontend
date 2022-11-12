import { useEffect } from "react";
import { Card, CardContent, Button } from "@mui/material";
import { Typography, TextField } from "@mui/material";
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
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
            <TableHead sx={{ height: "30px", background: "#F5F5F7" }}>
              <TableRow>
                <TableCell
                  variant="head"
                  size="small"
                  rowSpan={2}
                  style={{ minWidth: "300px" }}
                >
                  Subsistem
                </TableCell>
                <TableCell
                  variant="head"
                  size="small"
                  align="center"
                  colSpan={2}
                  style={{ minWidth: "200px" }}
                >
                  Total Beban
                </TableCell>
                <TableCell
                  variant="head"
                  size="small"
                  align="center"
                  colSpan={3}
                  style={{ minWidth: "250px" }}
                >
                  Beban Puncak Siang
                </TableCell>
                <TableCell
                  variant="head"
                  size="small"
                  align="center"
                  colSpan={3}
                  style={{ minWidth: "200px" }}
                >
                  Beban Puncak Malam
                </TableCell>
                <TableCell
                  variant="head"
                  size="small"
                  align="center"
                  colSpan={4}
                  style={{ minWidth: "200px" }}
                >
                  Tegangan Tertinggi
                </TableCell>
                <TableCell
                  variant="head"
                  size="small"
                  align="center"
                  colSpan={4}
                  style={{ minWidth: "100px" }}
                >
                  Tegangan Terendah
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell variant="head" size="small">
                  MW
                </TableCell>
                <TableCell variant="head" size="small">
                  MVAR
                </TableCell>
                <TableCell variant="head" size="small">
                  JAM
                </TableCell>
                <TableCell variant="head" size="small">
                  MW
                </TableCell>
                <TableCell variant="head" size="small">
                  MVAR
                </TableCell>
                <TableCell variant="head" size="small">
                  JAM
                </TableCell>
                <TableCell variant="head" size="small">
                  MW
                </TableCell>
                <TableCell variant="head" size="small">
                  MVAR
                </TableCell>
                <TableCell variant="head" size="small">
                  JAM
                </TableCell>
                <TableCell
                  variant="head"
                  size="small"
                  // align="center"
                  style={{ minWidth: "250px" }}
                >
                  Gardu Induk
                </TableCell>
                <TableCell
                  variant="head"
                  size="small"
                  style={{ minWidth: "250px" }}
                >
                  Busbar
                </TableCell>
                <TableCell variant="head" size="small">
                  Tegangan
                </TableCell>
                <TableCell variant="head" size="small">
                  JAM
                </TableCell>
                <TableCell
                  variant="head"
                  size="small"
                  style={{ minWidth: "250px" }}
                >
                  Gardu Induk
                </TableCell>
                <TableCell
                  variant="head"
                  size="small"
                  style={{ minWidth: "250px" }}
                >
                  Busbar
                </TableCell>
                <TableCell variant="head" size="small">
                  Tegangan
                </TableCell>
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
