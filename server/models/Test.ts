import * as mongoose from "mongoose";

export interface ITest extends mongoose.Document {
  name: string;
  dailyRanks: object[];
  commitDays:number;
  username:string;
  rank:number;
}

const TestSchema = new mongoose.Schema({
  name: {type:String},
  dailyRanks: {type: Array},
  commitDays:{type:Number, default:0},
  username:{type:String},
  rank:{type:Number, default:-1}
});

const model = mongoose.model<ITest>("Test", TestSchema);

export default model;
