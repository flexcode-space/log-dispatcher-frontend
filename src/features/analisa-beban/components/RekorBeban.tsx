import { useEffect } from "react";
import { Grid, Typography } from "@mui/material";
import Card from "./Card";
import { analisaBebanApi } from "src/api/analisa-beban";

const RekorBeban = () => {
  const { getBebanSubsistemList, bebanSubsistemList } = analisaBebanApi();

  useEffect(() => {
    getBebanSubsistemList();
  }, []);

  return (
    <>
      <Grid item xs={12}>
        <Grid item>
          <Typography variant="h5">Rekor Beban</Typography>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={6}>
          {bebanSubsistemList?.subsistem?.map((value) => (
            <Grid item xs={3} key={value.id}>
              <Card title={value?.nama} value={value} />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </>
  );
};

export default RekorBeban;
