import {
  Grid,
  Typography,
  TextField,
  Button,
  Box,
  CardContent,
} from "@mui/material";
import DatePickerMui from "@mui/lab/DatePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import PageHeader from "src/@core/components/page-header";
import { WrapperFilter } from "src/components/filter";
import { openModal } from "src/state/modal";

import CardPiket from "src/features/piket-and-shift/card-piket/card-piket-img";
import CardPiketFasop from "src/features/piket-and-shift/card-piket/card-piket-fasop";
import { ModalAddPiketDanShift } from "./modal";
import { useEffect, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { piketApi } from "src/api/piket";

const PiketAndShift = () => {
  const [date, setDate] = useState<Dayjs | null>(dayjs());

  const { getPiketList, piketList } = piketApi();

  const pimpinan = piketList.filter((value) => value?.posisi === "Pimpinan")[0];
  const shiftPagi = piketList.filter((value) => value?.posisi === "Shift Pagi");
  const shiftSiang = piketList.filter(
    (value) => value?.posisi === "Shift Siang"
  );
  const shiftMalam = piketList.filter(
    (value) => value?.posisi === "Shift Malam"
  );

  const bidFasop = piketList.filter((value) => value?.posisi === "BID Fasop");

  useEffect(() => {
    getPiketList({ tanggal: dayjs(date).format("YYYY-MM-DD") });
  }, [date]);

  const TitlePiket = ({ title }: { title: string }) => (
    <Typography variant="subtitle1" sx={{ mb: "10px", fontWeight: 700 }}>
      {title}
    </Typography>
  );

  return (
    <>
      <ModalAddPiketDanShift />
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <WrapperFilter>
            <Grid item xs={4}>
              <PageHeader
                title={<Typography variant="h5">Piket & Shift</Typography>}
              />
            </Grid>
            <div style={{ display: "flex", gap: "10px" }}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePickerMui
                  value={date}
                  label="Pilih Tanggal"
                  inputFormat="dd/M/yyyy"
                  onChange={(e) => setDate(e)}
                  renderInput={(params) => (
                    <TextField
                      size="small"
                      {...params}
                      sx={{ width: "200px" }}
                    />
                  )}
                />
              </LocalizationProvider>
              <Button
                sx={{ mb: 2 }}
                onClick={() => openModal()}
                variant="outlined"
              >
                Ubah
              </Button>
              <Button
                sx={{ mb: 2 }}
                onClick={() => openModal()}
                variant="contained"
              >
                Tambah
              </Button>
            </div>
          </WrapperFilter>
        </Grid>
      </Grid>

      <Box
        sx={{
          p: 5,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        {piketList.length === 0 && (
          <Typography variant="h3">Tidak Ada Data Piket</Typography>
        )}

        {!!pimpinan && (
          <CardContent>
            <Box
              sx={{
                width: "295px",
              }}
            >
              <TitlePiket title="PIKET PIMPINAN" />
              <CardPiket
                data={{
                  title: pimpinan?.user?.nama,
                  chipText: pimpinan?.user?.jabatan || "-",
                  src: pimpinan?.user?.photo,
                }}
              />
            </Box>
          </CardContent>
        )}

        {shiftPagi.length > 0 && (
          <CardContent>
            <TitlePiket title="PIKET PAGI" />
            <Grid container spacing={10}>
              {shiftPagi.map((value) => (
                <Grid item key={value.id}>
                  <Box
                    sx={{
                      width: "295px",
                    }}
                  >
                    <CardPiket
                      data={{
                        title: value?.user?.nama,
                        chipText: value?.user?.jabatan,
                        src: value?.user?.photo,
                      }}
                    />
                  </Box>
                </Grid>
              ))}
            </Grid>
          </CardContent>
        )}

        {shiftSiang.length > 0 && (
          <CardContent>
            <TitlePiket title="PIKET SIANG" />
            <Grid container spacing={10}>
              {shiftSiang.map((value) => (
                <Grid item key={value.id}>
                  <Box
                    sx={{
                      width: "295px",
                    }}
                  >
                    <CardPiket
                      data={{
                        title: value?.user?.nama,
                        chipText: value?.user?.jabatan,
                        src: value?.user?.photo,
                      }}
                    />
                  </Box>
                </Grid>
              ))}
            </Grid>
          </CardContent>
        )}

        {shiftMalam.length > 0 && (
          <CardContent>
            <TitlePiket title="PIKET MALAM" />
            <Grid container spacing={10}>
              {shiftMalam.map((value) => (
                <Grid item key={value.id}>
                  <Box
                    sx={{
                      width: "295px",
                    }}
                  >
                    <CardPiket
                      data={{
                        title: value?.user?.nama,
                        chipText: value?.user?.jabatan,
                        src: value?.user?.photo,
                      }}
                    />
                  </Box>
                </Grid>
              ))}
            </Grid>
          </CardContent>
        )}

        {bidFasop.length > 0 && (
          <CardContent>
            <TitlePiket title="PIKET FASOP" />
            <Grid container spacing={10}>
              {bidFasop.map((value) => (
                <Grid item key={value.id}>
                  <Box
                    sx={{
                      width: "280px",
                    }}
                  >
                    <CardPiketFasop
                      data={{
                        title: value?.user?.nama,
                        chipText: value?.user?.jabatan,
                        src: value?.user?.photo,
                      }}
                    />
                  </Box>
                </Grid>
              ))}
            </Grid>
          </CardContent>
        )}
      </Box>
    </>
  );
};

export default PiketAndShift;
