import Head from "next/head";
import { DetailGarduInduk } from "src/features/detail-gardu-induk";

const DetailGarduIndukPage = () => {
  return (
    <>
      <Head>
        <title>Master Data - Detail Gardu Induk</title>
      </Head>
      <DetailGarduInduk />
    </>
  );
};

DetailGarduIndukPage.acl = {
  action: 'read',
  subject: 'gardu-induk-page',
}

export default DetailGarduIndukPage;
