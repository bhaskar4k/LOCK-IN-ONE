import jwt from 'jsonwebtoken';
import HttpStatus from '../common-constants/HttpStatus.constant.js';
import EncryptionKey from '../utility/EncryptionKey.js';
const { GetJwtTokenEncryptionKey } = EncryptionKey;

import ErrorDTO from '../dto-class/ErrorDTO.js';

import dotenv from 'dotenv';
dotenv.config();

const JWT_SECRET = process.env.ENCRYPTION_KEY;

function GenerateJwtToken(payload, key) {
    return jwt.sign(payload, key, {
        algorithm: 'HS512',
        expiresIn: '1h'
    });
}

function VerifyJwtToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
       return res.status(HttpStatus.UNAUTHORIZED).json(new ErrorDTO("Access denied.<br>No token provided."));
    }

    jwt.verify(token, GetJwtTokenEncryptionKey(JWT_SECRET), (err, user) => {
        if (err) {
            return res.status(HttpStatus.UNAUTHORIZED).json(new ErrorDTO("Access denied.<br>Invalid or expired token."));
        }

        req.UserInformation = user;
        next();
    });
}

export default {
    GenerateJwtToken,
    VerifyJwtToken
}