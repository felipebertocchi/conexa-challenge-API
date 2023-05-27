import express from 'express';
import usersRoutes from './users.routes';
import '../database/connect';

const app = express();
const port = 3000;

app.use(express.json());
app.use('/users', usersRoutes);

app.listen(port, () => {
    return console.log(`[users] service running on http://localhost:${port}`);
});