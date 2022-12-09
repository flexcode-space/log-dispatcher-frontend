import { CellType } from "src/types";
import { RenderCell } from "src/components/table";

export const defaultColumns = [
  {
    flex: 0.25,
    field: "lokasi",
    minWidth: 200,
    headerName: "Gardu Induk",
    renderCell: ({ row }: CellType) => {
      const { gardu_induk } = row;
      return <RenderCell>{gardu_induk?.nama}</RenderCell>;
    },
  },
  {
    flex: 0.25,
    minWidth: 70,
    field: "jurusan",
    headerName: "Peralatan",
    renderCell: ({ row }: CellType) => {
      const { peralatan } = row;
      return <RenderCell>{peralatan?.nama}</RenderCell>;
    },
  },
  {
    flex: 0.25,
    minWidth: 200,
    field: "tanggal",
    headerName: "Tanggal",
  },
  {
    flex: 0.25,
    minWidth: 200,
    field: "manuver",
    headerName: "Manuver",
  },
  {
    flex: 0.25,
    minWidth: 200,
    field: "close",
    headerName: "Close",
  },
  {
    flex: 0.25,
    minWidth: 500,
    field: "keterangan",
    headerName: "Keterangan",
  },
];
