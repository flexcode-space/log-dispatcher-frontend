import Head from "next/head";
import { IBT } from "src/features/ibt";

const IBTPage = () => {
  return (
    <>
      <Head>
        <title>Master Data - IBT</title>
      </Head>
      <IBT />
    </>
  );
};

IBTPage.acl = {
  action: 'read',
  subject: 'ibt-page',
}

export default IBTPage;
