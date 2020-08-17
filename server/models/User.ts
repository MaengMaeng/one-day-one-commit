import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  githubId: Number,
  username: String,
  avatarUrl: String,
  email: String,
  registerday: Date,
  commitDay: Date,
});

const model = mongoose.model("User", UserSchema);

export default model;
