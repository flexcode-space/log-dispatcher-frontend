import { Divider, Box } from "@mui/material";
import { TooltipProps } from "recharts";
import Circle from "mdi-material-ui/Circle";
import { formatDecimalNumber } from "src/utils/number";

const CustomTooltip = (data: TooltipProps<any, any>) => {
  // ** Props
  const { active, payload } = data;

  if (active && payload) {
    return (
      <div className="recharts-custom-tooltip">
        <Box
          sx={{
            mr: 2.5,
            display: "flex",
            alignItems: "center",
            fontWeight: 700,
          }}
        >
          <span>Jam: {data.label}</span>
        </Box>
        <Divider />
        {data &&
          data.payload &&
          data.payload.map((i: any) => {
            return (
              <Box
                sx={{ display: "flex", alignItems: "center" }}
                key={i.dataKey}
              >
                <Circle sx={{ color: i.stroke, mr: 2.5, fontSize: "15px" }} />
                <span>
                  {i.dataKey} : {formatDecimalNumber(i.payload[i.dataKey])}
                </span>
              </Box>
            );
          })}
      </div>
    );
  }

  return null;
};

export default CustomTooltip;
