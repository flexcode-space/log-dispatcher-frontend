import Head from "next/head";
import { LaporanNeracaDaya } from "src/features/laporan-neraca-daya";

const LaporanNeracaDayaPage = () => {
  return (
    <>
      <Head>
        <title>Laporan Neraca Daya</title>
      </Head>
      <LaporanNeracaDaya />
    </>
  );
};

export default LaporanNeracaDayaPage;
