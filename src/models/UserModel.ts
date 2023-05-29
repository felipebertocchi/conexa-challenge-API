import mongoose, { Schema } from 'mongoose';
import { IUser } from '../interfaces';

const UserSchema = new Schema<IUser>({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
}, { timestamps: true });

const UserModel = mongoose.model<IUser>('User', UserSchema);

export default UserModel;