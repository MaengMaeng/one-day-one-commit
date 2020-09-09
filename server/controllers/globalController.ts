import passport from "passport";
import github from "passport-github";
import oauth2 from "passport-oauth2";
import User, { IUser } from "../models/User";

export const login = passport.authenticate("github");

export const logout = (req: any, res: any) => {
  req.logout();
  res.redirect("/");
};

export const postLogin = (req: any, res: any) => {
  // TODO: don't use redirect;
  res.redirect("/");
};

export const githubLoginCallback = async (
  accessToken: string,
  refreshToken: string,
  profile: github.Profile,
  cb: oauth2.VerifyCallback,
) => {
  const {
    login: username,
    id,
    avatar_url: avatarUrl,
    email,
  } = profile._json as any;

  try {
    const user = await User.findOne({ githubId: id });

    if (user) {
      console.log("Already registered");
      user.username = username;
      user.avatarUrl = avatarUrl;
      user.githubId = id;
      user.save();
      return cb(null, user);
    }

    const newUser = await User.create({
      githubId: id,
      avatarUrl,
      username,
      email,
      commitDays: 0,
    });

    return cb(null, newUser);
  } catch (error) {
    return cb(error);
  }
};
