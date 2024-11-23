import Head from "next/head";
import axios from "axios";
import { useRouter } from "next/router";
import { encrypt } from "../helper/encrypt-decrypt";

export default function Home() {
  const router = useRouter();
  const makePayment = async () => {
    let timestamp = Date.now();
    let data = {
      txnType: "DD",
      txnRefNo: "205519021345",
      order_no: "5516",
      amount: 100,
      description: "payment for order no. 5516",
      timeStamp: timestamp,
      product_id: "CORP",
    };
    axios
      .post("/api/payment-request", encrypt(JSON.stringify(data)))
      .then((response) => {
        router.push({
          pathname: `${response.data.redirection_Url}`,
          query: {
            data: `${encrypt(JSON.stringify(response.data.queryString))}`,
            source: `${encrypt("WEB")}`,
          },
        });
      });
  };
  return (
    <>
      <Head>
        <title>payment - CBD</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <button
          onClick={() => makePayment()}
          style={{ width: "200px", height: "35px", cursor: "pointer" }}
        >
          Make Payment
        </button>
      </div>
    </>
  );
}
