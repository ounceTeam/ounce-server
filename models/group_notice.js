module.exports = (sequelize, DataTypes) => {
  const Group_Notice = sequelize.define(
    "Group_Notice",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      // 테이블명은 posts
      content: {
        type: DataTypes.TEXT, // 매우 긴 글
        allowNull: false,
      },
      groupId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      charset: "utf8mb4", //  한글+이모티콘
      collate: "utf8mb4_general_ci",
      timestamps: true,
    }
  );
  //   Group_Notice.associate = (db) => {
  //     db.Group_Notice.belongsTo(db.Group);
  //   };
  return Group_Notice;
};
