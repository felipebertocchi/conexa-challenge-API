import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import businessRoutes from './routes/business.routes';
import mongo from './database/mongo';

const app = express();

app.use(express.json());
app.use('/api/business', businessRoutes);

const server = app.listen(process.env.BUSINESS_PORT, () => {
    mongo.connect();
    return console.log(`[business] service running on ${process.env.BUSINESS_DOMAIN}`);
});

export { app, server }