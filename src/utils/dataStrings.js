import { names, origins, destinations } from './data';
import bcrypt from 'bcryptjs';
import { encrypt } from './crypto';

const saltRounds = 10;

const generateRandomObjWithKeys = () => {
    const randomObj = {
        name: names[Math.floor(Math.random() * 10)],
        origin: origins[Math.floor(Math.random() * 10)],
        destination: destinations[Math.floor(Math.random() * 10)]
    }
    console.log(randomObj)
    const secret_key = bcrypt.hashSync(JSON.stringify(randomObj), saltRounds);
    randomObj.secret_key = secret_key;
    const encryption = encrypt(JSON.stringify(randomObj))
    return encryption;
}

const encryptedString = () => {
    let i = 0;
    let arr = [];
    while (i++ < 2) {
        arr.push(generateRandomObjWithKeys())
    }
    return arr.join("|");
};

export default encryptedString;