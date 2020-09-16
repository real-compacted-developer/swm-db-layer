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
    },
    createdAt: {
      type: "TIMESTAMP",
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      allowNull: false
    },
    updatedAt: {
      type: "TIMESTAMP",
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"),
      allowNull: false
    }
  }, {
    freezeTableName: true,
  });
};

export default studyDataModel;
