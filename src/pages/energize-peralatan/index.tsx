import Head from "next/head";
import { EnergizePeralatan } from "src/features/energize-peralatan";

const EnergizePeralatanPage = () => {
  return (
    <>
      <Head>
        <title>Energize Peralatan</title>
      </Head>
      <EnergizePeralatan />
    </>
  );
};

EnergizePeralatanPage.acl = {
  action: "read",
  subject: "energize-peralatan-page",
}

export default EnergizePeralatanPage;
