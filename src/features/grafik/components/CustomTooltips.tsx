import Box from "@mui/material/Box";
// import Typography from "@mui/material/Typography";
// import Divider from "@mui/material/Divider";
import { TooltipProps } from "recharts";
import Circle from "mdi-material-ui/Circle";
import { formatDecimalNumber } from "src/utils/number";

const CustomTooltip = (data: TooltipProps<any, any>) => {
  // ** Props
  const { active, payload } = data;

  if (active && payload) {
    return (
      <div className="recharts-custom-tooltip">
        {/* <Typography>{data.label}</Typography> */}
        {/* <Divider /> */}
        {data &&
          data.payload &&
          data.payload.map((i: any) => {
            return (
              <Box
                sx={{ display: "flex", alignItems: "center" }}
                key={i.dataKey}
              >
                <Circle sx={{ color: i.fill, mr: 2.5, fontSize: "0.6rem" }} />
                <span>
                  {data.label} : {formatDecimalNumber(i.payload[i.dataKey])}
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
