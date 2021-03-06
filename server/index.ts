import next from "next";
import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import session from "express-session";

import dotenv from "dotenv";
import passport from "passport";
import routes from "./routes";
import globalRouter from "./routers/gloablRouter";
import apiRouter from "./routers/apiRouter";
import "./db";
import "./passport";

dotenv.config();

const dev = process.env.NODE_ENV !== "production";
const port = process.env.PORT;

const app = next({ dev });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = express();

    const sessionConfig = {
      secret: process.env.COOKIE_SECRET,
      cookie: {
        maxAge: 86400 * 1000, // 24 hours in milliseconds
      },
      resave: false,
      saveUninitialized: true,
    };

    server.use(cookieParser());
    server.use(bodyParser.json());
    server.use(bodyParser.urlencoded({ extended: true }));

    server.use(session(sessionConfig));

    server.use(passport.initialize());
    server.use(passport.session());

    server.use(globalRouter);
    server.use(routes.api, apiRouter);

    server.get("*", (req, res) => {
      return handle(req, res);
    });

    server.listen(port, (e) => {
      if (e) throw e;
      console.log(`> Reday on http://localhost:${port}`);
    });
  })
  .catch((e) => {
    console.error(e.stack);
    process.exit(1);
  });
