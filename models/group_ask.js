module.exports = (sequelize, DataTypes) => {
  const Group_Ask = sequelize.define(
    "Group_Ask",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      status: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      groupId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      nickname: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      userId: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
    },
    {
      charset: "utf8mb4", //  한글+이모티콘
      collate: "utf8mb4_general_ci",
      timestamps: true,
    }
  );

  return Group_Ask;
};
