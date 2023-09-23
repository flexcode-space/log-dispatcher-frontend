import Head from "next/head";
import { LaporanFreeGov } from "src/features/laporan-free-gov";

const LaporanFreeGovPage = () => {
  return (
    <>
      <Head>
        <title>Laporan FreeGov</title>
      </Head>
      <LaporanFreeGov />
    </>
  );
};

LaporanFreeGovPage.acl = {
  action: "read",
  subject: "laporan-freegov-page",
};

export default LaporanFreeGovPage;
