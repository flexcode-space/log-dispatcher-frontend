import Head from "next/head";
import { Penghantar } from "src/features/penghantar";

const PenghantarPage = () => {
  return (
    <>
      <Head>
        <title>Master Data - Penghantar</title>
      </Head>
      <Penghantar />
    </>
  );
};

PenghantarPage.acl = {
  action: 'read',
  subject: 'penghantar-page',
}

export default PenghantarPage;
