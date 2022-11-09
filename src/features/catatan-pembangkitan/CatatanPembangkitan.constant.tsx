export const defaultColumns = [
  {
    flex: 0.25,
    field: "pembangkit",
    minWidth: 200,
    headerName: "Pembangkit",
  },
  {
    flex: 0.25,
    minWidth: 70,
    field: "mampu",
    headerName: "Mampu",
  },
  {
    flex: 0.25,
    minWidth: 80,
    field: "status",
    headerName: "Status",
  },
  {
    flex: 0.25,
    minWidth: 200,
    field: "operator",
    headerName: "Operator",
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
      pembangkit: "PLTA MRICA 1",
      mampu: "50",
      status: "FD3",
      operator: "Bagoes",
      waktu_mulai: "22 Januari 2022, 01.43 WIB",
      waktu_akhir: "23 Januari 2022, 01.43 WIB",
      keterangan: "Kendala indikasi di hot well pump abnormal",
    });
  }

  return array;
};
