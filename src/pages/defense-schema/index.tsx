import Head from "next/head";
import { DefenseSchema } from "src/features/defense-schema";

const DefenseSchemaPage = () => {
  return (
    <>
      <Head>
        <title>Defense Scheme</title>
      </Head>
      <DefenseSchema />
    </>
  );
};

export default DefenseSchemaPage;
