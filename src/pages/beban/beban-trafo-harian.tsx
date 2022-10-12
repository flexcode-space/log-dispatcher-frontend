import Head from "next/head";
import { BebanTrafoHarian } from "src/features/beban-trafo-harian";

const BebanTrafoHarianPage = () => {
  return (
    <>
      <Head>
        <title>Beban Trafo Harian</title>
      </Head>
      <BebanTrafoHarian />
    </>
  );
};

export default BebanTrafoHarianPage;
