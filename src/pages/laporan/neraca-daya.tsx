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

LaporanNeracaDayaPage.acl = {
  action: "read",
  subject: "laporan-neraca-daya-page",
}

export default LaporanNeracaDayaPage;
