import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import businessRoutes from './business.routes';
import '../database/connect';

const app = express();

app.use(express.json());
app.use('/api/business', businessRoutes);

app.listen(process.env.BUSINESS_PORT, () => {
    return console.log(`[business] service running on ${process.env.BUSINESS_DOMAIN}`);
});