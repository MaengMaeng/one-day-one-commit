/** @format */

import mongoose from "mongoose";
import * as dotenv from "dotenv";

dotenv.config();

const url =
  process.env.NODE_ENV !== "development"
    ? process.env.MONGO_URL
    : process.env.MONGO_URL_DEV;

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

const handleError = (error: any) =>
  console.log(`❌ Error on DB Connection: ${error}`);

const handleOpen = () => console.log("✅ Connected on DB");

db.once("open", handleOpen);
db.on("error", handleError);
