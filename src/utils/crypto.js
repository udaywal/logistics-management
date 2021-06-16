import crypto from 'crypto-js';

const secretKey = 'secretpasswordthatnobodycanguess';

export const encrypt = val => {
    let ciphertext = crypto.AES.encrypt(JSON.stringify(val), secretKey).toString();
    return ciphertext;
};