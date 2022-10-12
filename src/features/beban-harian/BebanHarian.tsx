// ** React Imports
import { useState, ChangeEvent } from "react";

// ** MUI Imports
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";

interface Column {
  id: "name" | "code" | "population" | "size" | "density";
  label: string;
  minWidth?: number;
  align?: "right";
  rowSpan?: number;
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: "name", label: "Jenis Pembangkit", rowSpan: 2, minWidth: 170 },
  { id: "code", label: "Pembangkit", rowSpan: 2, minWidth: 100 },
  {
    id: "population",
    label: "Population",
    minWidth: 170,
    align: "right",
    format: (value: number) => value.toLocaleString("en-US"),
  },
  {
    id: "size",
    label: "Size\u00a0(km\u00b2)",
    minWidth: 170,
    align: "right",
    format: (value: number) => value.toLocaleString("en-US"),
  },
  {
    id: "density",
    label: "Density",
    minWidth: 170,
    align: "right",
    format: (value: number) => value.toFixed(2),
  },
];

interface Data {
  name: string;
  code: string;
  size: number;
  density: number;
  population: number;
}

function createData(
  name: string,
  code: string,
  population: number,
  size: number
): Data {
  const density = population / size;

  return { name, code, population, size, density };
}

const rows = [
  createData("India", "IN", 1324171354, 3287263),
  createData("China", "CN", 1403500365, 9596961),
  createData("Italy", "IT", 60483973, 301340),
  createData("United States", "US", 327167434, 9833520),
  createData("Canada", "CA", 37602103, 9984670),
  createData("Australia", "AU", 25475400, 7692024),
  createData("Germany", "DE", 83019200, 357578),
  createData("Ireland", "IE", 4857000, 70273),
  createData("Mexico", "MX", 126577691, 1972550),
  createData("Japan", "JP", 126317000, 377973),
  createData("France", "FR", 67022000, 640679),
  createData("United Kingdom", "GB", 67545757, 242495),
  createData("Russia", "RU", 146793744, 17098246),
  createData("Nigeria", "NG", 200962417, 923768),
  createData("Brazil", "BR", 210147125, 8515767),
];

const TableStickyHeader = () => {
  // ** States
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const TestTable = () => {
    return (
      <>
        <TableRow>
          <TableCell
            sx={{
              background: "#5459D1",
              color: "#FFFFFF",
              fontSize: "14px",
              fontWeight: "700 !important",
            }}
            colSpan={8}
          >
            Subsistem Tanjungjati
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>PLTA</TableCell>
          <TableCell>Jelok</TableCell>
          <TableCell align="center">6</TableCell>
          <TableCell align="center">6</TableCell>
          <TableCell align="center">6</TableCell>
          <TableCell align="center">6</TableCell>
          <TableCell align="center">6</TableCell>
          <TableCell align="center">6</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>PLTA</TableCell>
          <TableCell>Timo</TableCell>
          <TableCell align="center">6</TableCell>
          <TableCell align="center">6</TableCell>
          <TableCell align="center">6</TableCell>
          <TableCell align="center">6</TableCell>
          <TableCell align="center">6</TableCell>
          <TableCell align="center">6</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>PLTA</TableCell>
          <TableCell>Kedung Ombo</TableCell>
          <TableCell align="center">6</TableCell>
          <TableCell align="center">6</TableCell>
          <TableCell align="center">6</TableCell>
          <TableCell align="center">6</TableCell>
          <TableCell align="center">6</TableCell>
          <TableCell align="center">6</TableCell>
        </TableRow>
        <TableRow
          sx={{
            background:
              "linear-gradient(0deg, rgba(255, 255, 255, 0.88), rgba(255, 255, 255, 0.88)), #26C6F9;",
          }}
        >
          <TableCell colSpan={2}>Total Non Mrica</TableCell>
          <TableCell align="center">218</TableCell>
          <TableCell align="center">218</TableCell>
          <TableCell align="center">218</TableCell>
          <TableCell align="center">218</TableCell>
          <TableCell align="center">218</TableCell>
          <TableCell align="center">218</TableCell>
        </TableRow>
        <TableRow
          sx={{
            background:
              "linear-gradient(0deg, rgba(255, 255, 255, 0.88), rgba(255, 255, 255, 0.88)), #6D788D;",
          }}
        >
          <TableCell colSpan={2}>Total Hidro</TableCell>
          <TableCell align="center">218</TableCell>
          <TableCell align="center">218</TableCell>
          <TableCell align="center">218</TableCell>
          <TableCell align="center">218</TableCell>
          <TableCell align="center">218</TableCell>
          <TableCell align="center">218</TableCell>
        </TableRow>
      </>
    );
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer>
        <Table>
          <TableHead sx={{ height: "30px" }}>
            <TableRow>
              <TableCell
                sx={{ backgroundColoe: "red" }}
                size="small"
                rowSpan={2}
              >
                Jenis Pembangkit
              </TableCell>
              <TableCell size="small" rowSpan={2}>
                Pembangkit
              </TableCell>
              <TableCell size="small" align="center" colSpan={2}>
                00.30
              </TableCell>
              <TableCell size="small" align="center" colSpan={2}>
                00.30
              </TableCell>
              <TableCell size="small" align="center" colSpan={2}>
                00.30
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center" size="small">
                MV
              </TableCell>
              <TableCell align="center" size="small">
                MX
              </TableCell>
              <TableCell align="center" size="small">
                MV
              </TableCell>
              <TableCell align="center" size="small">
                MX
              </TableCell>
              <TableCell align="center" size="small">
                MV
              </TableCell>
              <TableCell align="center" size="small">
                MX
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TestTable />
            <TestTable />
            <TestTable />
            <TestTable />
          </TableBody>
          {/* <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  rowSpan={column.rowSpan}
                  align={column.align}
                  sx={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow> */}
          {/* <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  colSpan={column.rowSpan}
                  align={column.align}
                  sx={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow> */}

          {/* <TableBody> */}
          {/* {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];

                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })} */}
          {/* </TableBody> */}
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default TableStickyHeader;
