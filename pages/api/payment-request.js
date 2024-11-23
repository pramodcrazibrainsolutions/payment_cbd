// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { encrypt } from "../../helper/encrypt-decrypt";
import { generateHash } from "../../helper/generateHash";

export default async function (req, res) {
  let reqData = JSON.parse;
  let hash = generateHash(
    process.env.NEXT_PUBLIC_PP_VERSION,
    reqData.txnType,
    process.env.NEXT_PUBLIC_MERCHANT_ID,
    process.env.NEXT_PUBLIC_PP_LANGUAGE,
    process.env.NEXT_PUBLIC_MERCHANT_PASSWORD,
    "004",
    reqData.product_id || "RETL",
    reqData.txnRefNo,
    reqData.amount,
    process.env.NEXT_PUBLIC_CURRENCY,
    reqData.timeStamp,
    reqData.order_no,
    reqData.description,
    process.env.NEXT_PUBLIC_RETURN_URL
  );
  let paymentReq = {
    pp_Version: process.env.NEXT_PUBLIC_PP_VERSION,
    pp_TxnType: reqData.txnType,
    pp_MerchantID: process.env.NEXT_PUBLIC_MERCHANT_ID,
    pp_Language: process.env.NEXT_PUBLIC_PP_LANGUAGE,
    pp_Password: process.env.NEXT_PUBLIC_MERCHANT_PASSWORD,
    pp_BankID: "004",
    pp_ProductID: reqData.product_id || "RETL",
    pp_TxnRefNo: reqData.txnRefNo,
    pp_Amount: reqData.amount,
    pp_TxnCurrency: process.env.NEXT_PUBLIC_CURRENCY,
    pp_TxnDateTime: reqData.timeStamp,
    pp_BillReference: reqData.order_no,
    pp_Description: reqData.description,
    pp_ReturnURL: process.env.NEXT_PUBLIC_RETURN_URL,
    pp_SecureHash: hash,
  };
  let redirection_Url = `/payment-gateway`;
  res.status(200).json({
    redirection_Url: redirection_Url,
    queryStringParams: paymentReq,
  });
}
