import Link from "next/link";
import { CellType } from "./types";
import { StyledLink } from "src/components/link";
import { Typography } from "@mui/material";

const url = "/master-data/gardu-induk";

export const defaultColumns = [
  {
    flex: 0.25,
    minWidth: 150,
    field: "nama",
    headerName: "Nama",
  },
  {
    flex: 0.25,
    minWidth: 200,
    field: "nama_upt",
    headerName: "UPT",
    renderCell: ({ row }: CellType) => (
      <Typography
        variant="subtitle2"
        noWrap
        sx={{ textTransform: "capitalize" }}
      >
        {row.nama}
      </Typography>
    ),
  },
  {
    flex: 0.35,
    field: "ibt",
    minWidth: 80,
    headerName: "IBT",
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
    headerName: "Pembangkit",
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
    headerName: "Penghantar",
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
    headerName: "Trafo",
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
