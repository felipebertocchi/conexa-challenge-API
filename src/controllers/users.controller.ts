import { Request, Response } from 'express';
import UserModel from '../models/UserModel';
import jwtService from '../services/jwt.service';
import bcrypt from 'bcrypt';
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
            console.error(error)
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

            const token = jwtService.getToken(email);

            return res.status(200).json({ token });
        } catch (error) {
            console.error(error)
            return res.status(500).json({ error: 'Hubo un error al intentar iniciar sesión' });
        }
    },
    listUsers: async (req: Request, res: Response) => {
        const { page, limit, search } = req.query;

        try {
            const response = await axios.get(<string>process.env.BUSINESS_DOMAIN + '/api/business/users', {
                headers: {
                    Authorization: req.headers.authorization,
                    Referer: req.headers.referer || `${process.env.USERS_DOMAIN}${req.originalUrl}`
                },
                params: {
                    page,
                    limit,
                    search
                }
            });

            return res.status(200).json(response.data);
        } catch (error) {
            console.error(error)
            return res.status(500).json({ error: 'Hubo un error al intentar listar los usuarios' });
        }
    }
};

export default UsersController;
