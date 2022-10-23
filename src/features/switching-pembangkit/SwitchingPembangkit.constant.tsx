import Link from "next/link";
import Typography from "@mui/material/Typography";
import { GridColDef } from "@mui/x-data-grid";
import { CellType } from "./types";
import { StyledLink } from "src/components/link";

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
