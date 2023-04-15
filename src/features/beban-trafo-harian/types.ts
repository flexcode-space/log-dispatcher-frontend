import { ThemeColor } from "src/@core/layouts/types";

export interface Colors {
  [key: string]: ThemeColor;
}

export interface CellType {
  row: any;
}

export interface BebanTrafo {
  upt: string;
  sub_sistem: string;
  color: string;
  gardu_induk: string;
  trafo: {
    id: string
    nama: string
    scada_b_1: string
    scada_b_2: string
    scada_b_3: string
    amr_point: string
  };
  daya: number;
  rasio: string;
  arus_nominal: number;
  arus_mampu: number;
  setting_ocr: number;
  data: Data;
}
export interface Data {
  arus_0030: number;
  arus_0100: number;
  arus_0130: number;
  arus_0200: number;
  arus_0230: number;
  arus_0300: number;
  arus_0330: number;
  arus_0400: number;
  arus_0430: number;
  arus_0500: number;
  arus_0530: number;
  arus_0600: number;
  arus_0630: number;
  arus_0700: number;
  arus_0730: number;
  arus_0800: number;
  arus_0830: number;
  arus_0900: number;
  arus_0930: number;
  arus_1000: number;
  arus_1030: number;
  arus_1100: number;
  arus_1130: number;
  arus_1200: number;
  arus_1230: number;
  arus_1300: number;
  arus_1330: number;
  arus_1400: number;
  arus_1430: number;
  arus_1500: number;
  arus_1530: number;
  arus_1600: number;
  arus_1630: number;
  arus_1700: number;
  arus_1730: number;
  arus_1800: number;
  arus_1830: number;
  arus_1900: number;
  arus_1930: number;
  arus_2000: number;
  arus_2030: number;
  arus_2100: number;
  arus_2130: number;
  arus_2200: number;
  arus_2230: number;
  arus_2300: number;
  arus_2330: number;
  arus_2400: number;
  arus_mampu: number;
  arus_nominal: number;
  id: string;
  imampu_0030: number;
  imampu_0100: number;
  imampu_0130: number;
  imampu_0200: number;
  imampu_0230: number;
  imampu_0300: number;
  imampu_0330: number;
  imampu_0400: number;
  imampu_0430: number;
  imampu_0500: number;
  imampu_0530: number;
  imampu_0600: number;
  imampu_0630: number;
  imampu_0700: number;
  imampu_0730: number;
  imampu_0800: number;
  imampu_0830: number;
  imampu_0900: number;
  imampu_0930: number;
  imampu_1000: number;
  imampu_1030: number;
  imampu_1100: number;
  imampu_1130: number;
  imampu_1200: number;
  imampu_1230: number;
  imampu_1300: number;
  imampu_1330: number;
  imampu_1400: number;
  imampu_1430: number;
  imampu_1500: number;
  imampu_1530: number;
  imampu_1600: number;
  imampu_1630: number;
  imampu_1700: number;
  imampu_1730: number;
  imampu_1800: number;
  imampu_1830: number;
  imampu_1900: number;
  imampu_1930: number;
  imampu_2000: number;
  imampu_2030: number;
  imampu_2100: number;
  imampu_2130: number;
  imampu_2200: number;
  imampu_2230: number;
  imampu_2300: number;
  imampu_2330: number;
  imampu_2400: number;
  inom_0030: number;
  inom_0100: number;
  inom_0130: number;
  inom_0200: number;
  inom_0230: number;
  inom_0300: number;
  inom_0330: number;
  inom_0400: number;
  inom_0430: number;
  inom_0500: number;
  inom_0530: number;
  inom_0600: number;
  inom_0630: number;
  inom_0700: number;
  inom_0730: number;
  inom_0800: number;
  inom_0830: number;
  inom_0900: number;
  inom_0930: number;
  inom_1000: number;
  inom_1030: number;
  inom_1100: number;
  inom_1130: number;
  inom_1200: number;
  inom_1230: number;
  inom_1300: number;
  inom_1330: number;
  inom_1400: number;
  inom_1430: number;
  inom_1500: number;
  inom_1530: number;
  inom_1600: number;
  inom_1630: number;
  inom_1700: number;
  inom_1730: number;
  inom_1800: number;
  inom_1830: number;
  inom_1900: number;
  inom_1930: number;
  inom_2000: number;
  inom_2030: number;
  inom_2100: number;
  inom_2130: number;
  inom_2200: number;
  inom_2230: number;
  inom_2300: number;
  inom_2330: number;
  inom_2400: number;
  jenis_peralatan: string;
  kvar_0030: number;
  kvar_0100: number;
  kvar_0130: number;
  kvar_0200: number;
  kvar_0230: number;
  kvar_0300: number;
  kvar_0330: number;
  kvar_0400: number;
  kvar_0430: number;
  kvar_0500: number;
  kvar_0530: number;
  kvar_0600: number;
  kvar_0630: number;
  kvar_0700: number;
  kvar_0730: number;
  kvar_0800: number;
  kvar_0830: number;
  kvar_0900: number;
  kvar_0930: number;
  kvar_1000: number;
  kvar_1030: number;
  kvar_1100: number;
  kvar_1130: number;
  kvar_1200: number;
  kvar_1230: number;
  kvar_1300: number;
  kvar_1330: number;
  kvar_1400: number;
  kvar_1430: number;
  kvar_1500: number;
  kvar_1530: number;
  kvar_1600: number;
  kvar_1630: number;
  kvar_1700: number;
  kvar_1730: number;
  kvar_1800: number;
  kvar_1830: number;
  kvar_1900: number;
  kvar_1930: number;
  kvar_2000: number;
  kvar_2030: number;
  kvar_2100: number;
  kvar_2130: number;
  kvar_2200: number;
  kvar_2230: number;
  kvar_2300: number;
  kvar_2330: number;
  kvar_2400: number;
  kwh_0030: number;
  kwh_0100: number;
  kwh_0130: number;
  kwh_0200: number;
  kwh_0230: number;
  kwh_0300: number;
  kwh_0330: number;
  kwh_0400: number;
  kwh_0430: number;
  kwh_0500: number;
  kwh_0530: number;
  kwh_0600: number;
  kwh_0630: number;
  kwh_0700: number;
  kwh_0730: number;
  kwh_0800: number;
  kwh_0830: number;
  kwh_0900: number;
  kwh_0930: number;
  kwh_1000: number;
  kwh_1030: number;
  kwh_1100: number;
  kwh_1130: number;
  kwh_1200: number;
  kwh_1230: number;
  kwh_1300: number;
  kwh_1330: number;
  kwh_1400: number;
  kwh_1430: number;
  kwh_1500: number;
  kwh_1530: number;
  kwh_1600: number;
  kwh_1630: number;
  kwh_1700: number;
  kwh_1730: number;
  kwh_1800: number;
  kwh_1830: number;
  kwh_1900: number;
  kwh_1930: number;
  kwh_2000: number;
  kwh_2030: number;
  kwh_2100: number;
  kwh_2130: number;
  kwh_2200: number;
  kwh_2230: number;
  kwh_2300: number;
  kwh_2330: number;
  kwh_2400: number;
  mva_value: number;
  mw_0030: number;
  mw_0100: number;
  mw_0130: number;
  mw_0200: number;
  mw_0230: number;
  mw_0300: number;
  mw_0330: number;
  mw_0400: number;
  mw_0430: number;
  mw_0500: number;
  mw_0530: number;
  mw_0600: number;
  mw_0630: number;
  mw_0700: number;
  mw_0730: number;
  mw_0800: number;
  mw_0830: number;
  mw_0900: number;
  mw_0930: number;
  mw_1000: number;
  mw_1030: number;
  mw_1100: number;
  mw_1130: number;
  mw_1200: number;
  mw_1230: number;
  mw_1300: number;
  mw_1330: number;
  mw_1400: number;
  mw_1430: number;
  mw_1500: number;
  mw_1530: number;
  mw_1600: number;
  mw_1630: number;
  mw_1700: number;
  mw_1730: number;
  mw_1800: number;
  mw_1830: number;
  mw_1900: number;
  mw_1930: number;
  mw_2000: number;
  mw_2030: number;
  mw_2100: number;
  mw_2130: number;
  mw_2200: number;
  mw_2230: number;
  mw_2300: number;
  mw_2330: number;
  mw_2400: number;
  mx_0030: number;
  mx_0100: number;
  mx_0130: number;
  mx_0200: number;
  mx_0230: number;
  mx_0300: number;
  mx_0330: number;
  mx_0400: number;
  mx_0430: number;
  mx_0500: number;
  mx_0530: number;
  mx_0600: number;
  mx_0630: number;
  mx_0700: number;
  mx_0730: number;
  mx_0800: number;
  mx_0830: number;
  mx_0900: number;
  mx_0930: number;
  mx_1000: number;
  mx_1030: number;
  mx_1100: number;
  mx_1130: number;
  mx_1200: number;
  mx_1230: number;
  mx_1300: number;
  mx_1330: number;
  mx_1400: number;
  mx_1430: number;
  mx_1500: number;
  mx_1530: number;
  mx_1600: number;
  mx_1630: number;
  mx_1700: number;
  mx_1730: number;
  mx_1800: number;
  mx_1830: number;
  mx_1900: number;
  mx_1930: number;
  mx_2000: number;
  mx_2030: number;
  mx_2100: number;
  mx_2130: number;
  mx_2200: number;
  mx_2230: number;
  mx_2300: number;
  mx_2330: number;
  mx_2400: number;
  nama_gardu_induk: string;
  nama_sub_sistem: string;
  nama_trafo: string;
  nama_upt: string;
  primary_color: string;
  pw_0030: number;
  pw_0100: number;
  pw_0130: number;
  pw_0200: number;
  pw_0230: number;
  pw_0300: number;
  pw_0330: number;
  pw_0400: number;
  pw_0430: number;
  pw_0500: number;
  pw_0530: number;
  pw_0600: number;
  pw_0630: number;
  pw_0700: number;
  pw_0730: number;
  pw_0800: number;
  pw_0830: number;
  pw_0900: number;
  pw_0930: number;
  pw_1000: number;
  pw_1030: number;
  pw_1100: number;
  pw_1130: number;
  pw_1200: number;
  pw_1230: number;
  pw_1300: number;
  pw_1330: number;
  pw_1400: number;
  pw_1430: number;
  pw_1500: number;
  pw_1530: number;
  pw_1600: number;
  pw_1630: number;
  pw_1700: number;
  pw_1730: number;
  pw_1800: number;
  pw_1830: number;
  pw_1900: number;
  pw_1930: number;
  pw_2000: number;
  pw_2030: number;
  pw_2100: number;
  pw_2130: number;
  pw_2200: number;
  pw_2230: number;
  pw_2300: number;
  pw_2330: number;
  pw_2400: number;
  px_0030: number;
  px_0100: number;
  px_0130: number;
  px_0200: number;
  px_0230: number;
  px_0300: number;
  px_0330: number;
  px_0400: number;
  px_0430: number;
  px_0500: number;
  px_0530: number;
  px_0600: number;
  px_0630: number;
  px_0700: number;
  px_0730: number;
  px_0800: number;
  px_0830: number;
  px_0900: number;
  px_0930: number;
  px_1000: number;
  px_1030: number;
  px_1100: number;
  px_1130: number;
  px_1200: number;
  px_1230: number;
  px_1300: number;
  px_1330: number;
  px_1400: number;
  px_1430: number;
  px_1500: number;
  px_1530: number;
  px_1600: number;
  px_1630: number;
  px_1700: number;
  px_1730: number;
  px_1800: number;
  px_1830: number;
  px_1900: number;
  px_1930: number;
  px_2000: number;
  px_2030: number;
  px_2100: number;
  px_2130: number;
  px_2200: number;
  px_2230: number;
  px_2300: number;
  px_2330: number;
  px_2400: number;
  rasio_tegangan: string;
  secondary_color: string;
  tertiary_color: string;
}
