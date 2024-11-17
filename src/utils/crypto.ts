import CryptoJS from "crypto-js";

const SECRET_KEY: any = process.env.REACT_APP_CRYPT_SECRET_KEY;

// Encrypt data
export const encryptData = (data: any) => {
    return CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
};

// Decrypt data
export const decryptData = (cipherText: any) => {
    const bytes = CryptoJS.AES.decrypt(cipherText, SECRET_KEY);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
};
