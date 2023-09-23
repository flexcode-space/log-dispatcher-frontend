import Head from "next/head";
import { KapasitorReaktor } from "src/features/kapasitor-reaktor";

const KapasitorReaktorPage = () => {
  return (
    <>
      <Head>
        <title>Kapasitor Reaktor</title>
      </Head>
      <KapasitorReaktor />
    </>
  );
};

KapasitorReaktorPage.acl = {
  action: "read",
  subject: "kapasitor-reaktor-page",
};

export default KapasitorReaktorPage;
