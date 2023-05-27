import { Request, Response } from 'express';
import UserModel from '../models/UserModel';
import bcrypt from 'bcrypt';

const UsersController = {
    registerUser: async (req: Request, res: Response) => {
        const { email, password } = req.body;

        try {
            const userExists = await UserModel.findOne({ email });
            if (userExists) {
                return res.status(400).json({ error: 'El usuario ya se encuentra registrado' });
            }

            const newUser = new UserModel({
                email,
                password: bcrypt.hashSync(password, 10)
            });

            await newUser.save();

            return res.status(200).json({ message: 'Usuario registrado exitosamente' });
        } catch (error) {
            return res.status(500).json({ error: 'Hubo un error al intentar registrar el usuario' });
        }
    },
};

export default UsersController;
