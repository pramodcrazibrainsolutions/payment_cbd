var CryptoJS = require("crypto-js");
var secretKey = process.env.NEXT_PUBLIC_SECRET_KEY;

export function encrypt(obj) {
  try {
    return CryptoJS.AES.encrypt(obj, secretKey).toString();
  } catch (error) {
    console.error("Error encrypting data:", error);
    return null;
  }
}
export function decrypt(encryptObj) {
  try {
    var bytes = CryptoJS.AES.decrypt(encryptObj, secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
  } catch (error) {
    console.error("Error decrypting data:", error);
    return null;
  }
}
