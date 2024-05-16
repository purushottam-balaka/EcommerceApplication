import * as CryptoJS from 'crypto-js'
import jwt from 'jsonwebtoken'
import {Request, Response, NextFunction} from 'express'

const secKey='SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
export const  hashedPassword=async(password: string, secretKey: string)=>{
    const encryptedPassword = CryptoJS.AES.encrypt(password, secretKey).toString();
    return encryptedPassword;
}

export const decryptPassword= async(encryptedPassword:string, secretKey: string)=> {
    const decryptedBytes = CryptoJS.AES.decrypt(encryptedPassword, secretKey);
    let  decryptedPassword = decryptedBytes.toString(CryptoJS.enc.Utf8);
    return decryptedPassword
}

export const generateToken= async(user)=>{
    const token= jwt.sign(user, secKey)
    return token
}

export const verifyToken=async(token )=>{
    try{
        if (!token) {
          return {msg:'You are not an authenticated Customer'}
        }
        const decoded=jwt.verify(token,secKey,)
        if(!decoded)
            return {msg:'token validation failed'}
        
            console.log(decoded)
            return decoded    
        }catch(err){
        console.log(err)
    }
}

