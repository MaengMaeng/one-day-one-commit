import passport from "passport";
import github from "passport-github";
import oauth2 from "passport-oauth2";

export const login = passport.authenticate("github");

export const postLogin = (req: any, res: any) => {
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

  return cb(null, { username, id, avatarUrl, email });
};
