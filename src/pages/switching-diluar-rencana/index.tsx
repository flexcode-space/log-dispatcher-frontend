import Head from "next/head";
import { SwitchingDiluarRencana } from "src/features/switching-diluar-rencana";

const SwitchingDiluarRencanaPage = () => {
  return (
    <>
      <Head>
        <title>Switching Diluar Rencana</title>
      </Head>
      <SwitchingDiluarRencana />
    </>
  );
};

SwitchingDiluarRencanaPage.acl = {
  action: "read",
  subject: "switching-diluar-rencana-page",
};

export default SwitchingDiluarRencanaPage;
