import { TableCell } from "src/components/table";
import { formatDecimalNumber } from "src/utils/number";
import { Data } from "./types";
import { TIME } from "src/constants/time";

export const showValueBeban = (data: Data) => {
  if (!data) return <></>;

  return Object.values(TIME).map((value) => {
    const arus = "arus_" + value.replace(".", "");
    const mw = "mw_" + value.replace(".", "");
    const mvar = "mx_" + value.replace(".", "");
    const kwh = "kwh_" + value.replace(".", "");
    const inom = "inom_" + value.replace(".", "");
    const imampu = "imampu_" + value.replace(".", "");
    return (
      <>
        <TableCell>{formatDecimalNumber((data as any)[arus]!, 2)}</TableCell>
        <TableCell>{formatDecimalNumber((data as any)[mw]!, 2)}</TableCell>
        <TableCell>{formatDecimalNumber((data as any)[mvar]!, 2)}</TableCell>
        <TableCell>{formatDecimalNumber((data as any)[kwh]!, 2)}</TableCell>
        <TableCell>{formatDecimalNumber((data as any)[inom]!, 2)}</TableCell>
        <TableCell>{formatDecimalNumber((data as any)[imampu]!, 2)}</TableCell>
      </>
    );
  });
};
