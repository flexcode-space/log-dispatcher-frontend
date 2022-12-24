import { Card, CardContent, Grid } from "@mui/material";
import { useEffect } from "react";
import { piketApi } from "src/api/piket";
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
import { groupBy } from "src/utils/array";
import { PiketList } from "./types";

type Position = "Pimpinan" | "BID FASOP" | "Dispatcher";

type PiketGroup = Record<Position, PiketList[]>;

type Piket = {
  pimpinan?: string;
  bid?: string;
  dispatcher?: string;
};

export const TablePiket = () => {
  const { getPiketList, piketList } = piketApi();

  const arrayPiket: Piket[] = [];
  const piketGroup = groupBy(piketList, "posisi") as PiketGroup;

  piketGroup?.Pimpinan?.forEach((value, index) => {
    const isReady = arrayPiket.at(index);
    if (typeof isReady === undefined) {
      arrayPiket.push({ pimpinan: value.user.nama });
    } else {
      arrayPiket[index] = {
        ...arrayPiket[index],
        pimpinan: value.user.nama,
      };
    }
  });

  piketGroup?.["BID FASOP"]?.forEach((value, index) => {
    const isReady = arrayPiket.at(index);
    if (typeof isReady === undefined) {
      arrayPiket.push({ bid: value.user.nama });
    } else {
      arrayPiket[index] = {
        ...arrayPiket[index],
        bid: value.user.nama,
      };
    }
  });

  piketGroup?.Dispatcher?.forEach((value, index) => {
    const isReady = arrayPiket.at(index);
    if (typeof isReady === undefined) {
      arrayPiket.push({ dispatcher: value.user.nama });
    } else {
      arrayPiket[index] = {
        ...arrayPiket[index],
        dispatcher: value.user.nama,
      };
    }
  });

  useEffect(() => {
    getPiketList();
  }, []);

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
                {arrayPiket.map((list: Piket, index: number) => {
                  return (
                    <TableRow hover key={`table-${index}`}>
                      <TableCell>{list.pimpinan || ""}</TableCell>
                      <TableCell>{list.bid || ""}</TableCell>
                      <TableCell>{list.dispatcher || ""}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Grid>
  );
};
