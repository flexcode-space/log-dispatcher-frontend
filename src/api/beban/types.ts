export type Beban = {
  sub_sistem: string
  color: string
  pembangkit: Pembangkit
  ibt: IBT[]
}

export type IBT = {
  data: DataIBT[]
  total: Total
}

export type KategoriPembangkit = {
  data: DataKategoriPembangkit[]
  total: Total
}

export type Pembangkit = {
  tipe_jenis_pembangkit: TipeJenisPembangkit[]
  total: Total
}

export type TipeJenisPembangkit = {
  kategori_pembangkit: KategoriPembangkit[]
}

export type DataKategoriPembangkit = {
  id_beban: string
  jenis: string
  nama: string
  data: Data
}

export type DataIBT = DataKategoriPembangkit

export type Total = {
  nama: string
  data: Data
  color: string
}

export type Data = {
  id: string
  jenis_peralatan: string
  mva_value: string
  mw_0030: string
  mw_0100: string
  mw_0130: string
  mw_0200: string
  mw_0230: string
  mw_0300: string
  mw_0330: string
  mw_0400: string
  mw_0430: string
  mw_0500: string
  mw_0530: string
  mw_0600: string
  mw_0630: string
  mw_0700: string
  mw_0730: string
  mw_0800: string
  mw_0830: string
  mw_0900: string
  mw_0930: string
  mw_1000: string
  mw_1030: string
  mw_1100: string
  mw_1130: string
  mw_1200: string
  mw_1230: string
  mw_1300: string
  mw_1330: string
  mw_1400: string
  mw_1430: string
  mw_1500: string
  mw_1530: string
  mw_1600: string
  mw_1630: string
  mw_1700: string
  mw_1730: string
  mw_1800: string
  mw_1830: string
  mw_1900: string
  mw_1930: string
  mw_2000: string
  mw_2030: string
  mw_2100: string
  mw_2130: string
  mw_2200: string
  mw_2230: string
  mw_2300: string
  mw_2330: string
  mw_2400: string

  mx_0030: string
  mx_0100: string
  mx_0130: string
  mx_0200: string
  mx_0230: string
  mx_0300: string
  mx_0330: string
  mx_0400: string
  mx_0430: string
  mx_0500: string
  mx_0530: string
  mx_0600: string
  mx_0630: string
  mx_0700: string
  mx_0730: string
  mx_0800: string
  mx_0830: string
  mx_0900: string
  mx_0930: string
  mx_1000: string
  mx_1030: string
  mx_1100: string
  mx_1130: string
  mx_1200: string
  mx_1230: string
  mx_1300: string
  mx_1330: string
  mx_1400: string
  mx_1430: string
  mx_1500: string
  mx_1530: string
  mx_1600: string
  mx_1630: string
  mx_1700: string
  mx_1730: string
  mx_1800: string
  mx_1830: string
  mx_1900: string
  mx_1930: string
  mx_2000: string
  mx_2030: string
  mx_2100: string
  mx_2130: string
  mx_2200: string
  mx_2230: string
  mx_2300: string
  mx_2330: string
  mx_2400: string
}