import globalRouter from "./routers/gloablRouter";
import next from "next";
import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import session from "express-session";
import "./db";
import "./passport";

import dotenv from "dotenv";
import passport from "passport";

dotenv.config();

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = express();

    const sessionConfig = {
      secret: "LZCJQ4ARJ4T3mpUL0Lph6O4yWkwIEnxT",
      cookie: {
        maxAge: 86400 * 1000, // 24 hours in milliseconds
      },
      resave: false,
      saveUninitialized: true,
    };

    server.use(session(sessionConfig));

    server.use(cookieParser());
    server.use(bodyParser.json());
    server.use(bodyParser.urlencoded({ extended: true }));

    server.use(passport.initialize());
    server.use(passport.session());

    server.use(globalRouter);

    server.get("*", (req, res) => {
      console.log(req.user);
      return handle(req, res);
    });

    server.listen(3000, (e) => {
      if (e) throw e;
      console.log("> Reday on http://localhost:3000");
    });
  })
  .catch((e) => {
    console.error(e.stack);
    process.exit(1);
  });
