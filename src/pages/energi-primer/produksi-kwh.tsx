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

export default ProduksiKwhPage;
