import { useRouter } from "next/router";
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

import CardPiket from "src/@core/components/card-piket/card-piket-img";
import CardPiketFasop from "src/@core/components/card-piket/card-piket-fasop";
import { ModalAddPiketDanShift } from "./modal";

const PiketDanShift = () => {
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
                  value={null}
                  label="Pilih Tanggal"
                  onChange={() => null}
                  renderInput={(params) => (
                    <TextField
                      size="small"
                      {...params}
                      sx={{ width: "200px" }}
                    />
                  )}
                />
              </LocalizationProvider>
              <Button sx={{ mb: 2 }} variant="outlined">
                ubah
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
        <CardContent>
          <Box
            sx={{
              width: "295px",
            }}
          >
            <Typography
              variant="subtitle1"
              sx={{ mb: "10px", fontWeight: 700 }}
            >
              PIKET PIMPINAN
            </Typography>
            <CardPiket
              data={{
                stats: "8.14k",
                title: "Andika Akhmad Widyato",
                chipColor: "primary",
                trendNumber: "+15.6%",
                chipText: "Man II Opsis",
                src: "/images/piket&shift-img.png",
              }}
            />
          </Box>
        </CardContent>

        <CardContent>
          <Typography variant="subtitle1" sx={{ mb: "10px", fontWeight: 700 }}>
            PIKET PAGI
          </Typography>
          <Grid container spacing={10}>
            {[0, 1, 2].map((index) => (
              <Grid item xs={4} key={index}>
                <Box
                  sx={{
                    width: "295px",
                  }}
                >
                  <CardPiket
                    data={{
                      stats: "8.14k",
                      title: "Andika Akhmad Widyato",
                      chipColor: "primary",
                      trendNumber: "+15.6%",
                      chipText: "Man II Opsis",
                      src: "/images/piket&shift-img.png",
                    }}
                  />
                </Box>
              </Grid>
            ))}
          </Grid>
        </CardContent>

        <CardContent>
          <Typography variant="subtitle1" sx={{ mb: "10px", fontWeight: 700 }}>
            PIKET SIANG
          </Typography>
          <Grid container spacing={10}>
            {[0, 1, 2].map((index) => (
              <Grid item xs={4} key={index}>
                <Box
                  sx={{
                    width: "295px",
                  }}
                >
                  <CardPiket
                    data={{
                      stats: "8.14k",
                      title: "Andika Akhmad Widyato",
                      chipColor: "primary",
                      trendNumber: "+15.6%",
                      chipText: "Man II Opsis",
                      src: "/images/piket&shift-img.png",
                    }}
                  />
                </Box>
              </Grid>
            ))}
          </Grid>
        </CardContent>

        <CardContent>
          <Typography variant="subtitle1" sx={{ mb: "10px", fontWeight: 700 }}>
            PIKET MALAM
          </Typography>
          <Grid container spacing={10}>
            {[0, 1, 2].map((index) => (
              <Grid item xs={4} key={index}>
                <Box
                  sx={{
                    width: "295px",
                  }}
                >
                  <CardPiket
                    data={{
                      stats: "8.14k",
                      title: "Andika Akhmad Widyato",
                      chipColor: "primary",
                      trendNumber: "+15.6%",
                      chipText: "Man II Opsis",
                      src: "/images/piket&shift-img.png",
                    }}
                  />
                </Box>
              </Grid>
            ))}
          </Grid>
        </CardContent>

        <CardContent>
          <Typography variant="subtitle1" sx={{ mb: "10px", fontWeight: 700 }}>
            Piket fasop
          </Typography>
          <Grid container spacing={10}>
            {[0, 1, 2].map((index) => (
              <Grid item xs={4} key={index}>
                <Box
                  sx={{
                    width: "280px",
                  }}
                >
                  <CardPiketFasop
                    data={{
                      stats: "8.14k",
                      title: "Andika Akhmad Widyato",
                      chipColor: "primary",
                      trendNumber: "+15.6%",
                      chipText: "Man II Opsis",
                      src: "/images/piket&shift-img.png",
                    }}
                  />
                </Box>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Box>
    </>
  );
};

export default PiketDanShift;
