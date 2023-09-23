import Head from "next/head";
import { PetaJaringan } from "src/features/peta-jaringan";

const PetaJaringanPage = () => {
  return (
    <>
      <Head>
        <title>Peta Jaringan</title>
      </Head>
      <PetaJaringan />
    </>
  );
};

export default PetaJaringanPage;
