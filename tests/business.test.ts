import request from 'supertest';
import { app, server } from '../src/business';
import '../src/database/mongo';
import mongo from '../src/database/mongo';
import jwtService from '../src/services/jwt.service';

describe('POST /api/business/users', () => {
    const token = jwtService.getToken('testing@conexa.com');
    const invalidToken = 'invalid-token';
    it('should deny access, even with a valid token', async () => {
        const response = await request(app)
            .get('/api/business/users')
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(403);
        expect(response.body).toHaveProperty('error', 'Acceso no autorizado');
    });

    it('should return an error if token is invalid or expired', async () => {
        const response = await request(app)
            .get('/api/business/users')
            .set('Authorization', `Bearer ${invalidToken}`);

        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty('error', 'Token de autenticación inválido');
    });

    it('should return an error if no token was submitted', async () => {
        const response = await request(app)
            .get('/api/business/users')

        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty('error', 'No se ha proporcionado un token de autenticación');
    });

    afterAll(() => {
        server.close();
        mongo.disconnect();
    })
});