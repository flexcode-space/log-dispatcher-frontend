import Head from "next/head";
import { GarduInduk } from "src/features/gardu-induk";

const GarduIndukPage = () => {
  return (
    <>
      <Head>
        <title>Master Data - Gardu Induk</title>
      </Head>
      <GarduInduk />
    </>
  );
};

export default GarduIndukPage;
