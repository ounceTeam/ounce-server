module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define(
    "Image",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      src: {
        type: DataTypes.STRING(200),
        allowNull: false,
      },
      groupId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      userId: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      postId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      charset: "utf8",
      collate: "utf8_general_ci",
      timestamps: true,
    }
  );
  // Image.associate = (db) => {
  //   db.Image.belongsTo(db.Post);
  //   db.Image.belongsTo(db.Group);
  //   db.Image.belongsTo(db.User);
  // };
  return Image;
};
