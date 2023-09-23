import Head from "next/head";
import { LaporanFor } from "src/features/laporan-for";

const LaporanForPage = () => {
  return (
    <>
      <Head>
        <title>Laporan FOR</title>
      </Head>
      <LaporanFor />
    </>
  );
};

LaporanForPage.acl = {
  action: "read",
  subject: "laporan-for-page",
};

export default LaporanForPage;
