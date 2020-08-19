import * as mongoose from "mongoose";

export interface IUser extends mongoose.Document {
  githubId: number;
  username: string;
  avatarUrl: string;
  email: string;
}

const UserSchema = new mongoose.Schema({
  githubId: { type: Number, required: true },
  username: { type: String, required: true },
  avatarUrl: { type: String, required: true },
  email: { type: String, required: true },
});

const model = mongoose.model<IUser>("User", UserSchema);

export default model;
