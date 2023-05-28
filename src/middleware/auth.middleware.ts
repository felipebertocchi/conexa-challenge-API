import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface IUserRequest extends Request {
    user: string | jwt.JwtPayload;
}

const verifyToken = (req: IUserRequest, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'No se ha proporcionado un token de autenticación' });
    }

    try {
        const verified = jwt.verify(token, <string>process.env.JWT_KEY);
        req.user = verified;
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Token de autenticación inválido' });
    }
};

export default verifyToken;
