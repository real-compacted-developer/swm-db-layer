import {ModelCtor, Sequelize} from 'sequelize';

const studyMemberModel = (sequelize: Sequelize): ModelCtor<any> => {
  return sequelize.define("StudyMember", {}, {
    freezeTableName: true,
  });
};

export default studyMemberModel;
