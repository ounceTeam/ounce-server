module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    "Post",
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
      url: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
    },
    {
      charset: "utf8mb4", //  한글+이모티콘
      collate: "utf8mb4_general_ci",
      timestamps: true,
    }
  );
  Post.associate = (db) => {
    db.Post.belongsTo(db.User); // 테이블에 UserId 컬럼이 생겨요
    db.Post.belongsTo(db.Group);
    db.Post.hasMany(db.Image);
    //   //db.Post.belongsToMany(db.User, { through: "Like", as: "Likers" });
  };
  return Post;
};
