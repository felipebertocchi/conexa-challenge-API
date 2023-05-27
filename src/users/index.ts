import express from 'express';
import '../database/connect';

const app = express();
const port = 3000;

app.listen(port, () => {
    return console.log(`[users] service running on http://localhost:${port}`);
});