import { TableCell } from "src/components/table";
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
        <TableCell>{(data as any)[arus]!}</TableCell>
        <TableCell>{(data as any)[mw]!}</TableCell>
        <TableCell>{(data as any)[mvar]!}</TableCell>
        <TableCell>{(data as any)[kwh]!}</TableCell>
        <TableCell>{(data as any)[inom]!}</TableCell>
        <TableCell>{(data as any)[imampu]!}</TableCell>
      </>
    );
  });
};
