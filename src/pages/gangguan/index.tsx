import Head from "next/head";
import { Gangguan } from "src/features/gangguan";

const GangguanPage = () => {
  return (
    <>
      <Head>
        <title>Gangguan</title>
      </Head>
      <Gangguan />
    </>
  );
};

export default GangguanPage;
