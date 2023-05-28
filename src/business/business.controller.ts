import { Request, Response } from 'express';
import UserModel from '../models/UserModel';

interface ListUsersQueryParams {
    page?: number;
    limit?: number;
    search?: string;
}

const BusinessController = {
    listUsers: async (req: Request, res: Response) => {
        const { page = 1, limit = 10, search = '' }: ListUsersQueryParams = req.query;
        const searchRegex = new RegExp(search, 'i');

        try {
            const dbUsers = await UserModel
                .find({ email: searchRegex })
                .skip((page - 1) * limit)
                .limit(limit);

            return res.json({ usuarios: dbUsers });
        } catch (error) {
            return res.status(500).json({ error: 'Hubo un error al intentar listar los usuarios' });
        }
    }
};

export default BusinessController;
