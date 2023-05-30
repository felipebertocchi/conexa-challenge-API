import dotenv from 'dotenv';
dotenv.config({ path: './env.test.local' });
import request from 'supertest';
import { app, server as usersServer } from '../src/users';
import { server as businessServer } from '../src/business';
import UserModel from '../src/models/UserModel';
import mongo from '../src/database/mongo';
import jwtService from '../src/services/jwt.service';

beforeAll(async () => {
    await request(app)
        .post('/api/users/register')
        .send({ email: 'testing@conexa.com', password: 'password123' });
});

describe('POST /api/users/register', () => {
    it('should register a new user', async () => {
        const response = await request(app)
            .post('/api/users/register')
            .send({ email: 'register@conexa.com', password: 'password123' });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('message', 'Usuario registrado exitosamente');
    });

    it('should not register an existing user', async () => {
        const response = await request(app)
            .post('/api/users/register')
            .send({ email: 'testing@conexa.com', password: 'password123' });

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('error', 'El usuario ya se encuentra registrado');
    });
});

describe('POST /api/users/login', () => {
    it('should log in an existing user and return a token', async () => {
        const response = await request(app)
            .post('/api/users/login')
            .send({ email: 'testing@conexa.com', password: 'password123' });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('token');
    });

    it('should not log in if email is not registered', async () => {
        const response = await request(app)
            .post('/api/users/login')
            .send({ email: 'random@random.com', password: 'password123' });

        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('error', 'Usuario no encontrado');
    });

    it('should not log in existing user if password does not match', async () => {
        const response = await request(app)
            .post('/api/users/login')
            .send({ email: 'testing@conexa.com', password: '321drowssap' });

        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty('error', 'Contraseña incorrecta');
    });
});

describe('POST /api/users/list', () => {
    businessServer; // inicializar módulo de negocios
    const token = jwtService.getToken('testing@conexa.com');
    const invalidToken = 'invalid-token';

    it('should return a list of authenticated users with a valid token', async () => {
        const response = await request(app)
            .get('/api/users/list')
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('usuarios');
        expect(response.body.usuarios.length).toBeGreaterThan(0);
    });

    it('should return an error if token is invalid or expired', async () => {
        const response = await request(app)
            .get('/api/users/list')
            .set('Authorization', `Bearer ${invalidToken}`);

        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty('error', 'Token de autenticación inválido');
    });

    it('should return an error if no token was submitted', async () => {
        const response = await request(app)
            .get('/api/users/list')

        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty('error', 'No se ha proporcionado un token de autenticación');
    });
});


afterAll(async () => {
    await UserModel.findOneAndDelete({ email: "register@conexa.com" });
    usersServer.close();
    businessServer.close();
    mongo.disconnect();
});
