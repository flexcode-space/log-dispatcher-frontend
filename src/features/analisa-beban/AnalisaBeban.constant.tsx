export const dataMock = [
  "Tanjung Jati",
  "100",
  "128",
  "07:30",
  "100",
  "128",
  "19:30",
  "124",
  "200",
  "19:30",
  "Pedan",
  "Busbar 1",
  "200",
  "19:30",
  "Pedan",
  "Busbar 1",
  "200",
];

export const defaultColumns = [
  {
    flex: 0.25,
    field: "subsistem",
    headerName: "Subsistem",
  },
  {
    flex: 0.35,
    // minWidth: 100,
    field: "ibt",
    headerName: "IBT",
  },
  {
    flex: 0.25,
    field: "jam",
    headerName: "Jam",
  },
  {
    flex: 0.25,
    field: "arus",
    headerName: "Arus",
  },
  {
    flex: 0.25,
    field: "mw",
    headerName: "MW",
  },
  {
    flex: 0.25,
    field: "mvar",
    headerName: "MVAR",
  },
  {
    flex: 0.25,
    field: "persen",
    headerName: "%",
  },
];

export const mockDataMonitoring = () => {
  const data = {
    subsistem: "Tanjung Jati",
    ibt: "IBT-1",
    jam: "18.00",
    arus: "20",
    mw: "124",
    mvar: "40",
    persen: "80%",
  };

  const array = [];

  for (let i = 0; i < 5; i++) {
    array.push({ ...data, id: i });
  }

  return array;
};
