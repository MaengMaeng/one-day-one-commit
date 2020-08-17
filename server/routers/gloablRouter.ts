import { postLogin } from "./../controllers/globalController";
import { login } from "../controllers/globalController";
import express from "express";
import passport from "passport";

const globalRouter = express.Router();

globalRouter.get("/auth", login);
globalRouter.get(
  "/auth/callback",
  passport.authenticate("github", { failureRedirect: "/" }),
  postLogin,
);

export default globalRouter;
