import Head from "next/head";
import { ProduksiKwh } from "src/features/produksi-kwh";

const ProduksiKwhPage = () => {
  return (
    <>
      <Head>
        <title>Produksi KWH</title>
      </Head>
      <ProduksiKwh />
    </>
  );
};

ProduksiKwhPage.acl = {
  action: 'read',
  subject: 'produksi-kwh-page'
}

export default ProduksiKwhPage;
