import {DataTypes, ModelCtor, Sequelize} from 'sequelize';

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
      allowNull: false
    },
    updatedAt: {
      type: "TIMESTAMP",
      allowNull: false
    }
  }, {
    freezeTableName: true,
  });
};

export default questionModel;
