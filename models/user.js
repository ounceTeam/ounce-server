module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      // 테이블명은 users
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      userNo: {
        type: DataTypes.INTEGER,
        allowNull: false, // 필수
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
      timestamp: true,
    }
  );

  User.associate = (db) => {
    db.User.hasMany(db.Post);
    db.User.hasMany(db.Image);
    //db.User.belongsToMany(db.Post, { through: "Like", as: "Liked" });
  };

  return User;
};
