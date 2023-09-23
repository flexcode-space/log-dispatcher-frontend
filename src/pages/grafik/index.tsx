import Head from "next/head";
import { Grafik } from "src/features/grafik";

const GrafikPage = () => {
  return (
    <>
      <Head>
        <title>Grafik Beban</title>
      </Head>
      <Grafik />
    </>
  );
};

GrafikPage.acl = {
  action: 'read',
  subject: 'grafik-page',
}

export default GrafikPage;
