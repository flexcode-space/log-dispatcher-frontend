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

LaporanPekerjaanPage.acl = {
  action: "read",
  subject: "laporan-pekerjaan-page",
};

export default LaporanPekerjaanPage;
