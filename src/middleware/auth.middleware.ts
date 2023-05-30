import { Request, Response, NextFunction } from 'express';
import jwtService from '../services/jwt.service';

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'No se ha proporcionado un token de autenticación' });
    }

    try {
        jwtService.verifyToken(token);
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Token de autenticación inválido' });
    }
};

export default verifyToken;
