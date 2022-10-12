import Head from "next/head";
import { BebanHarian } from "src/features/beban-harian";

const BebanHarianPage = () => {
  return (
    <>
      <Head>
        <title>Beban Trafo Harian</title>
      </Head>
      <BebanHarian />
    </>
  );
};

export default BebanHarianPage;
