import Head from "next/head";
import { Batubara } from "src/features/batubara";

const BatubaraPage = () => {
  return (
    <>
      <Head>
        <title>Energi Primer - Batubara</title>
      </Head>
      <Batubara />
    </>
  );
};

BatubaraPage.acl = {
  action: 'read',
  subject: 'batubara-page'
}

export default BatubaraPage;
