import Head from "next/head";
import { KonfigurasiPengaturanTegangan } from "src/features/konfigurasi-pengaturan-tegangan";

const KonfigurasiPengaturanTeganganPage = () => {
  return (
    <>
      <Head>
        <title>Konfigurasi Pengaturan Tegangan</title>
      </Head>
      <KonfigurasiPengaturanTegangan />
    </>
  );
};

export default KonfigurasiPengaturanTeganganPage;
