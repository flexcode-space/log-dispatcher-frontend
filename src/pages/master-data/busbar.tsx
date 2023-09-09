import Head from "next/head";
import { Busbar } from "src/features/busbar";

const BusbarPage = () => {
  return (
    <>
      <Head>
        <title>Master Data - Busbar</title>
      </Head>
      <Busbar />
    </>
  );
};

BusbarPage.acl = {
  action: 'read',
  subject: 'busbar-page',
}

export default BusbarPage;
