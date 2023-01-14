import { Button, Card, CardContent, CardHeader, Grid } from "@mui/material";
import CardStatisticsCharacter from "src/@core/components/card-statistics/card-stats-with-image";

type JadwalShiftProps = {
  onClick: () => void;
};

const JadwalShift = ({ onClick }: JadwalShiftProps) => {
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
          {[0, 1, 2, 3].map((index) => (
            <Grid item xs={3} key={index}>
              <CardStatisticsCharacter
                data={{
                  stats: "8.14k",
                  title: "Andika Akhmad",
                  chipColor: "primary",
                  trendNumber: "+15.6%",
                  chipText: "Man II Opsis",
                  src: "/images/card-stats-img-1.png",
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
