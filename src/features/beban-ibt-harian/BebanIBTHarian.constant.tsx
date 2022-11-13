import TableCell from "@mui/material/TableCell";
import { Data } from "./types";
import { TIME } from "src/constants/time";

export const showValueBeban = (data: Data) => {
  if (!data) return <></>;

  return Object.values(TIME).map((value) => {
    const arus = "arus_" + value.replace(".", "");
    const mw = "mw_" + value.replace(".", "");
    const mvar = "mvar_" + value.replace(".", "");
    const kwh = "kwh_" + value.replace(".", "");
    const inom = "inom_" + value.replace(".", "");
    const imampu = "imampu_" + value.replace(".", "");
    return (
      <>
        <TableCell size="small">{(data as any)[arus]!}</TableCell>
        <TableCell size="small">{(data as any)[mw]!}</TableCell>
        <TableCell size="small">{(data as any)[mvar]!}</TableCell>
        <TableCell size="small">{(data as any)[kwh]!}</TableCell>
        <TableCell size="small">{(data as any)[inom]!}</TableCell>
        <TableCell size="small">{(data as any)[imampu]!}</TableCell>
      </>
    );
  });
};
