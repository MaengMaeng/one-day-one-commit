import passport from "passport";
import GithubStrategy from "passport-github";
import { githubLoginCallback } from "./controllers/globalController";

passport.use(
  new GithubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/callback",
    },
    githubLoginCallback,
  ),
);

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));
