import Head from "next/head";
import { Reaktor } from "src/features/reaktor";

const ReaktorPage = () => {
  return (
    <>
      <Head>
        <title>Master Data - Reaktor</title>
      </Head>
      <Reaktor />
    </>
  );
};

ReaktorPage.acl = {
  action: 'read',
  subject: 'reaktor-page',
}

export default ReaktorPage;
