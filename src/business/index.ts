import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import '../database/connect';

const app = express();
const port = 4000;

app.listen(port, () => {
    return console.log(`[business] service running on http://localhost:${port}`);
});