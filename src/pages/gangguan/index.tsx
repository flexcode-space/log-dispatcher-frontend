import Head from "next/head";
import { Gangguan } from "src/features/gangguan";

const GangguanPage = () => {
  return (
    <>
      <Head>
        <title>Gangguan</title>
      </Head>
      <Gangguan />
    </>
  );
};

GangguanPage.acl = {
  action: "read",
  subject: "gangguan-page",
};

export default GangguanPage;
