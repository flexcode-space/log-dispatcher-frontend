import { GridColDef } from "@mui/x-data-grid";
import TableCell from "@mui/material/TableCell";
import { Data } from "src/api/beban/types";

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

export const time = [
  "00.30",
  "01.00",
  "01.30",
  "02.00",
  "02.30",
  "03.00",
  "03.30",
  "04.00",
  "04.30",
  "05.00",
  "05.30",
  "06.00",
  "06.30",
  "07.00",
  "07.30",
  "08.00",
  "08.30",
  "09.00",
  "09.30",
  "10.00",
  "10.30",
  "11.00",
  "11.30",
  "12.00",
  "12.30",
  "13.00",
  "13.30",
  "14.00",
  "14.30",
  "15.00",
  "15.30",
  "16.00",
  "16.30",
  "17.00",
  "17.30",
  "18.00",
  "18.30",
  "19.00",
  "19.30",
  "20.00",
  "20.30",
  "21.00",
  "21.30",
  "22.00",
  "22.30",
  "23.00",
  "23.30",
  "24.00",
];

export const showValueBeban = (data: Data) => {
  if (!data) return <></>;

  return Object.values(time).map((value) => {
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
