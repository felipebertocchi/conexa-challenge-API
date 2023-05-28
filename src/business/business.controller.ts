import { Request, Response } from 'express';
import UserModel from '../models/UserModel';

const BusinessController = {
    listUsers: async (req: Request, res: Response) => {
        try {
            const dbUsers = await UserModel.find({});

            return res.json({ usuarios: dbUsers });
        } catch (error) {
            res.status(500).json({ error: 'Hubo un error al intentar listar los usuarios' });
        }
    }
};

export default BusinessController;
