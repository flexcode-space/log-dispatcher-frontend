import TableCell from "@mui/material/TableCell";
import { Data } from "./types";
import { GridColDef } from "@mui/x-data-grid";
import { TIME } from "src/constants/time";

const url = "/master-data/subsistem";

export const defaultColumns: GridColDef[] = [
  {
    flex: 0.25,
    minWidth: 150,
    field: "no",
    headerName: "No",
  },
  {
    flex: 0.35,
    field: "upt",
    minWidth: 80,
    headerName: "UPT",
  },
  {
    flex: 0.35,
    field: "sub_sistem",
    minWidth: 80,
    headerName: "Subsistem",
  },
  {
    flex: 0.35,
    field: "gardu_induk",
    minWidth: 80,
    headerName: "Gardu Induk",
  },
  {
    flex: 0.35,
    field: "trafo",
    minWidth: 80,
    headerName: "Trafo",
  },
  {
    flex: 0.35,
    field: "daya",
    minWidth: 80,
    headerName: "Daya (MVA)",
  },
  {
    flex: 0.35,
    field: "ratio",
    minWidth: 80,
    headerName: "Ratio",
  },
  {
    flex: 0.35,
    field: "arus_nominal",
    minWidth: 80,
    headerName: "Arus Nominal (A)",
  },
  {
    flex: 0.35,
    field: "arus_mampu",
    minWidth: 80,
    headerName: "Arus Mampu (A)",
  },
  {
    flex: 0.35,
    field: "ocr",
    minWidth: 80,
    headerName: "Setting OCR",
  },
];

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
