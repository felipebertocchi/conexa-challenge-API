import express from 'express';
import UsersController from './users.controller';

const router = express.Router();

router.post('/register', UsersController.registerUser);
router.post('/login', UsersController.loginUser);
router.get('/list', UsersController.listUsers);

export default router;