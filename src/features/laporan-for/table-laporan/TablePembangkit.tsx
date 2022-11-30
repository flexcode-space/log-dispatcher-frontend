import { Card, CardContent, Grid, Button, IconButton } from "@mui/material";
import { CardHeader } from "src/components/card";
import { ArrowRight } from "mdi-material-ui";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableCellHead,
  TableContainer,
} from "src/components/table";

type TablePembangkitProps = {
  title: string;
};

export const TablePembangkit = ({ title }: TablePembangkitProps) => {
  return (
    <Grid item xs={12}>
      <Card>
        <CardHeader
          title={title}
          action={
            <Button variant="outlined" size="small" sx={{ height: '40px'}}>
              Edit Data
              <IconButton>
                <ArrowRight color="primary" />
              </IconButton>
            </Button>
          }
        />
        <CardContent>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCellHead>Pembangkit</TableCellHead>
                  <TableCellHead>Mampu</TableCellHead>
                  <TableCellHead>Status</TableCellHead>
                  <TableCellHead>Waktu Mulai</TableCellHead>
                  <TableCellHead>Waktu Akhir</TableCellHead>
                  <TableCellHead>Keterangan</TableCellHead>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow hover>
                  <TableCell>PLTA MRICA 1</TableCell>
                  <TableCell>50</TableCell>
                  <TableCell>FD3</TableCell>
                  <TableCell>22 Januari 2022, 01.43 WIB</TableCell>
                  <TableCell>23 Januari 2022, 01.43 WIB</TableCell>
                  <TableCell>
                    Kendala indikasi di hot well pump abnormal
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Grid>
  );
};
