import { Fragment } from "react";
import TableCell from "@mui/material/TableCell";
import { Data } from "src/api/beban/types";
import { formatDecimalNumber } from "src/utils/number";
import { TIME } from "src/constants/time";

export const showValueBeban = (data: Data) => {
  if (!data) return <></>;

  return Object.values(TIME).map((value) => {
    const mw = "mw_" + value.replace(".", "");
    const mx = "mx_" + value.replace(".", "");
    return (
      <Fragment key={value}>
        <TableCell
          size="small"
          align="center"
          sx={{ borderRight: "1px solid #4c4e641f" }}
        >
          {formatDecimalNumber((data as any)[mw]! || 0, 2)}
        </TableCell>
        <TableCell
          size="small"
          align="center"
          sx={{ borderRight: "1px solid #4c4e641f" }}
        >
          {formatDecimalNumber((data as any)[mx]!, 2)}
        </TableCell>
      </Fragment>
    );
  });
};
