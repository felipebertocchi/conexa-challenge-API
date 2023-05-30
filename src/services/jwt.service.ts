import jwt, { Secret } from 'jsonwebtoken';

function getToken(email: string) {
    console.log(email, <Secret>process.env.JWT_KEY)
    return jwt.sign({ email }, <Secret>process.env.JWT_KEY, { expiresIn: '1h' });
}

function verifyToken(token: string) {
    console.log(token, <Secret>process.env.JWT_KEY)
    return jwt.verify(token, <Secret>process.env.JWT_KEY);
}

export default { getToken, verifyToken }