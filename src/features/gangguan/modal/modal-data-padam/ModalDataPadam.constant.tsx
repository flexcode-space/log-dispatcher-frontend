import * as yup from "yup";
import { RenderCell } from "src/components/table";
import { formatDecimalNumber } from "src/utils/number";
import { CellType } from "src/types";

export const defaultColumns = [
  {
    flex: 0.25,
    minWidth: 100,
    field: "penyulang",
    headerName: "Penyulang",
  },
  {
    flex: 0.25,
    minWidth: 100,
    field: "kw",
    headerName: "KW",
    renderCell: ({ row }: CellType) => {
      const { kw } = row;
      return <RenderCell>{formatDecimalNumber(kw)} </RenderCell>;
    },
  },
  {
    flex: 0.25,
    minWidth: 100,
    field: "menit",
    headerName: "Menit",
  },
  {
    flex: 0.25,
    minWidth: 100,
    field: "kwh",
    headerName: "kwh",
    renderCell: ({ row }: CellType) => {
      const { kwh } = row;
      return <RenderCell>{formatDecimalNumber(kwh)} </RenderCell>;
    },
  },
  {
    flex: 0.25,
    minWidth: 100,
    field: "keterangan",
    headerName: "Keterangan",
  },
];

export const initialValues = {
  keterangan: "",
  kw: 0,
  menit: 0,
  penyulang: "",
};

export const validationSchema = yup.object({
  keterangan: yup.string().required("This field is required"),
  kw: yup.number().required("This field is required"),
  menit: yup.number().required("This field is required"),
  penyulang: yup.string().required("This field is required"),
});
