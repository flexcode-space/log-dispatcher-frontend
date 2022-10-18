import Head from "next/head";
import { RencanaHarian } from "src/features/rencana-harian";

const RencanaHarianPage = () => {
  return (
    <>
      <Head>
        <title>Rencana Harian</title>
      </Head>
      <RencanaHarian />
    </>
  );
};

export default RencanaHarianPage;
