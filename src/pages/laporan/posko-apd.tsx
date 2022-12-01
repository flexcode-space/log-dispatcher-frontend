import Head from "next/head";
import { LaporanPoskoApd } from "src/features/laporan-posko-apd";

const LaporanPoskoApdPage = () => {
  return (
    <>
      <Head>
        <title>Laporan Posko APD</title>
      </Head>
      <LaporanPoskoApd />
    </>
  );
};

export default LaporanPoskoApdPage;
