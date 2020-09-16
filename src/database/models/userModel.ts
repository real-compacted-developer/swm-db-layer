import {DataTypes, ModelCtor, Sequelize} from 'sequelize';

const userModel = (sequelize: Sequelize): ModelCtor<any> => {
  return sequelize.define("User", {
    nickname: {
      type: DataTypes.STRING(40),
      primaryKey: true,
      unique: true,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(40),
      allowNull: false,
    },
    gender: { // M or F
      type: DataTypes.STRING(10),
    },
    age: {
      type: DataTypes.INTEGER,
    },
    birthday: {
      type: DataTypes.DATEONLY
    },
    isPremium: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
  }, {
    freezeTableName: true,
    paranoid: true,
  });
};

export default userModel;
