import Link from "next/link";
import Typography from "@mui/material/Typography";
import { CellType } from "./types";
import { StyledLink } from "src/components/link";

const url = "/master-data/subsistem";

export const defaultColumns = [
  {
    flex: 0.25,
    minWidth: 150,
    field: "nama",
    headerName: "Subsistem",
  },
  {
    flex: 0.35,
    field: "ibt",
    minWidth: 80,
    headerName: "Jumlah IBT",
    renderCell: ({ row }: CellType) => (
      <Link href={`${url}/${row.id}?tab=ibt`}>
        <StyledLink>{row.ibt}</StyledLink>
      </Link>
    ),
  },
  {
    flex: 0.25,
    field: "pembangkit",
    minWidth: 80,
    headerName: "Jumlah Pembangkit",
    renderCell: ({ row }: CellType) => (
      <Link href={`${url}/${row.id}?tab=pembangkit`}>
        <StyledLink>{row.pembangkit}</StyledLink>
      </Link>
    ),
  },
  {
    flex: 0.25,
    minWidth: 215,
    field: "penghantar",
    headerName: "Jumlah Penghantar",
    renderCell: ({ row }: CellType) => (
      <Link href={`${url}/${row.id}?tab=penghantar`}>
        <StyledLink>{row.penghantar}</StyledLink>
      </Link>
    ),
  },
  {
    flex: 0.25,
    field: "trafo",
    minWidth: 80,
    headerName: "Jumlah Trafo",
    renderCell: ({ row }: CellType) => (
      <Link href={`${url}/${row.id}?tab=trafo`}>
        <StyledLink>{row.trafo}</StyledLink>
      </Link>
    ),
  },
  {
    flex: 0.25,
    field: "busbar",
    minWidth: 80,
    headerName: "Busbar",
    renderCell: ({ row }: CellType) => (
      <Link href={`${url}/${row.id}?tab=busbar`}>
        <StyledLink>{row.busbar}</StyledLink>
      </Link>
    ),
  },
  {
    flex: 0.25,
    field: "reaktor",
    minWidth: 80,
    headerName: "Reaktor Kapasitor",
    renderCell: ({ row }: CellType) => (
      <Link href={`${url}/${row.id}?tab=reaktor`}>
        <StyledLink>{row.reaktor}</StyledLink>
      </Link>
    ),
  },
];
