import Head from "next/head";
import { SwitchingPembangkit } from "src/features/switching-pembangkit";

const SwitchingPembangkitPage = () => {
  return (
    <>
      <Head>
        <title>Switching Pembangkit</title>
      </Head>
      <SwitchingPembangkit />
    </>
  );
};

SwitchingPembangkitPage.acl = {
  action: "read",
  subject: "switching-pembangkit-page",
};

export default SwitchingPembangkitPage;
