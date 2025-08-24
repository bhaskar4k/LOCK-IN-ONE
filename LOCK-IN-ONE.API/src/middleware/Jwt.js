import jwt from 'jsonwebtoken';

function GenerateJwtToken(payload, key) {
    return jwt.sign(payload, key, {
        algorithm: 'HS512',
        expiresIn: '1h'
    });
}

function VerifyJwtToken(token, key) {
    return jwt.verify(token, key, {
        algorithms: ['HS512']
    });
}

export default {
    GenerateJwtToken,
    VerifyJwtToken
}