import Head from "next/head";
import { AnalisaBeban } from "src/features/analisa-beban";

const AnalisaBebanPage = () => {
  return (
    <>
      <Head>
        <title>Analisa Beban</title>
      </Head>
      <AnalisaBeban />
    </>
  );
};

export default AnalisaBebanPage;
