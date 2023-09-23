import Head from "next/head";
import { GarduInduk } from "src/features/gardu-induk";

const GarduIndukPage = () => {
  return (
    <>
      <Head>
        <title>Master Data - Gardu Induk</title>
      </Head>
      <GarduInduk />
    </>
  );
};

GarduIndukPage.acl = {
  action: 'read',
  subject: 'gardu-induk-page',
}

export default GarduIndukPage;
