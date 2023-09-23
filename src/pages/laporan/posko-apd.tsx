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

LaporanPoskoApdPage.acl = {
  action: "read",
  subject: "laporan-posko-apd-page",
};

export default LaporanPoskoApdPage;
