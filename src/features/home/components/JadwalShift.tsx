import { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardContent,
  Grid,
  Box,
  IconButton,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import CardStatisticsCharacter from "src/@core/components/card-statistics/card-stats-with-image";
import { CardHeader } from "src/components/card";
import { piketApi } from "src/api/piket";
import ChevronRightIcon from "src/assets/icons/chevron-right-icon.svg";
import ChevronLeftIcon from "src/assets/icons/chevron-left-icon.svg";

type JadwalShiftProps = {
  onClick: () => void;
};

type JabatanUnions = "pimpinan" | "shiftPagi" | "shiftSiang" | "shiftMalam";

enum JabatanTitle {
  pimpinan = "Pimpinan",
  shiftPagi = "Shift Pagi",
  shiftSiang = "Shift Siang",
  shiftMalam = "Shift Malam",
}

const JadwalShift = ({ onClick }: JadwalShiftProps) => {
  const [selectedPiket, setSelectedPicket] =
    useState<JabatanUnions>("pimpinan");
  const { piketList, getPiketList } = piketApi();

  const dataPiket = {
    pimpinan: piketList.filter((value) => value?.posisi === "Pimpinan"),
    shiftPagi: piketList.filter((value) => value?.posisi === "Shift Pagi"),
    shiftSiang: piketList.filter((value) => value?.posisi === "Shift Siang"),
    shiftMalam: piketList.filter((value) => value?.posisi === "Shift Malam"),
  };

  const handleNextSelected = (action: string) => {
    const keys = Object.keys(dataPiket);
    let nextIndex = keys.indexOf(selectedPiket);
    if (action === "prev") {
      --nextIndex;
    } else {
      nextIndex++;
    }
    setSelectedPicket(keys[nextIndex] as JabatanUnions);
  };

  useEffect(() => {
    getPiketList({ tanggal: dayjs().format("YYYY-MM-DD") });
  }, []);

  return (
    <Card>
      <CardHeader
        title="Jadwal Shift Dispatcher"
        action={
          <Button variant="outlined" onClick={onClick}>
            Edit Shift
          </Button>
        }
      />
      <CardContent>
        <Grid container spacing={3}>
          {piketList?.length > 0 ? (
            <>
              {dataPiket[selectedPiket]?.map((value, index) => (
                <Grid item xs={3} key={index}>
                  <CardStatisticsCharacter
                    data={{
                      stats: "8.14k",
                      title: value?.user?.nama,
                      chipColor: "primary",
                      trendNumber: "+15.6%",
                      chipText: value?.posisi,
                      src: value?.user?.photo || "/images/card-stats-img-1.png",
                    }}
                  />
                </Grid>
              ))}
              <Grid item xs={12}>
                <Box
                  justifyContent="flex-end"
                  display="flex"
                  alignItems="center"
                >
                  <IconButton
                    disabled={selectedPiket === "pimpinan"}
                    onClick={() => handleNextSelected("prev")}
                  >
                    <ChevronLeftIcon />
                  </IconButton>
                  <Typography color="#4AA1B9" fontSize="14px" fontWeight={700}>
                    {JabatanTitle[selectedPiket]}
                  </Typography>
                  <IconButton
                    disabled={selectedPiket === "shiftMalam"}
                    onClick={() => handleNextSelected("next")}
                  >
                    <ChevronRightIcon />
                  </IconButton>
                </Box>
              </Grid>
            </>
          ) : (
            <Grid item xs={12}>
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="100px"
              >
                <Typography>Tidak Ada Data piket</Typography>
              </Box>
            </Grid>
          )}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default JadwalShift;
