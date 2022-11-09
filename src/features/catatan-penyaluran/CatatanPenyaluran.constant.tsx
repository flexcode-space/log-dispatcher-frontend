export const defaultColumns = [
  {
    flex: 0.25,
    field: "lokasi",
    minWidth: 200,
    headerName: "Lokasi",
  },
  {
    flex: 0.25,
    minWidth: 70,
    field: "jurusan",
    headerName: "Jurusan",
  },
  {
    flex: 0.25,
    minWidth: 200,
    field: "waktu_mulai",
    headerName: "Waktu Mulai",
  },
  {
    flex: 0.25,
    minWidth: 200,
    field: "waktu_akhir",
    headerName: "Waktu Akhir",
  },
  {
    flex: 0.25,
    minWidth: 200,
    field: "keterangan",
    headerName: "Keterangan",
  },
];

export const mockData = () => {
  const array = [];

  for (let i = 0; i < 5; i++) {
    array.push({
      id: i,
      lokasi: "PLTA MRICA 1",
      jurusan: "Reaktor 4R-2. ",
      waktu_mulai: "22 Januari 2022, 01.43 WIB",
      waktu_akhir: "23 Januari 2022, 01.43 WIB",
      keterangan: "PMT 66 KV dan Reaktor 4R-2 dinyatakan rusak.",
    });
  }

  return array;
};
