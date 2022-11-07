import { GridColDef } from "@mui/x-data-grid";

export const defaultColumns: GridColDef[] = [
  {
    flex: 0.25,
    minWidth: 150,
    field: "no",
    headerName: "No",
  },
  {
    flex: 0.35,
    field: "lokasi",
    minWidth: 80,
    headerName: "Lokasi",
  },
  {
    flex: 0.35,
    field: "dmn",
    minWidth: 80,
    headerName: "DMN",
  },
  {
    flex: 0.35,
    field: "tml",
    minWidth: 80,
    headerName: "TML",
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

export const ENERGI_PRIMER = [
  {
    value: "1",
    label: "Air",
  },
  {
    value: "2",
    label: "Batu Bara",
  },
  {
    value: "3",
    label: "Uap",
  },
];
