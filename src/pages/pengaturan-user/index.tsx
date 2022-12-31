import Head from "next/head";
// import { DefenseSchema } from "src/features/defense-schema";
import { PengaturanUser } from "src/features/pengaturan-user";

const PengaturanUserPage = () => {
  return (
    <>
      <Head>
        <title>Pengaturan User</title>
      </Head>
      <PengaturanUser />
    </>
  );
};

export default PengaturanUserPage;
