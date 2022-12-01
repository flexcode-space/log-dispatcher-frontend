import { Card, CardContent, Grid } from "@mui/material";
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

export const TablePiket = () => {
  return (
    <Grid item xs={12}>
      <Card>
        <CardHeader title="Piket" />
        <CardContent>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCellHead>Piket Pimpinan</TableCellHead>
                  <TableCellHead>Piket Bid Fasop</TableCellHead>
                  <TableCellHead>Piket Dispatcher</TableCellHead>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow hover>
                  <TableCell>IRAWAN SURYA DARMA</TableCell>
                  <TableCell>REZA ILHAM S</TableCell>
                  <TableCell>ARYS SETIAWAN</TableCell>
                </TableRow>
                <TableRow hover>
                  <TableCell colSpan={1} />
                  <TableCell>YOGI SAPUTRO</TableCell>
                  <TableCell>RILO PAMBUDI</TableCell>
                </TableRow>
                <TableRow hover>
                  <TableCell colSpan={1} />
                  <TableCell>DWIATMA</TableCell>
                  <TableCell>AZIF FUAD FAHRUDDIN</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Grid>
  );
};
