import mongoose, { Document } from 'mongoose';
import { IUser } from '../interfaces/user.interface';

const userSchema = new mongoose.Schema<IUser & Document>(
  {
    shop: String,
    password: String,
    installedAt: { type: Date, default: Date.now },
    passwordUpdatedAt: { type: Date, default: Date.now },
    uninstalledAt: Date,
  },
  { timestamps: true }
);

export default mongoose.model('User', userSchema);
