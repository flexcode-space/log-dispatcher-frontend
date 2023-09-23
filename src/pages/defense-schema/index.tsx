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

DefenseSchemaPage.acl = {
  action: 'read',
  subject: 'defense-schema-page'
}

export default DefenseSchemaPage;
