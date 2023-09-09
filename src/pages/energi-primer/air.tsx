import Head from "next/head";
import { Air } from "src/features/air";

const AirPage = () => {
  return (
    <>
      <Head>
        <title>Energi Primer - Air</title>
      </Head>
      <Air />
    </>
  );
};

AirPage.acl = {
  action: 'read',
  subject: 'air-page'
}

export default AirPage;
