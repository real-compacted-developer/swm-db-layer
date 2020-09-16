import {ModelCtor, Sequelize} from 'sequelize';
import config from '../config';

import userModel from "./models/userModel";
import studyGroupModel from "./models/studyGroupModel";
import studyDataModel from "./models/studyDataModel";
import slideModel from "./models/slideModel";
import questionModel from "./models/questionModel";
import studyMemberModel from "./models/studyMemberModel";

interface DatabaseData {
  sequelize: Sequelize;
  User: ModelCtor<any>;
  StudyGroup: ModelCtor<any>;
  StudyData: ModelCtor<any>;
  Slide: ModelCtor<any>;
  Question: ModelCtor<any>;
  StudyMember: ModelCtor<any>;
}

const {database, host, password, username} = config.database;

const db: DatabaseData = {} as DatabaseData;

const sequelize = new Sequelize(database, username, password, {
  logging: false,
  host,
  dialect: "mysql",
  timezone: "+09:00"
});

db.sequelize = sequelize;
db.User = userModel(sequelize);
db.StudyGroup = studyGroupModel(sequelize);
db.StudyData = studyDataModel(sequelize);
db.Slide = slideModel(sequelize);
db.Question = questionModel(sequelize);
db.StudyMember = studyMemberModel(sequelize);

export default db;
