import jwt from 'jsonwebtoken';
import HttpStatus from '../common-constants/HttpStatus.constant.js';

import ErrorDTO from '../dto-class/ErrorDTO.js';

import dotenv from 'dotenv';
dotenv.config();

const JWT_SECRET = process.env.JWT_ENCRYPTION_KEY;
const JWT_ALGORITHM = process.env.JWT_ALGORITHM;
const JWT_EXPIRE_TIME = process.env.JWT_EXPIRE_TIME;

function GenerateJwtToken(payload) {
    return jwt.sign(payload, JWT_SECRET, {
        algorithm: JWT_ALGORITHM,
        expiresIn: JWT_EXPIRE_TIME
    });
}

function VerifyJwtToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        return res.status(HttpStatus.UNAUTHORIZED).json(new ErrorDTO("Access denied.<br>No token provided."));
    }

    jwt.verify(
        token,
        JWT_SECRET,
        {
            algorithms: [JWT_ALGORITHM],
            complete: false
        },
        (err, user) => {
            if (err) {
                return res.status(HttpStatus.UNAUTHORIZED).json(
                    new ErrorDTO("Access denied.<br>Invalid or expired token.")
                );
            }

            req.UserInformation = user;
            next();
        }
    );
}

function AssignTokenExistance(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        req.HasToken = false;
        next();
    } else {
        req.HasToken = true;

        jwt.verify(
            token,
            JWT_SECRET,
            {
                algorithms: [JWT_ALGORITHM],
                complete: false
            },
            (err, user) => {
                if (err) {
                    return res.status(HttpStatus.UNAUTHORIZED).json(
                        new ErrorDTO("Access denied.<br>Invalid or expired token.")
                    );
                }

                req.UserInformation = user;
                next();
            }
        );
    }
}

export default {
    GenerateJwtToken,
    VerifyJwtToken,
    AssignTokenExistance
}