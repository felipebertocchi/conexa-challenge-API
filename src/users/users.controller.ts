import { Request, Response } from 'express';
import UserModel from '../models/UserModel';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'

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
    loginUser: async (req: Request, res: Response) => {
        const { email, password } = req.body;

        try {
            const dbUser = await UserModel.findOne({ email });
            if (!dbUser) {
                return res.status(404).json({ error: 'Usuario no encontrado' });
            }

            if (!bcrypt.compareSync(password, dbUser.password)) {
                return res.status(401).json({ error: 'Contraseña incorrecta' });
            }

            const token = jwt.sign({ email }, <string>process.env.JWT_KEY, { expiresIn: '1h' });

            return res.json({ token });
        } catch (error) {
            return res.status(500).json({ error: 'Hubo un error al intentar iniciar sesión' });
        }
    },
};

export default UsersController;
