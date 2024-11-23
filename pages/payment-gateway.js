import { decrypt } from "../helper/encrypt-decrypt";
import Head from "next/head";
import { useEffect } from "react";

function paymentGateway(props) {
  const inputValue = decrypt(props?.data) || null;
  const source = decrypt(props?.source);
  useEffect(() => {
    setTimeout(() => {
      if (source == "WEB" || source == "APP") {
        document.getElementById("redirectForm").submit();
      }
    }, 1000);
  });
  return (
    <>
      <Head>
        <title>Redirecting...</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      {source == "WEB" || source == "APP" ? (
        <form
          id="redirectForm"
          action={process.env.NEXT_PUBLIC_PG_HOST}
          method="POST"
        >
          <input type="hidden" name="data" value={inputValue} />
        </form>
      ) : (
        <span>valid data not found</span>
      )}
    </>
  );
}
export default paymentGateway;

export async function getServerSideProps({ query }) {
  return {
    props: {
      ...query,
    },
  };
}
