import Head from "next/head";
import { Trafo } from "src/features/trafo";

const TrafoPage = () => {
  return (
    <>
      <Head>
        <title>Master Data - Trafo</title>
      </Head>
      <Trafo />
    </>
  );
};

TrafoPage.acl = {
  action: 'read',
  subject: 'trafo-page',
}

export default TrafoPage;
