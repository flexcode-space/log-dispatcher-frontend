import Head from "next/head";
import { Manuver } from "src/features/manuver";

const ManuverPage = () => {
  return (
    <>
      <Head>
        <title>Manuver</title>
      </Head>
      <Manuver />
    </>
  );
};

ManuverPage.acl = {
  action: "read",
  subject: "gangguan-page",
};

export default ManuverPage;
