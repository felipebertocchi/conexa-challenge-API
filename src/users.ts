import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import usersRoutes from './routes/users.routes';
import mongo from './database/mongo';

const app = express();

app.use(express.json());
app.use('/api/users', usersRoutes);

const server = app.listen(process.env.USERS_PORT, () => {
    mongo.connect();
    return console.log(`[users] service running on port ${process.env.USERS_PORT}`);
});

export { app, server }