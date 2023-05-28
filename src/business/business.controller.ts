import { Request, Response } from 'express';
import UserModel from '../models/UserModel';

const BusinessController = {
    listUsers: async (req: Request, res: Response) => {
        const page = parseInt(req.query.page as string) as number
        const limit = parseInt(req.query.limit as string) as number

        try {
            const dbUsers = await UserModel
                .find({})
                .skip((page - 1) * limit)
                .limit(limit);

            return res.json({ usuarios: dbUsers });
        } catch (error) {
            res.status(500).json({ error: 'Hubo un error al intentar listar los usuarios' });
        }
    }
};

export default BusinessController;
