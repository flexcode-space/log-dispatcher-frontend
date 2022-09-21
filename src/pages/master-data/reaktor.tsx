import Head from "next/head";
import { Reaktor } from "src/features/reaktor";

const ReaktorPage = () => {
  return (
    <>
      <Head>
        <title>Master Data - Reaktor</title>
      </Head>
      <Reaktor />
    </>
  );
};

export default ReaktorPage;
