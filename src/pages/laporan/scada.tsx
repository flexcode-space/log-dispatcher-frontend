import Head from "next/head";
import { LaporanScada } from "src/features/laporan-scada";

const LaporanScadaPage = () => {
  return (
    <>
      <Head>
        <title>Laporan SCADA</title>
      </Head>
      <LaporanScada />
    </>
  );
};

export default LaporanScadaPage;
