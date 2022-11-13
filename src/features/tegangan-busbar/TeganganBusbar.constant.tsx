import TableCell from "@mui/material/TableCell";
import { Data } from "./types";
import { TIME } from "src/constants/time";

export const showValueBeban = (data: Data) => {
  if (!data) return <></>;

  return Object.values(TIME).map((value) => {
    const mw = "mw_" + value.replace(".", "");
    const mx = "mx_" + value.replace(".", "");
    return (
      <>
        <TableCell size="small">{(data as any)[mw]!}</TableCell>
        <TableCell size="small">{(data as any)[mx]!}</TableCell>
      </>
    );
  });
};
