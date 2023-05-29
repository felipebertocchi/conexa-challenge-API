import express from 'express';
import BusinessController from './business.controller';
import verifyToken from '../middleware/auth.middleware';
import verifyReferer from '../middleware/referer.middleware';

const router = express.Router();

router.get('/users', verifyToken, verifyReferer, BusinessController.listUsers);

export default router;