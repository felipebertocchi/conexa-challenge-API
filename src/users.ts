import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import usersRoutes from './routes/users.routes';
import './database/connect';

const app = express();

app.use(express.json());
app.use('/api/users', usersRoutes);

app.listen(process.env.USERS_PORT, () => {
    return console.log(`[users] service running on ${process.env.USERS_DOMAIN}`);
});