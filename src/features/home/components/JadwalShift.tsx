import { Button, Card, CardContent, CardHeader, Grid } from "@mui/material";
import dayjs from "dayjs";
import { useEffect } from "react";
import CardStatisticsCharacter from "src/@core/components/card-statistics/card-stats-with-image";
import { piketApi } from "src/api/piket";

type JadwalShiftProps = {
  onClick: () => void;
};

const JadwalShift = ({ onClick }: JadwalShiftProps) => {
  const { piketList, getPiketList } = piketApi();

  useEffect(() => {
    getPiketList({ tanggal: dayjs().format("YYYY-MM-DD") });
  }, []);

  console.log("piketList", piketList);

  return (
    <Card>
      <CardHeader
        title="Jadwal Shift Dispatcher"
        titleTypographyProps={{ variant: "h6" }}
        subheaderTypographyProps={{
          variant: "caption",
          sx: { color: "text.disabled" },
        }}
        sx={{
          flexDirection: ["column", "row"],
          alignItems: ["flex-start", "center"],
          "& .MuiCardHeader-action": { mb: 0 },
          "& .MuiCardHeader-content": { mb: [2, 0] },
        }}
        action={
          <Button variant="outlined" onClick={onClick}>
            Edit Shift
          </Button>
        }
      />
      <CardContent>
        <Grid container spacing={2}>
          {piketList.map((value, index) => (
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
        </Grid>
      </CardContent>
    </Card>
  );
};

export default JadwalShift;
