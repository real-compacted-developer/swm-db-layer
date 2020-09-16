import {DataTypes, Sequelize, ModelCtor} from 'sequelize';

const questionModel = (sequelize: Sequelize): ModelCtor<any> => {
  return sequelize.define("Question", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    like: {
      type: DataTypes.INTEGER,
      allowNull: false,
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

export default questionModel;
