import Head from "next/head";
import { Rekonfigurasi } from "src/features/rekonfigurasi";

const RekonfigurasiPage = () => {
  return (
    <>
      <Head>
        <title>Rekonfigurasi</title>
      </Head>
      <Rekonfigurasi />
    </>
  );
};

RekonfigurasiPage.acl = {
  action: "read",
  subject: "rekonfigurasi-page",
};

export default RekonfigurasiPage;
