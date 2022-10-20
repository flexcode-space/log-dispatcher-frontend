import Head from "next/head";
import { Grafik } from "src/features/grafik";

const GrafikPage = () => {
  return (
    <>
      <Head>
        <title>Grafik Beban</title>
      </Head>
      <Grafik />
    </>
  );
};

export default GrafikPage;
