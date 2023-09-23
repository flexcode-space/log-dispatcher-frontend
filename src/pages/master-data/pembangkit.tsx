import Head from "next/head";
import { Pembangkit } from "src/features/pembangkit";

const PembangkitPage = () => {
  return (
    <>
      <Head>
        <title>Master Data - Pembangkit</title>
      </Head>
      <Pembangkit />
    </>
  );
};

PembangkitPage.acl = {
  action: 'read',
  subject: 'pembangkit-page',
}

export default PembangkitPage;
