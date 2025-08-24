import crypto from 'crypto';


function encrypt(text, encryptionKey) {
    const ALGORITHM = 'aes-256-gcm'; // AES with authentication
    const SECRET_KEY = Buffer.from(encryptionKey, 'hex'); // 32 bytes hex
    const IV_LENGTH = 16; // Initialization vector

    const iv = crypto.randomBytes(IV_LENGTH);
    const cipher = crypto.createCipheriv(ALGORITHM, SECRET_KEY, iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    const authTag = cipher.getAuthTag().toString('hex');
    return `${iv.toString('hex')}:${authTag}:${encrypted}`;
}

function decrypt(encryptedData, encryptionKey) {
    const ALGORITHM = 'aes-256-gcm'; // AES with authentication
    const SECRET_KEY = Buffer.from(encryptionKey, 'hex'); // 32 bytes hex

    const [ivHex, authTagHex, encrypted] = encryptedData.split(':');
    const iv = Buffer.from(ivHex, 'hex');
    const authTag = Buffer.from(authTagHex, 'hex');
    const decipher = crypto.createDecipheriv(ALGORITHM, SECRET_KEY, iv);
    decipher.setAuthTag(authTag);
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}

export default {
    encrypt,
    decrypt
}