import Head from "next/head";
import { UnggahLaporan } from "src/features/unggah-laporan";

const UnggahLaporanPage = () => {
  return (
    <>
      <Head>
        <title>Beban - Unggah Data Scada & AMR</title>
      </Head>
      <UnggahLaporan />
    </>
  );
};

export default UnggahLaporanPage;
