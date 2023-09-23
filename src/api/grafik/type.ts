export interface BebanSubsistem {
  subsistem?: Data[] | null;
  total: Data;
}
export interface Data {
  nama: string;
  total: Total;
  pagi: PagiOrSiangOrMalam;
  siang: PagiOrSiangOrMalam;
  malam: PagiOrSiangOrMalam;
  color: string;
}
export interface Total {
  mw: number;
  mvar: number;
}
export interface PagiOrSiangOrMalam {
  jam: string;
  mw: number;
  mvar: number;
}

export interface MonitorBusbar {
  tertinggi: DataMonitorBusbar[];
  terendah: DataMonitorBusbar[];
  total_tertinggi: DataMonitorBusbar;
  total_terendah: DataMonitorBusbar;
}

export interface DataMonitorBusbar {
  id: string;
  jam: string;
  gardu_induk: string;
  peralatan: string;
  tegangan: number;
}

