import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'No se ha proporcionado un token de autenticación' });
    }

    try {
        jwt.verify(token, <string>process.env.JWT_KEY);
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Token de autenticación inválido' });
    }
};

export default verifyToken;
