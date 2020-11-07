module.exports = (sequelize, DataTypes) => {
  const Group = sequelize.define(
    "Group",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      groupCategory: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      authTime: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
    },
    {
      charset: "utf8", //  한글+이모티콘
      collate: "utf8_general_ci",
      timestamps: true,
    }
  );
  Group.associate = (db) => {
    db.Group.hasMany(db.Post); // 테이블에 UserId 컬럼이 생겨요
    db.Group.hasMany(db.Image);
    //db.Post.belongsToMany(db.User, { through: "Like", as: "Likers" });
  };
  return Group;
};
