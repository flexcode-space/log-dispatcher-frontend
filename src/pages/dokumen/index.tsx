import Head from "next/head";
import { Document } from "src/features/document";

const DocumentPage = () => {
  return (
    <>
      <Head>
        <title>Informasi Dokumen Terkendali</title>
      </Head>
      <Document />
    </>
  );
};

DocumentPage.acl = {
  action: "read",
  subject: "document-page",
};

export default DocumentPage;
