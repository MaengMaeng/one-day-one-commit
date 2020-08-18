import express from "express";
import passport from "passport";
import { login, postLogin, logout } from "./../controllers/globalController";

const globalRouter = express.Router();

globalRouter.get("/auth", login);
globalRouter.get(
  "/auth/callback",
  passport.authenticate("github", { failureRedirect: "/" }),
  postLogin,
);
globalRouter.get("/logout", logout);

export default globalRouter;
