import mongoose from 'mongoose';

const dbURI = <string>process.env.MONGODB_URI;

function connect() {
    mongoose.connect(dbURI)
        .then(() => {
            console.log('[mongodb] database connected');
        })
        .catch((error) => {
            console.error('[mongodb] connection error:', error);
        });
}

function disconnect() {
    mongoose.disconnect();
}

export default { connect, disconnect }