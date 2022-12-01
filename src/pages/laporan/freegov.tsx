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

export default LaporanFreeGovPage;
