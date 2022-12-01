import Head from "next/head";
import { LaporanPekerjaan } from "src/features/laporan-pekerjaan";

const LaporanPekerjaanPage = () => {
  return (
    <>
      <Head>
        <title>Laporan Pekerjaan</title>
      </Head>
      <LaporanPekerjaan />
    </>
  );
};

export default LaporanPekerjaanPage;
