import Head from "next/head";
import { BebanPenghantarHarian } from "src/features/beban-penghantar-harian";

const BebanPenghantarHarianPage = () => {
  return (
    <>
      <Head>
        <title>Beban Penghantar Harian</title>
      </Head>
      <BebanPenghantarHarian />
    </>
  );
};

BebanPenghantarHarianPage.acl = {
  action: 'read',
  subject: 'beban-penghantar-harian-page',
}

export default BebanPenghantarHarianPage;
