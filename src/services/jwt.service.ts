import jwt, { Secret } from 'jsonwebtoken';

function getToken(email: string) {
    return jwt.sign({ email }, <Secret>process.env.JWT_KEY, { expiresIn: '1h' });
}

function verifyToken(token: string) {
    return jwt.verify(token, <Secret>process.env.JWT_KEY);
}

export default { getToken, verifyToken }