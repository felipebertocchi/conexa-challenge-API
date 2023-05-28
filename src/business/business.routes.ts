import express from 'express';
import BusinessController from './business.controller';

const router = express.Router();

router.get('/users', BusinessController.listUsers);

export default router;