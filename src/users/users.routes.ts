import express from 'express';
import UsersController from './users.controller';
import verifyToken from '../middleware/auth.middleware';

const router = express.Router();

router.post('/register', UsersController.registerUser);
router.post('/login', UsersController.loginUser);
router.get('/list', verifyToken, UsersController.listUsers);

export default router;