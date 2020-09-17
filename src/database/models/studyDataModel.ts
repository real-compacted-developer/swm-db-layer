import {DataTypes, ModelCtor, Sequelize} from 'sequelize';

const studyDataModel = (sequelize: Sequelize): ModelCtor<any> => {
  return sequelize.define("StudyData", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    week: {
      type: DataTypes.INTEGER,
    }
  }, {
    freezeTableName: true,
    timestamps: true
  });
};

export default studyDataModel;
