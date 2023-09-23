import Head from "next/head";
import { PiketAndShift } from "src/features/piket-and-shift";

const PiketShift = () => {
  return (
    <>
      <Head>
        <title>Piket & Shift</title>
      </Head>
      <PiketAndShift />
    </>
  );
};

PiketShift.acl = {
  action: "read",
  subject: "piket-dan-shift-page",
};

export default PiketShift;
