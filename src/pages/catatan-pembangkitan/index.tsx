import Head from "next/head";
import { CatatanPembangkitan } from "src/features/catatan-pembangkitan";

const CatatanPembangkitanPage = () => {
  return (
    <>
      <Head>
        <title>Catatan Pembangkitan</title>
      </Head>
      <CatatanPembangkitan />
    </>
  );
};

CatatanPembangkitanPage.acl = {
  action: 'read',
  subject: 'catatan-pembangkitan-page',
}

export default CatatanPembangkitanPage;
