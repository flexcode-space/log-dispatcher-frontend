import Head from "next/head";
import { BebanIBTHarian } from "src/features/beban-ibt-harian";

const BebanIBTHarianPage = () => {
  return (
    <>
      <Head>
        <title>Beban Penghantar Harian</title>
      </Head>
      <BebanIBTHarian />
    </>
  );
};

BebanIBTHarianPage.acl = {
  action: 'read',
  subject: 'beban-ibt-harian-page',
}

export default BebanIBTHarianPage;
