import passport from "passport";
import GithubStrategy from "passport-github";
import { githubLoginCallback } from "./controllers/globalController";
import User, { IUser } from "./models/User";
passport.use(
  process.env.NODE_ENV === "production"
    ? new GithubStrategy(
        {
          clientID: process.env.GITHUB_CLIENT_ID,
          clientSecret: process.env.GITHUB_CLIENT_SECRET,
          callbackURL: "https://odoc.herokuapp.com/auth/callback",
        },
        githubLoginCallback,
      )
    : new GithubStrategy(
        {
          clientID: process.env.GITHUB_CLIENT_ID_DEV,
          clientSecret: process.env.GITHUB_CLIENT_SECRET_DEV,
          callbackURL: `http://localhost:${process.env.PORT}/auth/callback`,
        },
        githubLoginCallback,
      ),
);

passport.serializeUser((user: IUser, done) => done(null, user.githubId));
passport.deserializeUser(async (githubId, done) => {
  try {
    const user = await User.findOne({ githubId: githubId as number });

    if (user) {
      return done(null, {
        username: user.username,
        avatarUrl: user.avatarUrl,
        email: user.email,
      });
    }
    throw Error("Can't find");
  } catch (error) {
    return done(error);
  }
});
