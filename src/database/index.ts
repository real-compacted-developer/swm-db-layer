import {ModelCtor, Sequelize} from 'sequelize';
import config from '../config';
import initAssociation from "./association";

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

const sequelize = new Sequelize(database, password, username, {
  logging: false,
  host,
  dialect: "mysql",
  timezone: "+09:00"
});

db.sequelize = sequelize;
db.User = require("./models/userModel")(sequelize, Sequelize);
db.StudyGroup = require("./models/studyGroupModel")(sequelize, Sequelize);
db.StudyData = require("./models/studyDataModel")(sequelize, Sequelize);
db.Slide = require("./models/slideModel")(sequelize, Sequelize);
db.Question = require("./models/questionModel")(sequelize, Sequelize);
db.StudyMember = require("./models/studyMemberModel")(sequelize, Sequelize);

initAssociation();

export default db;
