import { ThemeColor } from "src/@core/layouts/types";

export interface Colors {
  [key: string]: ThemeColor;
}

export interface CellType {
  row: any;
}

export type FieldValues = {
  tipe: string;
  scada: string;
  tanggal: string;
  pembangkit?: {
    w: string;
    var: string;
  };
  trafo: {
    w: string;
    var: string;
  };
  ibt: {
    w: string;
    var: string;
  };
};