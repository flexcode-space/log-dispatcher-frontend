import { CellType } from "src/types";
import { RenderCell } from "src/components/table";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

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
    renderCell: ({ row }: CellType) => {
      const { tanggal } = row;
      return (
        <RenderCell>
          {dayjs(tanggal, "YYYY-MM-DD").format("DD MMM YYYY")}
        </RenderCell>
      );
    },
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
    renderCell: ({ row }: CellType) => {
      const { close } = row;
      return <RenderCell>{dayjs(close, "HH:mm").format("HH:mm")}</RenderCell>;
    },
  },
  {
    flex: 0.25,
    minWidth: 500,
    field: "keterangan",
    headerName: "Keterangan",
  },
];
