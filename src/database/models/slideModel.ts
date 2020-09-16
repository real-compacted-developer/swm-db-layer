import {DataTypes, ModelCtor, Sequelize} from 'sequelize';

const slideModel = (sequelize: Sequelize): ModelCtor<any> => {
  return sequelize.define("Slide", {
    order: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    url: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    createdAt: {
      type: "TIMESTAMP",
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      allowNull: false
    },
  }, {
    freezeTableName: true,
  });
};

export default slideModel;
