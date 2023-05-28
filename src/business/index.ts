import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import businessRoutes from './business.routes';
import '../database/connect';

const app = express();
const port = 4000;

app.use(express.json());
app.use('/api/business', businessRoutes);

app.listen(port, () => {
    return console.log(`[business] service running on http://localhost:${port}`);
});