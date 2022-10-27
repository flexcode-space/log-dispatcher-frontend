import Head from "next/head";
import { TeganganBusbar } from "src/features/tegangan-busbar";

const TeganganBusbarPage = () => {
  return (
    <>
      <Head>
        <title>Penghantar Busbar</title>
      </Head>
      <TeganganBusbar />
    </>
  );
};

export default TeganganBusbarPage;
