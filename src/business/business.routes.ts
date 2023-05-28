import express from 'express';
import BusinessController from './business.controller';
import verifyToken from '../middleware/auth.middleware';

const router = express.Router();

router.get('/users', verifyToken, BusinessController.listUsers);

export default router;