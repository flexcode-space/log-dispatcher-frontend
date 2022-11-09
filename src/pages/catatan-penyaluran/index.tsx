import Head from "next/head";
import { CatatanPenyaluran } from "src/features/catatan-penyaluran";

const CatatanPenyaluranPage = () => {
  return (
    <>
      <Head>
        <title>Catatan Penyaluran</title>
      </Head>
      <CatatanPenyaluran />
    </>
  );
};

export default CatatanPenyaluranPage;
