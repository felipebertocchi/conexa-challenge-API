import mongoose from 'mongoose';

const dbURI = <string>process.env.MONGODB_URI;

mongoose.connect(dbURI)
    .then(() => {
        console.log("[mongodb] database connected");
    })
    .catch((error) => {
        console.error('[mongodb] connection error:', error);
    });
