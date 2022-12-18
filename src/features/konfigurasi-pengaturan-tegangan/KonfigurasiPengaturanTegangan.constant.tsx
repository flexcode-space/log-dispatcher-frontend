import { CellType } from "src/types";
import { RenderCell } from "src/components/table";

export const defaultColumns = [
  {
    flex: 0.25,
    field: "gardu_induk",
    minWidth: 200,
    headerName: "Lokasi",
    renderCell: ({ row }: CellType) => {
      const { gardu_induk } = row;
      return <RenderCell>{gardu_induk?.nama}</RenderCell>;
    },
  },
  {
    flex: 0.25,
    minWidth: 70,
    field: "jurusan",
    headerName: "Jurusan",
  },
];

export const TABLE_LIST = [
  {
    title: "Kapasitor",
    type: "kapasitor",
  },
  {
    title: "Penghantar",
    type: "penghantar",
  },
  {
    title: "Cadangan",
    type: "cadangan",
  },
];
