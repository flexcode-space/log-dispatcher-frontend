import Head from "next/head";
import { PengaturanTegangan } from "src/features/pengaturan-tegangan";

const PengaturanTeganganPage = () => {
  return (
    <>
      <Head>
        <title>Pengaturan Tegangan</title>
      </Head>
      <PengaturanTegangan />
    </>
  );
};

PengaturanTeganganPage.acl = {
  action: "read",
  subject: "pengaturan-tegangan-page",
};

export default PengaturanTeganganPage;
