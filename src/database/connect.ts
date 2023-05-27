import mongoose from 'mongoose';

const dbURI = 'mongodb://localhost:27017/conexa-challenge-api';

mongoose.connect(dbURI)
    .then(() => {
        console.log("[mongodb] database connected");
    })
    .catch((error) => {
        console.error('[mongodb] connection error:', error);
    });
