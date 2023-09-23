import Head from "next/head";
import { Gas } from "src/features/gas";

const GasDanHSDPage = () => {
  return (
    <>
      <Head>
        <title>Energi Primer - Gas dan hsd</title>
      </Head>
      <Gas />
    </>
  );
};

GasDanHSDPage.acl = {
  action: 'read',
  subject: 'gas-dan-hsd-page'
}

export default GasDanHSDPage;
