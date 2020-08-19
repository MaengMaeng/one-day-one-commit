import { IUser } from "../models/User";

const mockupData: Partial<IUser>[] = [
  {
    username: "max",
    email: "max@test.io",
    avatarUrl:
      "https://avatars0.githubusercontent.com/u/37009133?s=400&u=3998f5edfd907a527fbd8cac4d532026e91ae734&v=4",
    rank: 1,
    commitDays: 100,
  },
  {
    username: "eddy",
    email: "eddy@test.io",
    avatarUrl:
      "https://avatars0.githubusercontent.com/u/37009133?s=400&u=3998f5edfd907a527fbd8cac4d532026e91ae734&v=4",
    rank: 2,
    commitDays: 99,
  },
  {
    username: "noel",
    email: "noel@test.io",
    avatarUrl:
      "https://avatars0.githubusercontent.com/u/37009133?s=400&u=3998f5edfd907a527fbd8cac4d532026e91ae734&v=4",
    rank: 3,
    commitDays: 98,
  },
  {
    username: "max",
    email: "max@test.io",
    avatarUrl:
      "https://avatars0.githubusercontent.com/u/37009133?s=400&u=3998f5edfd907a527fbd8cac4d532026e91ae734&v=4",
    rank: 4,
    commitDays: 97,
  },
  {
    username: "tom",
    email: "tom@test.io",
    avatarUrl:
      "https://avatars0.githubusercontent.com/u/37009133?s=400&u=3998f5edfd907a527fbd8cac4d532026e91ae734&v=4",
    rank: 5,
    commitDays: 96,
  },
  {
    username: "woo",
    email: "woo@test.io",
    avatarUrl:
      "https://avatars0.githubusercontent.com/u/37009133?s=400&u=3998f5edfd907a527fbd8cac4d532026e91ae734&v=4",
    rank: 6,
    commitDays: 96,
  },
  {
    username: "ella",
    email: "ella@test.io",
    avatarUrl:
      "https://avatars0.githubusercontent.com/u/37009133?s=400&u=3998f5edfd907a527fbd8cac4d532026e91ae734&v=4",
    rank: 7,
    commitDays: 95,
  },
  {
    username: "queen",
    email: "queen@test.io",
    avatarUrl:
      "https://avatars0.githubusercontent.com/u/37009133?s=400&u=3998f5edfd907a527fbd8cac4d532026e91ae734&v=4",
    rank: 8,
    commitDays: 94,
  },
  {
    username: "anna",
    email: "anna@test.io",
    avatarUrl:
      "https://avatars0.githubusercontent.com/u/37009133?s=400&u=3998f5edfd907a527fbd8cac4d532026e91ae734&v=4",
    rank: 9,
    commitDays: 93,
  },
  {
    username: "bill",
    email: "bill@test.io",
    avatarUrl:
      "https://avatars0.githubusercontent.com/u/37009133?s=400&u=3998f5edfd907a527fbd8cac4d532026e91ae734&v=4",
    rank: 10,
    commitDays: 92,
  },
];

const gap = 3;

export const getRanks = (req: any, res: any) => {
  const {
    query: { next },
  } = req;

  if (next) {
    // get List from DB
    const ranks = mockupData.slice(gap * (next - 1), gap * next);
    return res.json(ranks);
  }

  return res.status(400).send("Bad Request");
};

export const getUpdateRanks = (req: any, res: any) => {};
