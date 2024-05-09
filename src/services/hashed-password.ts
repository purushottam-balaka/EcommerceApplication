import * as CryptoJS from 'crypto-js'

export const  hashedPassword=async(password: string, secretKey: string)=>{
    const encryptedPassword = CryptoJS.AES.encrypt(password, secretKey).toString();
    return encryptedPassword;
}

export const decryptPassword= async(encryptedPassword:string, secretKey: string)=> {
    const decryptedBytes = CryptoJS.AES.decrypt(encryptedPassword, secretKey);
    let  decryptedPassword = decryptedBytes.toString(CryptoJS.enc.Utf8);
    return decryptedPassword
}

