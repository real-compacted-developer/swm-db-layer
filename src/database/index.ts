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

/**
 * 1:N Study : Study_data
 * 스터디에 쓰이는 스터디 자료
 */
db.StudyGroup.hasMany(db.StudyData, { foreignKey: "studyTitle" });
db.StudyData.belongsTo(db.StudyGroup, { foreignKey: "studyTitle" });

/**
 * 1:N Study_data : Slide
 * 각 스터디 자료의 슬라이드
 */
db.StudyData.hasMany(db.Slide, { foreignKey: "dataId" });
db.Slide.belongsTo(db.StudyData, { foreignKey: "dataId" });

/**
 * 1:N User : Question
 * writer(글쓴이(닉네임)를 얻어오기 위해)
 */
db.User.hasMany(db.Question, { foreignKey: "writer" });
db.Question.belongsTo(db.User, { foreignKey: "writer" });

/**
 * 1:N Slide : Question
 * slide 별로 질문 하므로
 */
db.Slide.hasMany(db.Question);
db.Question.belongsTo(db.Slide);

/**
 *  N:M User : Study (User_list)
 */
db.User.belongsToMany(db.StudyGroup, { through: db.StudyMember, foreignKey: "nickname" });
db.StudyGroup.belongsToMany(db.User, { through: db.StudyMember, foreignKey: "studyTitle" });

export default db;
