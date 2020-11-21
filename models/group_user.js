module.exports = (sequelize, DataTypes) => {
  const Group_User = sequelize.define(
    "Group_User",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      // 테이블명은 posts
      userId: {
        type: DataTypes.STRING(100), // 매우 긴 글
        allowNull: false,
      },
      ounce: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      nickname: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      groupId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      userLevel: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
    },
    {
      charset: "utf8mb4", //  한글+이모티콘
      collate: "utf8mb4_general_ci",
      timestamps: true,
    }
  );
  //Group_User.associate = (db) => {
  //db.Group_User.belongsTo(db.User);
  //};
  return Group_User;
};
