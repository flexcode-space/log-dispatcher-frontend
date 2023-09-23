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

BebanHarianPage.acl = {
  action: 'read',
  subject: 'beban-harian-page',
}

export default BebanHarianPage;
