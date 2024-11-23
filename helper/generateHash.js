const CryptoJS = require("crypto-js");
export function generateHash(
  pp_Version,
  pp_TxnType,
  pp_MerchantID,
  pp_Language,
  pp_Password,
  pp_BankID,
  pp_ProductID,
  pp_TxnRefNo,
  pp_Amount,
  pp_TxnCurrency,
  pp_TxnDateTime,
  pp_BillReference,
  pp_Description,
  pp_ReturnURL
) {
  const data = `${process.env.NEXT_PUBLIC_HASH_KEY}&${pp_Amount}&${pp_BankID}&${pp_BillReference}&${pp_Description}&${pp_Language}&${pp_MerchantID}&${pp_Password}&${pp_ProductID}&${pp_ReturnURL}&${pp_TxnCurrency}&${pp_TxnDateTime}&${pp_TxnRefNo}&${pp_TxnType}&${pp_Version}`;
  let secretKey = process.env.NEXT_PUBLIC_HASH_KEY;
  const hash = CryptoJS.HmacSHA256(data, secretKey);
  return hash.toString();
}
