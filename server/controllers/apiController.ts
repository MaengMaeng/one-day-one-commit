import User, { IUser } from "../models/User";
import axios from "axios";
import { getDateStr } from "../common";
import * as CONSTANTS from "../constants";

setInterval(async () => {
  await updateRanks();
  console.log("Update");
}, CONSTANTS.UPDATE_TIME);

let updateTimer: any = null;
let leftTimer: any = null;
let leftTime = CONSTANTS.LIMIT_UPDATE_TIME / 1000;

export const getRanks = async (req: any, res: any) => {
  const {
    query: { next },
  } = req;

  try {
    const ranks = await getRanksToArray(next);
    res.json({
      ranks,
      isEnd: ranks.length < CONSTANTS.GAP,
    });
  } catch (error) {
    console.log("!Error on getRanks: ", error);
    res.status(400).send("Bad Request");
  }
};

const getRanksToArray = async (next: number) => {
  try {
    return await User.find(
      { rank: { $gt: CONSTANTS.GAP * (next - 1), $lte: CONSTANTS.GAP * next } },
      { _id: 0, username: 1, email: 1, avatarUrl: 1, rank: 1, commitDays: 1 },
    ).sort({ rank: 1 });
  } catch (error) {
    throw new Error("!Error on getRanksToArray: " + error);
  }
};

export const getUpdateRanks = async (req: any, res: any) => {
  const {
    query: { next },
  } = req;

  try {
    if (!updateTimer) {
      leftTimer = setInterval(() => {
        leftTime--;
      }, CONSTANTS.ONE_SECOND);

      updateTimer = setTimeout(() => {
        updateTimer = null;
        clearInterval(leftTimer);
        leftTime = CONSTANTS.LIMIT_UPDATE_TIME / 1000;
      }, CONSTANTS.LIMIT_UPDATE_TIME);

      await updateRanks();

      const ranks = await getRanksToArray(next);
      res.json({ ranks, isEnd: ranks.length < CONSTANTS.GAP, leftTime });
    } else {
      console.log("!Can Not Be Updated");
      res.json({ leftTime: leftTime < 0 ? 0 : leftTime });
    }
  } catch (error) {
    console.log("!Error on getUpdateRanks: ", error);
    res.status(400).send("Bad Request");
  }
};

const updateRanks = async () => {
  const today = getDateStr();

  const notUpdateUsers = await getNotUpdateUsersByDate(today);

  notUpdateUsers.forEach(async (user) => {
    try {
      const check = await checkToDoToday(today, user.username);

      if (check) await updateDoneAndCommitDays(user._id, today);
    } catch (error) {
      console.log("!Error on notUpdateUsers: ", error);
    }
  });

  const users = await getUsers();
  users.sort((a, b) => b.commitDays - a.commitDays);

  users.forEach(async (user, index) => {
    try {
      await updateRank(user._id, today, index + 1);
    } catch (error) {
      console.log("!Error on uses: ", error);
    }
  });
};

const checkToDoToday = async (date: string, username: string) => {
  try {
    const url = `https://api.github.com/users/${username}/events`;
    const data = await axios.get(url);
    const listPR = ["PullRequestEvent", "PushEvent"];

    const prEvents = data["data"].filter(
      (event: any) => listPR.indexOf(event["type"]) !== -1,
    );
    const todayEvents = prEvents.filter(
      (event: any) => getDateStr(new Date(event["created_at"])) == date,
    );

    return todayEvents.length > 0;
  } catch (error) {
    throw new Error("!Error on checkToDoToday: " + error);
  }
};

const getUsers = async () => {
  try {
    return await User.find({}, { _id: 1, commitDays: 1 });
  } catch (error) {
    throw new Error("Error on getUsers: " + error);
  }
};

const getNotUpdateUsersByDate = async (date: string) => {
  try {
    const notHaveDateUser = await User.find(
      { "dailyRanks.date": { $nin: [date] } },
      { _id: 1 },
    );

    notHaveDateUser.forEach(async (user: any) => {
      try {
        await User.updateOne(
          { _id: user._id },
          { $push: { dailyRanks: { date, done: 0, rank: -1 } } },
        );
      } catch (error) {
        console.log("Error on getNotUpdateUsersByDate: " + error);
      }
    });

    const notDoTodayUser = await User.find({
      dailyRanks: { $elemMatch: { date, done: 0 } },
    });
    return notDoTodayUser;
  } catch (error) {
    throw new Error("Error on getNotUpdateUsersByDate: " + error);
  }
};

const updateDoneAndCommitDays = async (_id: string, date: string) => {
  try {
    await User.updateOne(
      { _id, dailyRanks: { $elemMatch: { date, done: 0 } } },
      { $set: { "dailyRanks.$.done": 1 } },
    );
    await User.updateOne({ _id }, { $inc: { commitDays: 1 } });
  } catch (error) {
    console.log("Error on updateDoneAndCommitDays: ", error);
  }
};

const updateRank = async (_id: string, date: string, rank: number) => {
  try {
    await User.updateOne(
      { _id, dailyRanks: { $elemMatch: { date } } },
      { $set: { "dailyRanks.$.rank": rank } },
    );
    await User.updateOne({ _id }, { $set: { rank } });
  } catch (error) {
    console.log("Error on updateRank: ", error);
  }
};
