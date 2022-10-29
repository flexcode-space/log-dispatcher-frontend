import { Card, CardContent, Button } from "@mui/material";
import { Typography, TextField } from "@mui/material";
import Grid from "@mui/material/Grid";
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";

import { WrapperFilter } from "src/components/filter";

import { dataMock } from "../AnalisaBeban.constant";

export const TableBebanSubsistem = () => {
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
                <TableCell align="center" size="small" rowSpan={2}>
                  Subsistem
                </TableCell>
                <TableCell
                  size="small"
                  align="center"
                  colSpan={2}
                  style={{ minWidth: "200px" }}
                >
                  Total Beban
                </TableCell>
                <TableCell
                  size="small"
                  align="center"
                  colSpan={3}
                  style={{ minWidth: "250px" }}
                >
                  Beban Puncak Siang
                </TableCell>
                <TableCell
                  size="small"
                  align="center"
                  colSpan={3}
                  style={{ minWidth: "200px" }}
                >
                  Beban Puncak Malam
                </TableCell>
                <TableCell
                  size="small"
                  align="center"
                  colSpan={4}
                  style={{ minWidth: "200px" }}
                >
                  Tegangan Tertinggi
                </TableCell>
                <TableCell
                  size="small"
                  align="center"
                  colSpan={4}
                  style={{ minWidth: "100px" }}
                >
                  Tegangan Terendah
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell size="small">MW</TableCell>
                <TableCell size="small">MVAR</TableCell>
                <TableCell size="small">JAM</TableCell>
                <TableCell size="small">MW</TableCell>
                <TableCell size="small">MVAR</TableCell>
                <TableCell size="small">JAM</TableCell>
                <TableCell size="small">MW</TableCell>
                <TableCell size="small">MVAR</TableCell>
                <TableCell size="small">JAM</TableCell>
                <TableCell size="small">Gardu Induk</TableCell>
                <TableCell size="small">Busbar</TableCell>
                <TableCell size="small">Tegangan</TableCell>
                <TableCell size="small">JAM</TableCell>
                <TableCell size="small">Gardu Induk</TableCell>
                <TableCell size="small">Busbar</TableCell>
                <TableCell size="small">Tegangan</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {[0, 1, 2, 3, 4].map((index) => (
                <TableRow>
                  {dataMock.map((value) => {
                    return <TableCell>{value}</TableCell>;
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
};
