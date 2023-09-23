import Head from "next/head";
import { PencatatanDefenseSchema } from "src/features/pencatatan-defense-schema";

const PencatanDefenseSchemaPage = () => {
  return (
    <>
      <Head>
        <title>Pencatatan Defense Scheme</title>
      </Head>
      <PencatatanDefenseSchema />
    </>
  );
};

export default PencatanDefenseSchemaPage;
