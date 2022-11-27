import TableCell from "@mui/material/TableCell";
import { formatDecimalNumber } from "src/utils/number";
import { Data } from "./types";
import { TIME } from "src/constants/time";

export const showValueBeban = (data: Data) => {
  if (!data) return <></>;

  return Object.values(TIME).map((value) => {
    const mw = "mw_" + value.replace(".", "");
    const mx = "mx_" + value.replace(".", "");
    return (
      <>
        <TableCell size="small">
          {formatDecimalNumber((data as any)[mw]!, 2)}
        </TableCell>
        <TableCell size="small">
          {formatDecimalNumber((data as any)[mx]!, 2)}
        </TableCell>
      </>
    );
  });
};
