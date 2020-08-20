import * as express from "express";
import routes from "../routes";
import { getRanks, getUpdateRanks } from "../controllers/apiController";

const apiRouter = express.Router();

apiRouter.get(routes.ranks, getRanks);
apiRouter.get(routes.updateRanks, getUpdateRanks);

export default apiRouter;
