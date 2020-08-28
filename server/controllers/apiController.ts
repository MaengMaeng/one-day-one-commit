import User, { IUser } from "../models/User";
import axios from 'axios';
import {getTodayDateStr} from '../common';

const db = User;

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

export const getRanks = async(req: any, res: any) => {
  const {
    query: { next },
  } = req;

  if (next) {
    // get List from DB
    // const ranks = mockupData.slice(gap * (next - 1), gap * next);
    const ranks = await getRanksToArray(next);
    return res.json(ranks);
  }

  return res.status(400).send("Bad Request");
};

const getRanksToArray = async(next:number) => {
  return await db.find({rank:{$gt:gap * (next - 1), $lte:gap * next}},{_id:0, username:1, email:1, avatarUrl:1, rank:1, commitDays:1});
}

export const getUpdateRanks = async(req: any, res: any) => {
  const {
    query: { next },
  } = req;

  if (next) {
    const today = getTodayDateStr();
    
    const notUpdateUsers = await getNotUpdateUsersByDate(today);
    console.log('업데이트 안된 유저 가져오기', notUpdateUsers);

    notUpdateUsers.map(async(user) => {
      const check = await checkToDoToday(today, user.username);

      if(check) await updateDoneAndCommitDays(user._id, today);
    })
    console.log('유저 업데이트 - 1');

    const users = await getUsers();
    users.sort((a, b) => b.commitDays - a.commitDays);
    
    console.log('정렬', users);

    users.map(async(user, index) => {
      await updateRank(user._id, today, index + 1);
    })
    
    console.log('랭크 업데이트 - 2');

    const ranks = await getRanksToArray(next);
    console.log('결과물', ranks);
    return res.json(ranks);
  }
  
  return res.status(400).send("Bad Request");
};

const checkToDoToday = async(date:string, username:string) => {
  let url = `https://urlreq.appspot.com/req?method=GET&url=https://api.github.com/users/${username}/events`;
  let data = await axios.get(url);

  const listPR = ['PullRequestEvent', 'PushEvent'];

  const prEvents = data['data'].filter((event:any) => listPR.indexOf(event['type']) != -1);
  const todayEvents = prEvents.filter((event:any) => event['created_at'].split('T')[0] == date);
  /*
  event { id: '13094121163',
  type: 'PushEvent',
  actor:
   { id: 31842031,
     login: 'MaengMaeng',
     display_login: 'MaengMaeng',
     gravatar_id: '',
     url: 'https://api.github.com/users/MaengMaeng',
     avatar_url: 'https://avatars.githubusercontent.com/u/31842031?' },
  repo:
   { id: 281637623,
     name: 'MaengMaeng/JS-study',
     url: 'https://api.github.com/repos/MaengMaeng/JS-study' },
  payload:
   { push_id: 5472740496,
     size: 1,
     distinct_size: 1,
     ref: 'refs/heads/master',
     head: '927da167503be5bb5eec3130ddae5bfa7a8ae9b0',
     before: '70bd70da23a75670424e4f3ea7ddb50d3ef779ec',
     commits: [ [Object] ] },
  public: true,
  created_at: '2020-08-03T11:46:57Z' }
  */

  return todayEvents.length > 0;
}
const getUsers = async() => {
  return await db.find({}, {_id:1, commitDays:1}); 
}

const getNotUpdateUsersByDate = async(date:string) => {
  const notHaveDateUser = await db.find({"dailyRanks.date":{$nin:[date]}}, {_id:1}).catch((e) => e);
  
  notHaveDateUser.map(async(user:any) => {
    console.log(user._id);
    await db.update({_id:user._id}, {$push:{dailyRanks:{date, done:0, rank:-1}}}).catch((e) => e);
  })
  
  const notDoTodayUser = await db.find({dailyRanks:{$elemMatch:{date, done:0}}});
  return notDoTodayUser;
}

const updateDoneAndCommitDays = async(_id:string, date:string) => {
  await db.update({_id, dailyRanks:{$elemMatch: {date, done:0}}},{$set:{'dailyRanks.$.done':1}});
  await db.update({_id}, {$inc:{commitDays:1}});

  return true;
}

const updateRank = async(_id:string, date:string, rank:number) => {
  await db.update({_id, dailyRanks:{$elemMatch: {date}}},{$set:{'dailyRanks.$.rank':rank}});
  await db.update({_id}, {$set:{rank}});

  return true;
}
