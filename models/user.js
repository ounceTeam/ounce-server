module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      // 테이블명은 users
      userNo: {
        type: DataTypes.INTEGER,
        allowNull: false, // 필수
        autoIncrement: true,
        primaryKey: true,
      },
      email: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true, // 고유한 값
      },
      nickname: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
      oauthid: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
    },
    {
      charset: "utf8",
      collate: "utf8_general_ci", // 한글이 저장
    }
  );

  // User.associate = db => {
  //   db.User.hasMany(db.Post, { as: "Posts" });
  //   db.User.hasMany(db.Image);
  //   //db.User.belongsToMany(db.Post, { through: "Like", as: "Liked" });
  // };

  return User;
};
