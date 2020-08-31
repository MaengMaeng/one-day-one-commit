import * as mongoose from "mongoose";

export interface IUser extends mongoose.Document {
  githubId: number;
  username: string;
  avatarUrl: string;
  email: string;
  createdAt?: Date;
  rank?: number;
  commitDays: number;
  dailyRanks?: object[];
  
}

const UserSchema = new mongoose.Schema({
  githubId: { type: Number, required: true },
  username: { type: String, required: true },
  avatarUrl: { type: String, required: true },
  email: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  rank: { type: Number, default: 0 },
  commitDays: { type: Number, default: 0 },
  dailyRanks: { type: Array, default: []}
});

const model = mongoose.model<IUser>("User", UserSchema);

export default model;