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

LaporanScadaPage.acl = {
  action: "read",
  subject: "laporan-scada-page",
};

export default LaporanScadaPage;
