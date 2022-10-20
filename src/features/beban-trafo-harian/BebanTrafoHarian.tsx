import { useState, ChangeEvent } from "react";

import { Card, CardContent, Button } from "@mui/material";
import { Typography, TextField } from "@mui/material";
import Grid from "@mui/material/Grid";
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import PageHeader from "src/@core/components/page-header";
import DownloadIcon from "src/assets/icons/download-icon.svg";
import EditIcon from "src/assets/icons/edit-icon.svg";
import { openModal } from "src/state/modal";

import { WrapperFilter } from "src/components/filter";
import { ModalSetBebanHarian } from "./modal";

const BebanHarian = () => {
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

  return (
    <>
      <ModalSetBebanHarian />

      <Grid container spacing={6}>
        <Grid item xs={12}>
          <PageHeader
            title={<Typography variant="h5">Beban Trafo Harian</Typography>}
          />
        </Grid>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <WrapperFilter sx={{ alignItems: "baseline" }}>
                <TextField
                  size="small"
                  value=""
                  sx={{ mr: 6, mb: 2 }}
                  placeholder="Cari"
                  // onChange={(e) => setSearch(e.target.value)}
                />

                <div style={{ display: "flex", gap: "10px" }}>
                  <Button sx={{ mb: 2 }} variant="outlined">
                    <EditIcon />
                    Ubah Arus Mampu
                  </Button>
                  <Button
                    sx={{ mb: 2 }}
                    variant="outlined"
                    onClick={() => openModal()}
                  >
                    Set
                  </Button>
                  <Button sx={{ mb: 2 }} variant="contained">
                    <DownloadIcon />
                    Download laporan
                  </Button>
                </div>
              </WrapperFilter>
              <TableContainer>
                <Table>
                  <TableHead sx={{ height: "30px", background: "#F5F5F7" }}>
                    <TableRow>
                      <TableCell size="small" rowSpan={2}>
                        No
                      </TableCell>
                      <TableCell size="small" rowSpan={2}>
                        UPT
                      </TableCell>
                      <TableCell size="small" rowSpan={2}>
                        Subsistem
                      </TableCell>
                      <TableCell size="small" rowSpan={2}>
                        Gardu Induk
                      </TableCell>
                      <TableCell size="small" rowSpan={2}>
                        Trafo
                      </TableCell>
                      <TableCell size="small" rowSpan={2}>
                        Daya (MVA)
                      </TableCell>
                      <TableCell size="small" rowSpan={2}>
                        Ratio
                      </TableCell>
                      <TableCell size="small" rowSpan={2}>
                        Arus Nominal (A)
                      </TableCell>
                      <TableCell size="small" rowSpan={2}>
                        Arus Mampu (A)
                      </TableCell>
                      <TableCell size="small" rowSpan={2}>
                        Setting OCR
                      </TableCell>
                      <TableCell size="small" align="center" colSpan={6}>
                        08.00
                      </TableCell>
                      <TableCell size="small" align="center" colSpan={6}>
                        04.00
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell width={100}>Arus (A)</TableCell>
                      <TableCell>MW</TableCell>
                      <TableCell>MVAR</TableCell>
                      <TableCell>KWH</TableCell>
                      <TableCell width={100}>% I NOM</TableCell>
                      <TableCell width={120}>% I MAMPU</TableCell>
                      <TableCell width={100}>Arus (A)</TableCell>
                      <TableCell>MW</TableCell>
                      <TableCell>MVAR</TableCell>
                      <TableCell>KWH</TableCell>
                      <TableCell width={100}>% I NOM</TableCell>
                      <TableCell width={120}>% I MAMPU</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>1</TableCell>
                      <TableCell>Semarang</TableCell>
                      <TableCell>Tanjung Jati</TableCell>
                      <TableCell>Trafo - 1</TableCell>
                      <TableCell>60</TableCell>
                      <TableCell>150/20</TableCell>
                      <TableCell>231</TableCell>
                      <TableCell>231</TableCell>
                      <TableCell>277,2</TableCell>
                      <TableCell>12</TableCell>
                      <TableCell>10</TableCell>
                      <TableCell>0</TableCell>
                      <TableCell>12</TableCell>
                      <TableCell>10</TableCell>
                      <TableCell>0</TableCell>
                      <TableCell>67</TableCell>
                      <TableCell>67</TableCell>
                      <TableCell>67</TableCell>
                      <TableCell>67</TableCell>
                      <TableCell>67</TableCell>
                      <TableCell>67</TableCell>
                      <TableCell>67</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={12}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default BebanHarian;
