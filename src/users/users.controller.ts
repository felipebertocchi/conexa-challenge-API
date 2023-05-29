import { Request, Response } from 'express';
import UserModel from '../models/UserModel';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import axios from 'axios';

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
    listUsers: async (req: Request, res: Response) => {
        const { page, limit, search } = req.query;

        try {
            const response = await axios.get(<string>process.env.BUSINESS_DOMAIN + '/api/business/users', {
                headers: {
                    Authorization: req.headers.authorization,
                    Referer: req.headers.referer || `${process.env.USERS_DOMAIN}/api/users/list`
                },
                params: {
                    page,
                    limit,
                    search
                }
            });

            return res.status(200).json(response.data);
        } catch (error) {
            return res.status(500).json({ error: 'Hubo un error al intentar listar los usuarios' });
        }
    }
};

export default UsersController;
