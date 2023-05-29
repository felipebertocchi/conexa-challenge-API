import { Request, Response, NextFunction } from 'express';

const verifyReferer = (req: Request, res: Response, next: NextFunction) => {
    const referer = req.get('referer');
    const whitelist = [
        `${process.env.USERS_DOMAIN}/api/users/list`
    ]
    if (referer && whitelist.includes(referer.split('?')[0])) {
        next();
    } else {
        return res.status(403).json({ error: 'Acceso no autorizado' });
    }
};

export default verifyReferer;