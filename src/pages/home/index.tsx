import Head from "next/head";
import { Home } from "src/features/home";

const HomePage = () => {
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <Home />
    </>
  );
};

export default HomePage;
