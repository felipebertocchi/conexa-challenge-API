import express from 'express';
import UsersController from './users.controller';

const router = express.Router();

router.post('/register', UsersController.registerUser);

export default router;