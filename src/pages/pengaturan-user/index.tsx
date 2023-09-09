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

PengaturanUserPage.acl = {
  action: 'read',
  subject: 'pengaturan-user-page'
}

export default PengaturanUserPage;
